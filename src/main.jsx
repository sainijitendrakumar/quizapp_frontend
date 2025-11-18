// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Register from "./pages/Register.jsx";
import Quizpage from "./pages/Quizpage.jsx";
import Login from "./pages/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <App />
    {/* <Quizpage />
      <Register />
      <Login /> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
