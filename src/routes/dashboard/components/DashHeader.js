import "../dashboard.css";

import accIcon from "../../../assets/img/nopfp.svg";
import { useNavigate } from "react-router-dom";

function DashHeader({ account }) {
  let nav = useNavigate();

  return (
    <header>
      <div className="header-title">BI Assignments</div>
      <div
        className="header-account"
        onClick={() => nav("/user/" + account.data.user_id)}
      >
        <h2>{account ? account.data.username : "Loading account"}</h2>
        <img src={accIcon} className="svg-white" />
      </div>
    </header>
  );
}

export default DashHeader;
