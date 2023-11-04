import { useState, useEffect } from "react";
import { postRequest } from "../../../api/API";
import { useNavigate, useParams } from "react-router-dom";
import "../class_page.css";

import closeIcon from "../../../assets/img/close.svg";

function AssignmentForm({ setAddAssignment, classData, account }) {
  const [dataInput, setDataInput] = useState(undefined);
  const [error, setError] = useState(undefined);

  return (
    <div className="assign-window-container">
      {!dataInput ? (
        <FormContents
          setDataInput={setDataInput}
          classData={classData}
          account={account}
          setAddAssignment={setAddAssignment}
        />
      ) : !error ? (
        <Uploading dataInput={dataInput} setError={setError} />
      ) : (
        <Error error={error} setError={setError} setDataInput={setDataInput} />
      )}
    </div>
  );
}

function Uploading({ dataInput, setError }) {
  let nav = useNavigate();
  let uploading = false;

  useEffect(() => {
    async function uploadAssign() {
      if (uploading) return;
      uploading = true;

      console.log(dataInput);
      const req = await postRequest("assignments/new", dataInput);
      if (req.error) setError(req.error);
      else nav("/assignment/" + req.data);

      uploading = false;
    }

    uploadAssign();
  }, []);

  return (
    <div className="assign-window">
      <div className="assign-window-header">
        <p>Uploading assignment...</p>
      </div>
      <div className="assign-window-message">
        <p>Uploading new assignment {dataInput.title}</p>
      </div>
    </div>
  );
}

function Error({ error, setError, setDataInput }) {
  return (
    <div className="assign-window">
      <div className="assign-window-header">
        <p>An error has occurred</p>
        <img
          src={closeIcon}
          className="svg-white"
          onClick={() => {
            setError(undefined);
            setDataInput(undefined);
          }}
        />
      </div>
      <div className="assign-window-message">
        <p>{error}</p>
      </div>
    </div>
  );
}

function FormContents({ setDataInput, classData, account, setAddAssignment }) {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("unselected");
  const [visInput, setVisInput] = useState("public");

  function handleSubmit() {
    if (subjectInput === "unselected") {
      alert("You must select a subject!");
      return;
    }

    const newDataInput = {
      title: titleInput,
      description: descInput,
      subject: subjectInput,
      public: visInput === "public" ? true : false,
      class_id: classData.class_id,
      owner_id: account.user_id,
      attachments: [],
    };

    setDataInput(newDataInput);
  }

  return (
    <div className="assign-window">
      <div className="assign-window-header">
        <p>Add an assignment</p>
        <img
          src={closeIcon}
          className="svg-white"
          onClick={() => setAddAssignment(false)}
        />
      </div>

      <div className="assign-window-inputs">
        <input
          type="text"
          placeholder="Assignment title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <textarea
          placeholder="Describe the job"
          onChange={(e) => setDescInput(e.target.value)}
        ></textarea>
        <div>
          <select onChange={(e) => setSubjectInput(e.target.value)}>
            <option value="unselected" key={"unselected"}>
              Select a subject
            </option>
            {classData.subjects.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </select>
          {/* <div className="file-input-container">
            <input type="file" onChange={handleUpload} />
            {fileUploading ? <p>Uploading...</p> : null}
          </div>
          <input
            type="text"
            placeholder="...or paste a link"
            onChange={(e) => setAttachmentInput(e.target.value)}
          /> */}
        </div>
      </div>

      <div className="assign-window-submit">
        <div className="toggle-container">
          <div className="vis-toggle">
            <button
              disabled={visInput === "public"}
              onClick={() => setVisInput("public")}
            >
              Public
            </button>
            <div className="vis-separator"></div>
            <button
              disabled={visInput === "private"}
              onClick={() => setVisInput("private")}
            >
              Private
            </button>
          </div>
          <p className="vis-message">
            {visInput === "public"
              ? "This assignment is public and will be visible to everyone in the class"
              : "This assignment is private and only you can view"}
          </p>
        </div>

        <button className="submit-btn green-button" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AssignmentForm;
