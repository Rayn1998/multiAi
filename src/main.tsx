import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@/index.scss";
import App from "@/components/App/App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
