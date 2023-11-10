import { useState } from "react";
import { getRequest } from "../../../api/API";

import errorIcon from "../../../assets/img/error.svg";

function EmailForm({ setUserId, setEmail }) {
  const [error, setError] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);

  const [tempEmail, setTempEmail] = useState("");

  async function handleSubmit() {
    if (submitting) return;

    if (!tempEmail.endsWith("@gmail.com")) {
      setError("Invalid email provided");
      return;
    }

    setSubmitting(true);

    //Checks data in API
    const req = await getRequest("recovery/sendcode/" + tempEmail);
    if (req.error) return setError("An unknown error has occurred");

    if (req.success) {
      //Change this in api later
      setUserId(req.user_id);
      setEmail(tempEmail);
    } else setError(req.failMsg);

    setSubmitting(false);
  }

  return (
    <div className="recover-form">
      <div className="recover-form-header">
        <h2>Enter your email</h2>
      </div>
      <div className="recover-form-body">
        <p>Enter the email you used for your account</p>
        <input
          type="text"
          onChange={(e) => setTempEmail(e.target.value)}
          placeholder="Email address"
        />
        <button
          className="green-button"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Checking..." : "Recover"}
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

export default EmailForm;
