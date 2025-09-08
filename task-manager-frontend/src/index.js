import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";   // ✅ named import
import awsConfig from "./aws-exports";
import App from "./App";
import "./index.css";

Amplify.configure(awsConfig);            // ✅ configure once here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
