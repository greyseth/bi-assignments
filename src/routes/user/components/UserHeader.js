import { useNavigate } from "react-router-dom";

import accIcon from "../../../assets/img/nopfp.svg";

function UserHeader({ viewAccount }) {
  let nav = useNavigate();

  return (
    <header>
      <div className="header-title">
        <p>{!viewAccount ? "Loading..." : `Viewing ${viewAccount.username}`}</p>
        <button className="green-button" onClick={() => nav("/")}>
          Return
        </button>
      </div>
      <div className="header-account">
        <h2>Username here</h2>
        <img src={accIcon} className="svg-white" />
      </div>
    </header>
  );
}

export default UserHeader;
