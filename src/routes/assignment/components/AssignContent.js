import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assignment.css";

import addIcon from "../../../assets/img/add.svg";
import removeIcon from "../../../assets/img/remove.svg";
import AssignFile from "./AssignFile";
import UploadMenu from "./UploadMenu";

function AssignContent({ assignData, account }) {
  const [updTitle, setUpdTitle] = useState(assignData.title);
  const [updDesc, setUpdDesc] = useState(assignData.description);
  const [updSubject, setUpdSubject] = useState(assignData.subject);
  const [updVis, setUpdVis] = useState(
    assignData.public ? "public" : "private"
  );

  const [uploadMenu, setUploadMenu] = useState(false);

  let nav = useNavigate();

  return (
    <div className="assign-content">
      {uploadMenu ? <UploadMenu setUploadMenu={setUploadMenu} /> : null}

      <div className="assign-content-inputs">
        <input
          type="text"
          placeholder="Assignment title"
          value={updTitle}
          onChange={(e) => setUpdTitle(e.target.value)}
        />
        <textarea
          placeholder="Assignment description"
          onChange={(e) => setUpdDesc(e.target.value)}
          value={updDesc}
        ></textarea>
      </div>

      <div className="assign-window-submit">
        <div className="toggle-container">
          <div className="vis-toggle">
            <button
              disabled={updVis === "public"}
              onClick={() => setUpdVis("public")}
            >
              Public
            </button>
            <div className="vis-separator"></div>
            <button
              disabled={updVis === "private"}
              onClick={() => setUpdVis("private")}
            >
              Private
            </button>
          </div>
          <p className="vis-message">
            {updVis === "public"
              ? "This assignment is public and will be visible to everyone in the class"
              : "This assignment is private and only you can view"}
          </p>
        </div>

        <select
          onChange={(e) => setUpdSubject(e.target.value)}
          value={updSubject}
        >
          {assignData.class_subjects.map((s) => {
            return (
              <option value={s} key={s}>
                {s}
              </option>
            );
          })}
        </select>
      </div>

      <div className="assign-content-actions">
        <div className="file-list">
          {assignData.attachments.length > 0 ? (
            <ul>
              {assignData.attachments.map((a) => (
                <AssignFile
                  account={account}
                  assignData={assignData}
                  file={a}
                  key={a}
                />
              ))}
            </ul>
          ) : (
            <p className="no-files">No attachments have been uploaded yet</p>
          )}

          <div className="file-controls">
            <button onClick={() => setUploadMenu(true)}>
              <img className="svg-white" src={addIcon} />
            </button>
          </div>
        </div>
        {assignData.owner_id === account.user_id ? (
          <div className="owner-actions">
            <button className="green-button">Update</button>
            <button className="green-button">Delete</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AssignContent;
