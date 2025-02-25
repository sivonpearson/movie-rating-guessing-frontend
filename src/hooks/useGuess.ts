import { useState, useEffect } from "react";
import { fetchMovieData, MovieData } from "../scripts/api";
import { extractPalette, Palette } from "../scripts/ColorExtractor";
import { useLocalStorage } from "../scripts/LocalStorage";

const useGuess = () => {
  const [currentMovieData, setCurrentMovieData] = useState<MovieData | null>(
    null
  );
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null);
  const [userGuess, setUserGuess] = useState(5.0);
  const [hasAnswered, setAnswered] = useState(false);
  const [error, setError] = useState("");
  const [totalGap, setTotalGap] = useLocalStorage("total_gap", "0");
  const [numGuesses, setNumGuesses] = useLocalStorage("num_guesses", "0");
  const [averageGap, setAverageGap] = useState<string>("0");

  const fetchMovie = async () => {
    // if (currentMovieData) return;

    try {
      const movieInfo_response = await fetchMovieData();

      setCurrentMovieData(movieInfo_response);

      console.log(movieInfo_response);

      const palette_response = await extractPalette(
        movieInfo_response.posterURL
      );

      setCurrentPalette(palette_response);
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
    const newNumGuesses = parseInt(numGuesses) + 1;

    setTotalGap(String(newTotalDifference));
    setNumGuesses(String(newNumGuesses));

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
    console.log("Reset scores!");

    setTotalGap("0");
    setNumGuesses("0");
    setAverageGap("0");
    setAnswered(false);
  };

  return {
    currentMovieData,
    currentPalette,
    userGuess,
    hasAnswered,
    error,
    totalGap,
    numGuesses,
    averageGap,
    handleUserSubmit,
    nextGuess,
    resetAll,
  };
};

export default useGuess;
