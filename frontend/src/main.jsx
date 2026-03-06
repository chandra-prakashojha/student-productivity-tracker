import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AppProvider>

      <App />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
      />

    </AppProvider>

  </React.StrictMode>
);