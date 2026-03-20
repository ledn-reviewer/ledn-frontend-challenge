import ReactDOM from "react-dom/client";
import { App } from "./App";
import { makeServer } from "./server";

import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

makeServer();
