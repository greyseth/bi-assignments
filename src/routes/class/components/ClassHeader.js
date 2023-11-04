import { useNavigate } from "react-router-dom";
import accIcon from "../../../assets/img/nopfp.svg";

function ClassHeader({ className, account }) {
  const nav = useNavigate();

  return (
    <header>
      <div className="header-title">
        <div>{className ? className : "Loading class"}</div>
        <button className="green-button" onClick={() => nav("/")}>
          Return
        </button>
      </div>
      <div
        className="header-account"
        onClick={() => {
          if (account) nav(`/user/${account.user_id}`);
        }}
      >
        <h2>{account ? account.username : "Loading account..."}</h2>
        <img src={accIcon} className="svg-white" />
      </div>
    </header>
  );
}

export default ClassHeader;
