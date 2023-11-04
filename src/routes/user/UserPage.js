import { useState } from "react";
import { useParams } from "react-router-dom";
import "./user.css";

import UserHeader from "./components/UserHeader";
import UserLoading from "./components/UserLoading";
import UserContent from "./components/UserContent";
import UserError from "./components/UserError";

const dummyAccountData = {
  id: 1,
  username: "Greyseth",
  email: "anargya2gilland@gmail.com",
  bio: "I am a professional idiot",
};

function UserPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const [account, setAccount] = useState({ id: 1 });
  const [viewAccount, setViewAccount] = useState(dummyAccountData);

  let { user_id } = useParams();

  return (
    <div className="user-body">
      <UserHeader />

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
