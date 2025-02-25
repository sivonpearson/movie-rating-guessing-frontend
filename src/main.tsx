// import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";

// Import global styles
import "./styles/globals.css"; // Tailwind CSS or other global CSS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode> // TODO: use this right
  <Router>
    <App />
  </Router>
  // </React.StrictMode>
);
