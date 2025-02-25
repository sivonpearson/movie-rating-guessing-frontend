import React, { Suspense, useReducer, useRef, useState } from "react";
import HeaderComponent from "../components/Header.tsx";
// import GameCard from "../components/GameCard.tsx";
// import ScoreCard from "../components/ScoreCard.tsx";
import ErrorPage from "./ErrorPage.tsx";
import LoadingPage from "./LoadingPage.tsx";
import Slider, { SliderRef } from "../components/Slider";
import useGuess from "../hooks/useGuess.ts";
import MovieContextPanel from "../components/MovieContextPanel.tsx";

type Props = {
  difficulty: number; // 0 - easy, 1 - normal, 2 - hard
};

const GamePage: React.FC<Props> = (props: Props) => {
  const {
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
  } = useGuess();
  const sliderRef = useRef<SliderRef | null>(null);

  const forceUpdateReducer = (x: boolean) => !x;
  const [, forceUpdate] = useReducer(forceUpdateReducer, false);

  if (error) {
    return <ErrorPage error_message={error} />;
  }

  if (!currentMovieData || !currentPalette) {
    return (
      // <ErrorPage error_message={"Error: Movie data could not be fetched."} />
      <LoadingPage />
    );
  }

  const submitRating = () => {
    if (sliderRef.current) {
      const sliderVal = sliderRef.current.getValue();

      console.log(`Slider value: ${sliderVal}`);

      // setUserGuess(sliderVal);

      handleUserSubmit(sliderVal);

      forceUpdate();
    }
  };

  return (
    <div
      className="h-screen overflow-y-hidden"
      style={{ backgroundColor: "var(--vibrant)" }}
    >
      {currentMovieData && currentPalette && (
        <Suspense fallback={<LoadingPage />}>
          <HeaderComponent />
          <div className="grid grid-cols-3 gap-x-3 items-stretch max-h-dvh">
            {/* <GameCard movieInfo={movieInfo} colorPalette={colorPalette} /> */}
            <div className="flex-col ml-3">
              <p
                className="text-4xl mb-4 text-center font-bold"
                style={{ color: "var(--darkmuted)" }}
              >
                {currentMovieData.title}
              </p>
              <MovieContextPanel movieData={currentMovieData} difficulty={0} />
            </div>
            {/* <div className="container h-fit m-auto">
              <img
                src={currentMovieData.posterURL}
                className="relative h-auto w-full m-auto max-h-5/6 object-contain"
                style={{ border: `1px solid ${currentPalette.darkmuted}` }}
              />
            </div> */}
            <img
              src={currentMovieData.posterURL}
              className="relative h-auto w-full mx-auto mt-1 max-h-5/6 object-contain"
            />
            {/* <ScoreCard /> */}
            <div className="container mx-auto px-4 py-8">
              <div className="flex-col flex-center text-1xl">
                <p>Cumulative gap: {(parseInt(totalGap) / 10.0).toFixed(1)}</p>
                <p>Number of guesses: {numGuesses}</p>
                <p>Average gap: {averageGap}</p>
                <button
                  className="px-4 py-2 bg-blue-300 text-amber-50"
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
                  />
                  <button
                    className="px-4 py-2 bg-blue-300 text-amber-50"
                    onClick={submitRating}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-1xl">
                    Guessed score: {userGuess.toFixed(1)}
                  </p>
                  <p className="text-1xl">
                    Actual score: {currentMovieData.rating_score}
                  </p>
                  <button
                    className="px-4 py-2 bg-blue-300 text-amber-50"
                    onClick={nextGuess}
                  >
                    Next Movie
                  </button>
                </div>
              )}
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default GamePage;

// return (
//   <div
//     className="h-screen"
//     style={{ backgroundColor: currentPalette.vibrant }}
//   >
//     {currentMovieData && currentPalette && (
//       <Suspense fallback={<LoadingPage />}>
//         <HeaderComponent {...currentPalette} />
//         <div className="flex w-screen content-center space-x-10">
//           {/* <GameCard movieInfo={movieInfo} colorPalette={colorPalette} /> */}
//           <div className="container flex flex-center items-center mx-auto px-8 mt-4 gap-4">
//             <div className="flex-col">
//               <p
//                 className="text-4xl mb-4 text-center font-bold"
//                 style={{ color: currentPalette.darkmuted }}
//               >
//                 {currentMovieData.title}
//               </p>
//               {!hasAnswered ? (
//                 <div>
//                   <Slider
//                     ref={sliderRef}
//                     defaultValue={5.0}
//                     step={0.1}
//                     minValue={1.0}
//                     maxValue={10.0}
//                   />
//                   <button
//                     className="px-4 py-2 bg-blue-300 text-amber-50"
//                     onClick={submitRating}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <p className="text-1xl">
//                     Guessed score: {userGuess.toFixed(1)}
//                   </p>
//                   <p className="text-1xl">
//                     Actual score: {currentMovieData.rating_score}
//                   </p>
//                   <button
//                     className="px-4 py-2 bg-blue-300 text-amber-50"
//                     onClick={nextGuess}
//                   >
//                     Next Movie
//                   </button>
//                 </div>
//               )}
//             </div>
//             <img
//               src={currentMovieData.posterURL}
//               className="absolute items-center"
//               style={{ border: `1px solid ${currentPalette.darkmuted}` }}
//             />
//           </div>
//           {/* <ScoreCard /> */}
//           <div className="container mx-auto px-4 py-8">
//             <div className="flex-col flex-center text-1xl">
//               <p>Cumulative gap: {(parseInt(totalGap) / 10.0).toFixed(1)}</p>
//               <p>Number of guesses: {numGuesses}</p>
//               <p>Average gap: {averageGap}</p>
//             </div>
//             <button
//               className="px-4 py-2 bg-blue-300 text-amber-50"
//               onClick={resetAll}
//             >
//               Reset Score
//             </button>
//           </div>
//         </div>
//       </Suspense>
//     )}
//   </div>
// );
