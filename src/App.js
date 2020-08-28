import React from 'react';
import Routes from "./Routes"
import './App.css';

// Keyname for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "wist-token";

function App() {
  return <Routes />
}

export default App;
