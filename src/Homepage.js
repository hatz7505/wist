import React, { useState } from "react";
import "./Homepage.css";
import Login from "./Login";
import Signup from "./Signup";

function Homepage() {
  const [loginStatus, setLoginStatus] = useState("none");

  function setSignup() {
    setLoginStatus("signup");
  }

  function setLogin() {
    setLoginStatus("login");
  }

  return (
    <div>
      <div className="lavendar-block"></div>
      <h1 className="title">Wist</h1>
      <div className="under-title">your wish list, reimagined</div>
      {loginStatus === "none" && (
        <div>
          <button className="sign-up" onClick={() => setSignup()}>
            sign up
          </button>
          <button className="log-in" onClick={() => setLogin()}>
            log in
          </button>
        </div>
      )}
      {loginStatus === "login" && <Login />}
      {loginStatus === "signup" && <Signup />}
    </div>
  );
}

export default Homepage;
