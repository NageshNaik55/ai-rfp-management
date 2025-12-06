import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import http from "./api/http";
window.$http = http;

createRoot(document.getElementById("root")).render(<App />);
