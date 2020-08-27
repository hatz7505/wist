import React from "react";
import "./signup.css"


function Signup() {
  return (
    <div className="signup-form">
      <div className="welcome">welcome :)</div>
      <form>
        <label>first name</label>
        <input type="text" id="firstName" name="firstName"></input>
        <label>last name</label>
        <input type="text" id="lastName" name="lastName"></input>
        <label>email</label>
        <input type="text" id="email" name="email"></input>
        <label>username</label>
        <input type="text" id="username" name="username"></input>
        <label>password</label>
        <input type="text" id="password" name="password"></input>
        <label>re enter password</label>
        <input type="text" id="rePassword" name="rePassword"></input>
        <button className="signup">sign up</button>
      </form>
    </div>
  );
}

export default Signup;
