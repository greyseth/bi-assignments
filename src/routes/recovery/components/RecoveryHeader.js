import { useNavigate } from "react-router-dom";

function RecoveryHeader() {
  let nav = useNavigate();

  return (
    <header>
      <div className="header-title">
        <p>Recovery</p>
        <button className="green-button" onClick={() => nav("/login")}>
          Return
        </button>
      </div>
    </header>
  );
}

export default RecoveryHeader;
