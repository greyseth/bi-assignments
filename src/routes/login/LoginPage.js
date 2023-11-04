import { useState, useEffect } from "react";
import "./login.css";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import LoginHeader from "./components/LoginHeader";
import LoginLoading from "./Loading";

function LoginPage() {
  const [formSelection, setFormSelection] = useState("login");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loginData, setLoginData] = useState(undefined);
  const [signupData, setSignupData] = useState(undefined);

  return (
    <section className="login-body">
      <LoginHeader />

      <div className="promo-image"></div>
      {loginData || signupData ? (
        <LoginLoading
          loginData={loginData}
          setLoginData={setLoginData}
          signupData={signupData}
          setSignupData={setSignupData}
          setErrorMessage={setErrorMessage}
        />
      ) : formSelection === "login" ? (
        <LoginForm
          setFormSelection={setFormSelection}
          setLoginData={setLoginData}
          errorMessage={errorMessage}
        />
      ) : (
        <SignupForm
          setFormSelection={setFormSelection}
          setSignupData={setSignupData}
          errorMessage={errorMessage}
        />
      )}
    </section>
  );
}

export default LoginPage;
