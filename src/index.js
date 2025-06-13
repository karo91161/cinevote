import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
//import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/*<StarRating
      maxRating={5}
      messages={["Terrrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={5} defaultRating={3} />*/}
  </React.StrictMode>
);
