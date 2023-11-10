import { useState, useEffect } from "react";
import RecoveryHeader from "./components/RecoveryHeader";
import EmailForm from "./components/EmailForm";
import CodeForm from "./components/CodeForm";
import ResetForm from "./components/ResetForm";
import "./recovery.css";

function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [resetting, setResetting] = useState(false);

  return (
    <section className="recover-body">
      <RecoveryHeader />

      {!userId ? <EmailForm setUserId={setUserId} setEmail={setEmail} /> : null}

      {userId && !resetting ? (
        <CodeForm email={email} userId={userId} setResetting={setResetting} />
      ) : resetting ? (
        <ResetForm userId={userId} />
      ) : null}
    </section>
  );
}

export default RecoveryPage;
