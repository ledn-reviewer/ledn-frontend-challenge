import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

makeServer();
