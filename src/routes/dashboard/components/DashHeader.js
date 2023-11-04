import "../dashboard.css";

import accIcon from "../../../assets/img/nopfp.svg";

function DashHeader({ account }) {
  return (
    <header>
      <div className="header-title">BI Assignments</div>
      <div className="header-account">
        <h2>{account ? account.data.username : "Loading account"}</h2>
        <img src={accIcon} className="svg-white" />
      </div>
    </header>
  );
}

export default DashHeader;
