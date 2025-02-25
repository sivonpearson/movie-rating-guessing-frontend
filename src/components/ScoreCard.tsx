// import React from "react";
// import { useLocalStorage } from "../scripts/LocalStorage.ts";

// const ScoreCard: React.FC = () => {
//   const [num_guesses, setNumGuesses] = useLocalStorage("num_guesses", "0");
//   const [total_difference, setTotalDifference] = useLocalStorage(
//     "total_difference",
//     "0"
//   );

//   // show total number of guesses
//   // show total difference
//   // show overall average
//   // show number of perfect guesses

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex-col flex-center text-1xl">
//         <p>Total difference: {total_difference}</p>
//         <p>Number of guesses: {num_guesses}</p>
//         <p>
//           Average score:{" "}
//           {num_guesses == 0 ? 0.0 : total_difference / num_guesses}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ScoreCard;
