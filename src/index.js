import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheet/style.css";
ReactDOM.render(
  <React.StrictMode>
    <App style={{ overflow: "scroll" }} />
  </React.StrictMode>,
  document.getElementById("root")
);
