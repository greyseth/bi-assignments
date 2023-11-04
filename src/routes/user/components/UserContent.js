import { useState } from "react";
import "../user.css";

function UserContent({ account, viewAccount }) {
  const [updUsername, setUpdUsername] = useState(viewAccount.username);
  const [updEmail, setUpdEmail] = useState(viewAccount.email);
  const [updBio, setUpdBio] = useState(viewAccount.bio);

  return (
    <div className="user-content">
      <input
        placeholder="Username"
        value={updUsername}
        onChange={(e) => setUpdUsername(e.target.value)}
      />
      <input
        placeholder="Email"
        value={updEmail}
        onChange={(e) => setUpdEmail(e.target.value)}
      />
      <textarea
        placeholder="Bio"
        value={updBio}
        onChange={(e) => setUpdBio(e.target.value)}
      ></textarea>

      <div className="user-content-submit">
        <button className="green-button">Update account data</button>
        <button className="green-button">Log out</button>
      </div>
    </div>
  );
}

export default UserContent;
