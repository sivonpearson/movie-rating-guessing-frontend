import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent: React.FC = () => {
  return (
    <div>
      {/* Header */}
      {/* Make the one lighter in color than the one below it */}
      <header
        className="flex flex-center justify-center"
        style={{ backgroundColor: "var(--darkvibrant)" }}
      >
        {/* Make the one below darker in color than the one above, but the text a negative of the current color*/}
        <Link
          to="/"
          className="py-3 px-4 text-4xl"
          style={{
            backgroundColor: "var(--lightvibrant)",
            color: "var(--darkvibrant)",
          }}
        >
          Guess the Rating!
        </Link>
      </header>
      {/* Game content */}
      {/* On the left side, show the game guessing rating thing */}
      {/* On the right side, show the score */}
    </div>
  );
};

export default HeaderComponent;
