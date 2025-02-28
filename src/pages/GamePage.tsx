import React, { Suspense, useReducer, useRef } from "react";
import HeaderComponent from "../components/Header.tsx";
// import GameCard from "../components/GameCard.tsx";
// import ScoreCard from "../components/ScoreCard.tsx";
import ErrorPage from "./ErrorPage.tsx";
import LoadingPage from "./LoadingPage.tsx";
import Slider, { SliderRef } from "../components/Slider";
import useGuess from "../hooks/useGuess.ts";
import MovieContextPanel from "../components/MovieContextPanel.tsx";
import { Tooltip } from "@material-tailwind/react";

type Props = {
  difficulty: number; // 0 - easy, 1 - normal, 2 - hard
};

const GamePage: React.FC<Props> = ({ difficulty }: Props) => {
  const {
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
  } = useGuess();
  const sliderRef = useRef<SliderRef | null>(null);

  const forceUpdateReducer = (x: boolean) => !x;
  const [, forceUpdate] = useReducer(forceUpdateReducer, false);

  if (error) {
    return <ErrorPage error_message={error} />;
  }

  if (!currentMovieData) {
    return (
      // <ErrorPage error_message={"Error: Movie data could not be fetched."} />
      <LoadingPage />
    );
  }

  const submitRating = () => {
    if (sliderRef.current) {
      const sliderVal = sliderRef.current.getValue();

      console.log(`Slider value: ${sliderVal}`);

      handleUserSubmit(sliderVal);

      forceUpdate();
    }
  };

  return (
    <div className="h-screen background-gradient overflow-y-hidden">
      <Suspense fallback={<LoadingPage />}>
        <HeaderComponent />
        <div className="grid grid-cols-3 gap-x-3 items-stretch max-h-dvh">
          {/* <GameCard movieInfo={movieInfo} colorPalette={colorPalette} /> */}
          <div className="flex-col ml-3">
            <div className="relative flex justify-center">
              <Tooltip
                content={currentMovieData.title}
                placement="right"
                className="bg-[var(--lightvibrant)] text-[var(--darkvibrant)] break-words"
              >
                <p
                  data-tooltip-target="tooltip-title"
                  className="select-none text-center py-3 font-bold text-4xl truncate"
                  style={{ color: "var(--lightvibrant)" }}
                >
                  {currentMovieData.title}
                </p>
              </Tooltip>
            </div>
            <MovieContextPanel
              movieData={currentMovieData}
              difficulty={difficulty}
            />
            {/* The stuff below is temporary */}
            {/* <p className="flex gap-2">
              <p
                className="w-8 h-8"
                style={{ backgroundColor: "var(--vibrant)" }}
              />
              <p
                className="w-8 h-8"
                style={{ backgroundColor: "var(--darkvibrant)" }}
              />
              <p
                className="w-8 h-8"
                style={{ backgroundColor: "var(--lightvibrant)" }}
              />
              <p
                className="w-8 h-8"
                style={{ backgroundColor: "var(--muted)" }}
              />
              <p
                className="w-8 h-8"
                style={{ backgroundColor: "var(--darkmuted)" }}
              />
              <p
                className="w-8 h-8"
                style={{ backgroundColor: "var(--lightmuted)" }}
              />
            </p> */}
          </div>
          <img
            src={currentMovieData.posterURL}
            className="relative h-auto w-full mx-auto mt-1 max-h-5/6 object-contain"
          />
          {/* <ScoreCard /> */}
          <div className="container mx-auto px-4 py-8">
            <div
              className="flex-col flex-center text-lg"
              style={{
                color: "var(--lightvibrant)",
                // backgroundColor: "var(--lightmuted)",
              }}
            >
              <p>Cumulative gap: {(parseInt(totalGap) / 10.0).toFixed(1)}</p>
              <p>Number of guesses: {numGuesses}</p>
              <p>Average gap: {averageGap}</p>
              <p>Score: {(parseInt(score) / 10).toFixed(1)}</p>
              <button
                className="px-4 py-2 text-lg transition-all duration-200 button-tap"
                onClick={resetAll}
              >
                Reset Score
              </button>
            </div>
            {!hasAnswered ? (
              <div>
                <Slider
                  ref={sliderRef}
                  defaultValue={5.0}
                  step={0.1}
                  minValue={1.0}
                  maxValue={10.0}
                  backgroundColor="var(--darkmuted)"
                  foregroundColor="var(--lightvibrant)"
                />
                <button
                  className="px-4 py-2 text-lg transition-all duration-200 button-tap"
                  onClick={submitRating}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>
                <span
                  className="text-1xl"
                  style={{
                    color: "var(--lightvibrant)",
                    // backgroundColor: "var(--lightmuted)",
                  }}
                >
                  <p>Guessed rating: {userGuess.toFixed(1)}</p>
                  <p>Actual rating: {currentMovieData.rating_score}</p>
                </span>
                <button
                  className="px-4 py-2 text-lg transition-all duration-200 button-tap"
                  onClick={nextGuess}
                >
                  Next Movie
                </button>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default GamePage;
