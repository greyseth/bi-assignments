import { useState } from "react";
import { useParams } from "react-router-dom";
import "./user.css";

import UserHeader from "./components/UserHeader";
import UserLoading from "./components/UserLoading";
import UserContent from "./components/UserContent";
import UserError from "./components/UserError";

function UserPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const [account, setAccount] = useState(undefined);
  const [viewAccount, setViewAccount] = useState(undefined);

  return (
    <div className="user-body">
      <UserHeader
        viewAccount={viewAccount}
        setViewAccount={setViewAccount}
        setLoading={setLoading}
        account={account}
      />

      {loading ? (
        <UserLoading
          setLoading={setLoading}
          setError={setError}
          setAccount={setAccount}
          setViewAccount={setViewAccount}
        />
      ) : error ? (
        <UserError error={error} />
      ) : (
        <UserContent account={account} viewAccount={viewAccount} />
      )}
    </div>
  );
}

export default UserPage;
