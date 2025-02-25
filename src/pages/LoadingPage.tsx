import React from "react";
import "../styles/globals.css";

const LoadingPage: React.FC = () => {
  return (
    <div
      className="flex justify-center text-center items-center h-screen text-8xl space-x-2 font-bold"
      style={{
        backgroundColor: `hsl(${125}, ${100}%, ${50}%)`,
        color: `hsl(${0}, ${100}%, ${100}%)`,
      }}
    >
      {"LOADING".split("").map((char, index) => (
        <span
          key={index}
          className="animate-bounce-wave inline-block"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default LoadingPage;
