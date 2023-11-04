import { useState } from "react";

import "../login.css";

import viewPassword from "../../../assets/img/viewpassword.svg";
import noViewPassword from "../../../assets/img/noviewpassword.svg";

function SignupForm({ setFormSelection, setSignupData, errorMessage }) {
  const [usernameInput, setUsernameInput] = useState(undefined);
  const [emailInput, setEmailInput] = useState(undefined);
  const [passwordInput, setPasswordInput] = useState(undefined);

  const [showPassword, setShowPassword] = useState(true);

  function togglePasswordView() {
    setShowPassword((prev) => !prev);
  }

  function handleSignup() {
    setSignupData({
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    });
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
          placeholder="Username"
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <div className="password-input">
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Create a password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <div className="password-separator"></div>
          <button onClick={togglePasswordView}>
            <img src={showPassword ? viewPassword : noViewPassword} />
          </button>
        </div>
      </div>

      <div className="submit-container">
        <button className="submit-btn" onClick={handleSignup}>
          Sign Up
        </button>
        <p className="link" onClick={() => setFormSelection("login")}>
          Have an account? Log in!
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

export default SignupForm;
