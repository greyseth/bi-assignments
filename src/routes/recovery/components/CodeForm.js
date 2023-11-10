import { useState } from "react";
import { getRequest, postRequest } from "../../../api/API";

import errorIcon from "../../../assets/img/error.svg";

function CodeForm({ userId, email, setResetting }) {
  const [error, setError] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);

  const [code, setCode] = useState("");

  async function handleSubmit() {
    if (submitting) return;

    if (!code) {
      setError("Recovery code not filled in!");
      return;
    }

    setSubmitting(true);

    //Checks data in API
    const req = await postRequest("recovery/verify", {
      user_id: userId,
      code: code,
    });
    if (req.error) return setError("An unknown error has occurred");

    if (req.success) {
      setResetting(true);
    } else setError(`Incorrect recovery code`);

    setSubmitting(false);
  }

  return (
    <div className="recover-form">
      <div className="recover-form-header">
        <h2>Check your mail</h2>
      </div>
      <div className="recover-form-body">
        <p>A recovery code has been sent to {email}</p>
        <input
          type="text"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Recovery code"
        />
        <button
          className="green-button"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Checking..." : "Reset password"}
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

export default CodeForm;
