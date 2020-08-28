import React, { useState } from "react";
import "./signup.css";
import Login from "./Login";
import WistApi from "./api";

function Signup() {
  const [login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  async function signup(signupData) {
    try {
      await WistApi.signup(signupData);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      console.log(result);
    } else {
      setFormErrors(result.errors);
    }
  }

  function goToLogin() {
    setLogin(true);
  }

  return (
    <div>
      {!login ? (
        <div className="signup-form">
          <div className="welcome">welcome :)</div>
          <form onSubmit={handleSubmit}>
            <label>first name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            ></input>
            <label>last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            ></input>
            <label>email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
            <label>username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>
            <label>password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
            <button className="signup">sign up</button>
          </form>
          <div>
            already have an account?
            <button className="login-from-signup" onClick={() => goToLogin()}>
              log in
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Signup;
