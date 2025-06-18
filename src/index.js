import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MovieProvider from "./context/Movie.context";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "demo-client-id";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Conditional rendering based on Google Client ID availability
const AppWithAuth = () => {
  if (process.env.REACT_APP_GOOGLE_CLIENT_ID && process.env.REACT_APP_GOOGLE_CLIENT_ID !== "your_google_client_id_here") {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    );
  } else {
    // Render without Google OAuth if client ID is not properly configured
    return <App />;
  }
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <AppWithAuth />
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
