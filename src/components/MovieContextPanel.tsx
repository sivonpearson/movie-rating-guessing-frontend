import React, { useState } from "react";
import { MovieData } from "../scripts/api";

interface SelectButton {
  name: string;
  max_difficulty: number;
  text_output: string;
}

type Props = {
  movieData: MovieData;
  difficulty: number;
};

const MovieContextPanel: React.FC<Props> = ({
  movieData,
  difficulty,
}: Props) => {
  const [selected, setSelected] = useState<SelectButton | null>(null);

  const buttons: SelectButton[] = [
    { name: "Year", max_difficulty: 0, text_output: movieData.year },
    { name: "Genre", max_difficulty: 0, text_output: movieData.genre },
    { name: "Plot", max_difficulty: 0, text_output: movieData.plot },
    { name: "Director(s)", max_difficulty: 0, text_output: movieData.director },
    { name: "Writer(s)", max_difficulty: 0, text_output: movieData.writer },
    { name: "Actor(s)", max_difficulty: 0, text_output: movieData.actors },
    {
      name: "MPA Rating",
      max_difficulty: 0,
      text_output: movieData.MPA_rating,
    },
    { name: "Runtime", max_difficulty: 0, text_output: movieData.runtime },
    { name: "# Votes", max_difficulty: 0, text_output: movieData.num_votes },
  ];

  return (
    <div
      className="flex flex-col items-center"
      // style={{ backgroundColor: "var(--darkmuted)" }}
    >
      <div className="grid grid-cols-3 gap-4">
        {buttons
          .filter((button) => difficulty <= button.max_difficulty)
          .map((button, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-lg transition-all duration-200 ${
                selected?.name === button.name
                  ? // ? "button-select font-bold focus:outline-offset-2"
                    "button-selected"
                  : "button-unselected"
                // : "italic text-button hover:button-hover" // hover:bg-gray-100
              }`}
              // style={{ color: "var(--lightvibrant)" }}
              onClick={() => {
                console.log(button);
                setSelected(button);
              }}
            >
              {button.name}
            </button>
          ))}
      </div>
      {selected && (
        <p
          className="px-4 py-2 overflow-y-auto max-h-[57vh] mt-2" // overflow-y-scroll
          style={{
            color: "var(--lightvibrant)",
            backgroundColor: "var(--darkmuted)",
          }}
        >
          {selected?.text_output ?? ""}
        </p>
      )}
    </div>
  );
};

export default MovieContextPanel;
