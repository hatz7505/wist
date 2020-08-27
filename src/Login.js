import React, {useState} from "react";
import "./login.css";
import Signup from "./Signup";


function Login() {
  const [signup, setSignup] = useState(false);

  function goToSignup() {
    setSignup(true);
  }

  return (
    <div>
      {!signup ? (
      <div className="login-form">
        <div className="welcome-back">welcome back :)</div>
        <form>
          <label>username</label>
          <input type="text" id="username" name="username"></input>
          <label>password</label>
          <input type="text" id="password" name="password"></input>
          <button className="login">log in</button>
        </form>
        <div>
          don't have an account?
          <button className="signup-from-login" onClick={() => goToSignup()}>
            sign up
          </button>
        </div>
      </div>
      ) : <Signup />}
    </div>
  );
}

export default Login;