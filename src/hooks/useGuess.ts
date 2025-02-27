import { useState, useEffect } from "react";
import { fetchMovieData, MovieData } from "../scripts/api";
import { extractPalette } from "../scripts/ColorExtractor";
import { useLocalStorage } from "../scripts/LocalStorage";

const calculateScore = (score_gap: number) => {
  const min_score = -3.0;
  const max_score = 3.0;
  const scaling = 150.0; // gives about a +/- 0.5 buffer

  const power = -(score_gap ** 2) / scaling;

  const score = (max_score - min_score) * Math.exp(power) + min_score;

  // make the score an integer
  let int_score = Math.floor(score * 10);

  // if perfect guess, give a bonus
  if (score_gap == 0) int_score += 70;

  return int_score;
};

const useGuess = () => {
  const [currentMovieData, setCurrentMovieData] = useState<MovieData | null>(
    null
  );
  const [userGuess, setUserGuess] = useState(5.0);
  const [hasAnswered, setAnswered] = useState(false);
  const [error, setError] = useState("");
  const [totalGap, setTotalGap] = useLocalStorage("total_gap", "0");
  const [numGuesses, setNumGuesses] = useLocalStorage("num_guesses", "0");
  const [averageGap, setAverageGap] = useState<string>("0");
  const [score, setScore] = useLocalStorage("score", "0");

  const fetchMovie = async () => {
    // if (currentMovieData) return;

    try {
      const movieInfo_response = await fetchMovieData();

      setCurrentMovieData(movieInfo_response);

      console.log(movieInfo_response);

      await extractPalette(movieInfo_response.posterURL);
    } catch (err) {
      setError(String(err));
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const handleUserSubmit = (userGuessRating: number) => {
    if (hasAnswered || !currentMovieData) return;

    setAnswered(true);

    setUserGuess(userGuessRating);

    const diff = Math.abs(
      Math.floor(userGuessRating * 10) -
        Math.floor(parseFloat(currentMovieData.rating_score) * 10)
    );

    const newTotalDifference = parseInt(totalGap) + diff;
    setTotalGap(String(newTotalDifference));

    const newNumGuesses = parseInt(numGuesses) + 1;
    setNumGuesses(String(newNumGuesses));

    const newScore = parseInt(score) + calculateScore(diff);

    setScore(String(Math.floor(newScore)));

    const avg = (0.1 * newTotalDifference) / newNumGuesses;

    setAverageGap(String(avg.toFixed(2)));
  };

  const nextGuess = () => {
    setCurrentMovieData(null);
    setUserGuess(5.0);
    setAnswered(false);
    fetchMovie();
  };

  const resetAll = () => {
    setTotalGap("0");
    setNumGuesses("0");
    setAverageGap("0");
    setScore("0");
    setAnswered(false);
  };

  return {
    currentMovieData,
    userGuess,
    hasAnswered,
    error,
    totalGap,
    numGuesses,
    averageGap,
    score,
    handleUserSubmit,
    nextGuess,
    resetAll,
  };
};

export default useGuess;
