import downloadIcon from "../../../assets/img/download.svg";
import deleteIcon from "../../../assets/img/delete.svg";

function AssignFile({ account, assignData, file }) {
  return (
    <li key={assignData.assign_id}>
      <p>{file}</p>
      <div className="file-item-controls">
        <button>
          <img className="svg-white" src={downloadIcon} />
        </button>
        {assignData.owner_id === account.user_id ? (
          <button className="del-btn">
            <img className="svg-white" src={deleteIcon} />
          </button>
        ) : null}
      </div>
    </li>
  );
}

export default AssignFile;
