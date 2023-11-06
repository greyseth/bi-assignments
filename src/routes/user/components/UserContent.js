import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../user.css";
import { postRequest } from "../../../api/API";
import { eraseCookie } from "../../../cookies/Cookie";

function UserContent({ account, viewAccount }) {
  const [updUsername, setUpdUsername] = useState(viewAccount.username);
  const [updEmail, setUpdEmail] = useState(viewAccount.email);
  const [updBio, setUpdBio] = useState(viewAccount.bio);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  let nav = useNavigate();
  let { user_id } = useParams();

  async function handleUpdate() {
    if (isLoggingOut) return;
    setIsUpdating(true);

    const req = await postRequest("users/update/" + user_id, {
      user_id: user_id,
      updatedData: {
        username: updUsername,
        bio: updBio,
      },
    });

    if (req.error) {
      alert("An error has occurred during account update");
      setUpdUsername(viewAccount.username);
      setUpdBio(viewAccount.bio);
      setIsUpdating(false);
    }

    setIsUpdating(true);
  }

  async function handleLogout() {
    if (isUpdating) return;
    setIsLoggingOut(true);

    eraseCookie("login_id");
    eraseCookie("login_token");
    nav("/login");

    setIsLoggingOut(false);
  }

  return (
    <div className="user-content">
      <input
        placeholder="Username"
        value={updUsername}
        onChange={(e) => setUpdUsername(e.target.value)}
        readOnly={account.user_id.toString() === user_id ? false : true}
      />
      <input
        placeholder="Email"
        value={updEmail}
        onChange={(e) => setUpdEmail(e.target.value)}
        readOnly={true}
      />
      <textarea
        placeholder="Bio"
        value={updBio ? updBio : ""}
        onChange={(e) => setUpdBio(e.target.value)}
        readOnly={account.user_id.toString() === user_id ? false : true}
      ></textarea>

      {account.user_id.toString() === user_id ? (
        <div className="user-content-submit">
          <button className="green-button" onClick={handleUpdate}>
            {isUpdating ? "Saving..." : "Upate account data"}
          </button>
          <button className="green-button" onClick={handleLogout}>
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default UserContent;
