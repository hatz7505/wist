import React from "react";
import Routes from "./Routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Keyname for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "wist-token";

function App() {

  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}

export default App;
