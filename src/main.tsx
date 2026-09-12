import React from "react";
import { createRoot } from "react-dom/client";
import TypewellApp from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<TypewellApp initialPath={window.location.pathname} />);
