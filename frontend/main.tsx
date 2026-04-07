import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./global.css";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <App />
    </ClerkProvider>
  </StrictMode>
);