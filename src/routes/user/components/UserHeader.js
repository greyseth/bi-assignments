import { useNavigate } from "react-router-dom";

import accIcon from "../../../assets/img/nopfp.svg";

function UserHeader({ account, viewAccount, setViewAccount, setLoading }) {
  let nav = useNavigate();

  return (
    <header>
      <div className="header-title">
        <p>{!viewAccount ? "User Page" : `Viewing ${viewAccount.username}`}</p>
        <button className="green-button" onClick={() => nav("/")}>
          Return
        </button>
      </div>
      <div
        className="header-account"
        onClick={() => {
          nav("/user/" + account.user_id);
          setLoading(true);
          setViewAccount(undefined);
        }}
      >
        <h2>{account ? account.username : "Loading..."}</h2>
        <img src={accIcon} className="svg-white" />
      </div>
    </header>
  );
}

export default UserHeader;
