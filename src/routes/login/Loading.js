import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../api/API";
import cookie, { getCookie, setCookie } from "../../cookies/Cookie";

function LoginLoading({
  loginData,
  setLoginData,
  signupData,
  setSignupData,
  setErrorMessage,
}) {
  const nav = useNavigate();

  let signingUp = false;

  useEffect(() => {
    async function userLogin() {
      const req = await postRequest("users/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (req.error) {
        setErrorMessage("An unexpected error has occurred");
        setSignupData(undefined);
        setLoginData(undefined);
        return;
      } else {
        if (req.success) {
          setCookie("login_id", req.login_id, 30);
          setCookie("login_token", req.login_token, 30);
          nav("/");
        } else {
          console.log("failed");
          setErrorMessage(req.failMsg);
          setSignupData(undefined);
          setLoginData(undefined);
        }
      }
    }

    async function userSignup() {
      if (signingUp) return;
      signingUp = true;

      const req = await postRequest("users/signup", {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
      });
      console.log(req);

      if (req.error) {
        setErrorMessage("An unexpected error has occurred");
        setSignupData(undefined);
      } else {
        if (req.success) {
          setCookie("login_id", req.data.user_id, 30);
          setCookie("login_token", req.data.login_token, 30);
          nav("/");
        } else {
          console.log(req.failMsg);
          setErrorMessage(req.failMsg);
          setSignupData(undefined);
        }
      }

      signingUp = true;
    }

    if (loginData) {
      //Validates input
      if (!loginData.email || !loginData.password) {
        setErrorMessage("All login credentials required!");
        setLoginData(undefined);
        return;
      }

      if (!loginData.email.endsWith("@gmail.com")) {
        setErrorMessage("Valid Email required!");
        setLoginData(undefined);
        return;
      }

      userLogin();
    } else if (signupData) {
      //Validates input
      if (!signupData.username || !signupData.email || !signupData.password) {
        setErrorMessage("All credentials required!");
        setSignupData(undefined);
        return;
      }

      if (signupData.username.length >= 20) {
        setErrorMessage("Username can't be longer than 20 characters!");
        setSignupData(undefined);
        return;
      }

      if (!signupData.email.endsWith("@gmail.com")) {
        setErrorMessage("Valid Email required!");
        setSignupData(undefined);
        return;
      }

      if (signupData.password.length < 8) {
        setErrorMessage("Password must be 8 characters or longer!");
        setSignupData(undefined);
        return;
      }

      userSignup();
    }
  }, []);

  return (
    <div className="login-form">
      <h2>Loading...</h2>
      <p className="login-desc">
        Please wait a moment while the system does it's thing.
      </p>
    </div>
  );
}

export default LoginLoading;
