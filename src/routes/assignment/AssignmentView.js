import { useState, useEFfect } from "react";
import "./assignment.css";

import AssignHeader from "./components/AssignHeader";
import AssignLoading from "./components/AssignLoading";
import AssignError from "./components/AssignError";
import AssignContent from "./components/AssignContent";

function AssignmentView() {
  const [account, setAccount] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [assignData, setAssignData] = useState(undefined);
  const [error, setError] = useState(undefined);

  return (
    <section className="assign-body">
      <AssignHeader account={account} />

      {loading ? (
        <AssignLoading
          setAccount={setAccount}
          setLoading={setLoading}
          setAssignData={setAssignData}
          setError={setError}
        />
      ) : error ? (
        <AssignError error={error} />
      ) : (
        <AssignContent assignData={assignData} account={account} />
      )}
    </section>
  );
}

export default AssignmentView;
