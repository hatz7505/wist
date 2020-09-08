import React, { useState } from "react";
import "./signup.css";
import Login from "./Login";
import WistApi from "./api";
import { useHistory } from "react-router-dom";
import { decode } from "jsonwebtoken";

function Signup() {
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function signup(signupData) {
    try {
      let result = await WistApi.signup(signupData);
      let { username } = decode(result);
      localStorage.setItem("username", username);
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
    for (let field in formData) {
      if (!formData[field].length) {
        setFormErrors(["All fields are required"]);
        return;
      }
    }
    let result = await signup(formData);
    if (result.success) {
      history.push("/dashboard");
    } else {
      setFormErrors(result.errors);
    }
  }

  function goToLogin() {
    setLogin(true);
  }

  function showErrors(arr) {
    let errors = arr.map((error) => {
      error =
        error === 'duplicate key value violates unique constraint "users_pkey"'
          ? "An account with that username already exists"
          : error;
      error =
        error ===
        'duplicate key value violates unique constraint "users_email_key"'
          ? "An account with that email already exists"
          : error;
      return (
        <p className="error" key={error}>
          {error}
        </p>
      );
    });
    return errors;
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
              type="password"
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
            {formErrors.length ? showErrors(formErrors) : null}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Signup;
