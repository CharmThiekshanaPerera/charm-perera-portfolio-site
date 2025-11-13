// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ADD THIS:
import { injectSpeedInsights } from "@vercel/speed-insights";
injectSpeedInsights();

createRoot(document.getElementById("root")!).render(<App />);
