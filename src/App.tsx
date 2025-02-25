import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import GamePage from "./pages/GamePage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gamepage" element={<GamePage difficulty={0} />} />
    </Routes>
  );
}

export default App;
