import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import ToDoWithBootstrap from "./ToDoApp/ToDoAppIndex.js";
// import SortingIndex from "./AlgoRhytm/Sorting/SortingIndex";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AlgoIndex from "./AlgoRhytm/AlgoIndex.js";

ReactDOM.render(
  <React.StrictMode>
    <AlgoIndex />
  </React.StrictMode>,
  document.getElementById("root")
);
