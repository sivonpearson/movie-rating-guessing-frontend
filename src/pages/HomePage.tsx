import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-bl from-green-200 to-blue-800">
      <div className="flex-col space-y-10 items-center text-center">
        <h1 className="text-8xl font-bold bg-gradient-to-br from-white to-fuchsia-200 text-transparent bg-clip-text py-5">
          Guess the Rating!
        </h1>
        <Link
          to="/gamepage"
          className="bg-black hover:bg-white text-white hover:text-black font-bold py-3 px-4 rounded transition-all duration-300 text-4xl"
        >
          Play
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
