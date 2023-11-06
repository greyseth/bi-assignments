import { useNavigate } from "react-router-dom";
import "../assignment.css";

import accIcon from "../../../assets/img/nopfp.svg";
import { getCookie } from "../../../cookies/Cookie";

function AssignHeader({ account }) {
  let nav = useNavigate();

  return (
    <header>
      <div className="header-title">
        <div>Assignment</div>
        <button
          className="green-button"
          onClick={() => {
            if (getCookie("last_class"))
              nav("/class/" + getCookie("last_class"));
            else nav("/");
          }}
        >
          Return
        </button>
      </div>
      <div
        className="header-account"
        onClick={() => nav("/user/" + account.user_id)}
      >
        <h2>{account ? account.username : "Loading..."}</h2>
        <img src={accIcon} className="svg-white" />
      </div>
    </header>
  );
}

export default AssignHeader;
