import addIcon from "../../../assets/img/add.svg";

function DashControls({ setOpenMenu }) {
  return (
    <div className="class-controls">
      <div className="add-buttons">
        <button onClick={() => setOpenMenu(true)}>
          <p>New class</p>
          <img src={addIcon} className="svg-white" />
        </button>
      </div>
    </div>
  );
}

export default DashControls;
