import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <ThemeProvider>

      <Toaster position="top-right" />

      <App />

    </ThemeProvider>

  </React.StrictMode>
);