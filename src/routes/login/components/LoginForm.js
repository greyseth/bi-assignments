import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

import "../login.css";

import viewPassword from "../../../assets/img/viewpassword.svg";
import noViewPassword from "../../../assets/img/noviewpassword.svg";
import { eraseCookie, getCookie } from "../../../cookies/Cookie";

function LoginForm({ setFormSelection, setLoginData, errorMessage }) {
  const [emailInput, setEmailInput] = useState(undefined);
  const [passwordInput, setPasswordInput] = useState(undefined);
  const [showPassword, setShowPassword] = useState(true);

  let nav = useNavigate();

  function togglePasswordView() {
    setShowPassword((prev) => !prev);
  }

  function handleLogin() {
    eraseCookie("reset_password");
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
        <p className="link" onClick={() => nav("/recovery")}>
          Forgor password? 💀
        </p>
      </div>

      {errorMessage ? (
        <div className="error-msg">
          <p>{errorMessage}</p>
        </div>
      ) : null}

      {getCookie("reset_password") ? (
        <div className="error-msg">
          <p style={{ color: "limegreen" }}>Successfully reset password</p>
        </div>
      ) : null}
    </div>
  );
}

export default LoginForm;
