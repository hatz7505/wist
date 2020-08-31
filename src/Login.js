import React, { useState } from "react";
import "./login.css";
import Signup from "./Signup";
import WistApi from "./api";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [signup, setSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function login(signupData) {
    try {
      await WistApi.login(signupData);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  function goToSignup() {
    setSignup(true);
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
    let result = await login(formData);
    if (result.success) {
      history.push("/dashboard");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div>
      {!signup ? (
        <div className="login-form">
          <div className="welcome-back">welcome back :)</div>
          <form onSubmit={handleSubmit}>
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
            <button className="login">log in</button>
          </form>
          <div>
            don't have an account?
            <button className="signup-from-login" onClick={() => goToSignup()}>
              sign up
            </button>
          </div>
          {formErrors.length
            ? formErrors.map((error) => (
                <p className="error" key={error}>
                  {error}
                </p>
              ))
            : null}
        </div>
      ) : (
        <Signup />
      )}
    </div>
  );
}

export default Login;
