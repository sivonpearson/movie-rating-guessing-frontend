import React, { useRef, useState } from "react";
import { MovieData } from "../scripts/api";
import Slider, { SliderRef } from "./Slider";
import { useLocalStorage } from "../scripts/LocalStorage";

type Props = {
  movieInfo: MovieData;
  onSubmitScore: () => void;
};

const GameCard: React.FC<Props> = ({ movieInfo, onSubmitScore }: Props) => {
  const sliderRef = useRef<SliderRef | null>(null);

  const [total_diff, setTotalDifference] = useLocalStorage(
    "total_difference",
    "0"
  );
  const [num_guesses, setNumGuesses] = useLocalStorage("num_guesses", "0");

  const submitRating = () => {
    if (sliderRef.current) {
      let val = sliderRef.current.getValue() * 10;

      console.log(val);

      val = Math.abs(Number(movieInfo.rating_score) * 10 - val);

      val += Number(total_diff);

      setTotalDifference(String(val));
      setNumGuesses(String(Number(num_guesses) + 1));

      onSubmitScore();
    }
  };

  return (
    // container
    <div className="container flex flex-center items-center mx-auto px-8 py-8 gap-4">
      <div className="flex-col">
        <p
          className="text-4xl mb-4 text-center"
          style={{ color: "var(--darkmuted)" }}
        >
          {movieInfo.title}
        </p>
        <img
          src={movieInfo.posterURL}
          style={{ border: `1px solid var(--darkmuted)` }}
        />
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
    </div>
  );
};

export default GameCard;
