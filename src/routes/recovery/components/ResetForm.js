import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../cookies/Cookie";

import errorIcon from "../../../assets/img/error.svg";
import viewPassword from "../../../assets/img/viewpassword.svg";
import noViewPassword from "../../../assets/img/noviewpassword.svg";
import { postRequest } from "../../../api/API";

function ResetForm({ userId }) {
  const [error, setError] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let nav = useNavigate();

  async function handleSubmit() {
    if (submitting) return;

    if (!passwordInput || !confirmPassword) {
      setError("Fields can't be empty");
      return;
    }

    if (passwordInput !== confirmPassword) {
      setError("Password confirmation does not match");
      return;
    }

    setSubmitting(true);

    const req = await postRequest("recovery/reset", {
      user_id: userId,
      newPass: passwordInput,
    });

    if (req.error) return setError("An unknown error has occurred");
    else {
      setCookie("reset_password", true, 1);
      nav("/login");
    }

    setSubmitting(false);
  }

  return (
    <div className="recover-form">
      <div className="recover-form-header">
        <h2>Reset your password</h2>
      </div>
      <div className="recover-form-body">
        <p>Reset your account password</p>
        <div className="recov-pw">
          <input
            type={!showPassword ? "password" : "text"}
            placeholder="New password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <div className="recov-separator"></div>
          <button
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            <img src={showPassword ? noViewPassword : viewPassword} />
          </button>
        </div>
        <div className="recov-pw">
          <input
            type={!showPasswordConfirm ? "password" : "text"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="recov-separator"></div>
          <button
            onClick={() => {
              setShowPasswordConfirm((prev) => !prev);
            }}
          >
            <img src={showPasswordConfirm ? noViewPassword : viewPassword} />
          </button>
        </div>
        <button
          className="green-button"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Checking..." : "Reset"}
        </button>
      </div>
      {error ? (
        <div className="recover-form-error">
          <img src={errorIcon} className="svg-red" />
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ResetForm;
