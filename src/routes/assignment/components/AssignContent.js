import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assignment.css";

import addIcon from "../../../assets/img/add.svg";
import removeIcon from "../../../assets/img/remove.svg";
import AssignFile from "./AssignFile";
import UploadMenu from "./UploadMenu";
import { getRequest, postRequest } from "../../../api/API";
import { getCookie } from "../../../cookies/Cookie";

function AssignContent({ assignData, account, setError }) {
  const [updTitle, setUpdTitle] = useState(assignData.title);
  const [updDesc, setUpdDesc] = useState(assignData.description);
  const [updSubject, setUpdSubject] = useState(assignData.subject);
  const [updAttach, setUpdAttach] = useState(assignData.attachments);
  const [updVis, setUpdVis] = useState(
    assignData.public ? "public" : "private"
  );

  const [uploadMenu, setUploadMenu] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  let nav = useNavigate();

  async function handleUpdate() {
    setIsUpdating(true);

    const req = await postRequest("assignments/update", {
      assign_id: assignData.assign_id,
      updData: {
        title: updTitle,
        description: updDesc,
        subject: updSubject,
        public: updVis === "public" ? true : false,
      },
    });

    if (req.error) setError("An error has occurred");

    setIsUpdating(false);
  }

  async function handleDelete() {
    setIsDeleting(true);

    const req = await getRequest("assignments/delete/" + assignData.assign_id);
    if (req.error) setError("An error has occurred during assignment deletion");
    else {
      if (getCookie("last_class")) nav("/class/" + getCookie("last_class"));
      else nav("/");
    }

    setIsDeleting(false);
  }

  return (
    <div className="assign-content">
      {uploadMenu ? (
        <UploadMenu
          setUploadMenu={setUploadMenu}
          updAttach={updAttach}
          setUpdAttach={setUpdAttach}
          account={account}
        />
      ) : null}

      <div className="assign-content-inputs">
        <input
          type="text"
          placeholder="Assignment title"
          value={updTitle}
          onChange={(e) => setUpdTitle(e.target.value)}
          readOnly={assignData.owner_id === account.user_id ? false : true}
        />
        <textarea
          placeholder="Assignment description"
          onChange={(e) => setUpdDesc(e.target.value)}
          value={updDesc}
          readOnly={assignData.owner_id === account.user_id ? false : true}
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
          {updAttach.length > 0 ? (
            <ul>
              {updAttach.map((a) => (
                <AssignFile
                  account={account}
                  assignData={assignData}
                  updAttach={updAttach}
                  setUpdAttach={setUpdAttach}
                  file={a}
                  key={a}
                />
              ))}
            </ul>
          ) : (
            <p className="no-files">No attachments have been uploaded yet</p>
          )}

          {assignData.owner_id === account.user_id ? (
            <div className="file-controls">
              <button onClick={() => setUploadMenu(true)}>
                <img className="svg-white" src={addIcon} />
              </button>
            </div>
          ) : null}
        </div>
        {assignData.owner_id === account.user_id ? (
          <div className="owner-actions">
            <button className="green-button" onClick={handleUpdate}>
              {isUpdating ? "Saving..." : "Update"}
            </button>
            <button className="green-button" onClick={handleDelete}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ) : (
          <div className="owner-actions">
            <button
              className="green-button"
              onClick={() => nav("/user/" + assignData.owner_id)}
            >
              View profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignContent;
