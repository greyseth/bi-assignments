import { useState } from "react";
import { redirect } from "react-router-dom";

import "../login.css";

import viewPassword from "../../../assets/img/viewpassword.svg";
import noViewPassword from "../../../assets/img/noviewpassword.svg";

function LoginForm({ setFormSelection, setLoginData, errorMessage }) {
  const [emailInput, setEmailInput] = useState(undefined);
  const [passwordInput, setPasswordInput] = useState(undefined);
  const [showPassword, setShowPassword] = useState(true);

  function togglePasswordView() {
    setShowPassword((prev) => !prev);
  }

  function handleLogin() {
    setLoginData({ email: emailInput, password: passwordInput });
  }

  return (
    <div className="login-form">
      <h2>One place to put it all</h2>
      <p className="login-desc">
        BI Assignments gives you a place to store and keep track of all your
        school assignments.
      </p>

      <div className="login-items">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <div className="password-input">
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <div className="password-separator"></div>
          <button onClick={togglePasswordView}>
            <img src={showPassword ? viewPassword : noViewPassword} />
          </button>
        </div>
      </div>

      <div className="submit-container">
        <button className="submit-btn" onClick={handleLogin}>
          Log In
        </button>
        <p className="link" onClick={() => setFormSelection("signup")}>
          New here? Sign up!
        </p>
      </div>

      {errorMessage ? (
        <div className="error-msg">
          <p>{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
}

export default LoginForm;
