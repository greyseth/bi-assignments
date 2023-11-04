import { useState, useEffect } from "react";
import "../class_page.css";

import closeIcon from "../../../assets/img/close.svg";
import { postRequest } from "../../../api/API";

function SubjectForm({ setAddSubject, classData, setClassData }) {
  const [error, setError] = useState(false);
  const [subjectInput, setSubjectInput] = useState(false);

  return (
    <div className="assign-window-container">
      {!subjectInput ? (
        <FormContents
          setSubjectInput={setSubjectInput}
          setAddSubject={setAddSubject}
        />
      ) : !error ? (
        <Uploading
          classData={classData}
          setClassData={setClassData}
          subjectInput={subjectInput}
          setError={setError}
        />
      ) : (
        <Error
          error={error}
          setError={setError}
          setSubjectInput={setSubjectInput}
        />
      )}
    </div>
  );
}

function Uploading({
  classData,
  setClassData,
  subjectInput,
  setError,
  setAddSubject,
}) {
  let uploading = false;

  useEffect(() => {
    //Validate user input
    if (!subjectInput) return setError("Subject name cannot be empty!");

    //Upload to db
    async function upload() {
      if (uploading) return;
      uploading = true;

      //Request object should contain class_id, name, and subjects
      const req = await postRequest("classes/newsubject", {
        class_id: classData.class_id,
        name: subjectInput,
        subjects: classData.subjects,
      });

      //TODO: Validate this function
      if (req.error) setError(req.error);
      else {
        setClassData((prev) => (prev.subjects = req.data));
        setAddSubject(false);
      }

      uploading = false;
    }

    upload();
  }, []);

  return (
    <div className="assign-window">
      <div className="assign-window-header">
        <p>Creating subject...</p>
      </div>
      <div className="assign-window-message">
        <p>Creating new subject {subjectInput}</p>
      </div>
    </div>
  );
}

function Error({ error, setError, setSubjectInput }) {
  return (
    <div className="assign-window">
      <div className="assign-window-header">
        <p>An error has occurred</p>
        <img
          src={closeIcon}
          className="svg-white"
          onClick={() => {
            setError(undefined);
            setSubjectInput(undefined);
          }}
        />
      </div>
      <div className="assign-window-message">
        <p>{error}</p>
      </div>
    </div>
  );
}

function FormContents({ setSubjectInput, setAddSubject }) {
  const [tempSubjectInput, setTempSubjectInput] = useState("");

  return (
    <div className="assign-window">
      <div className="assign-window-header">
        <p>Add a new subject</p>
        <img
          src={closeIcon}
          className="svg-white"
          onClick={() => setAddSubject(false)}
        />
      </div>

      <div className="assign-window-inputs">
        <input
          type="text"
          placeholder="Subject name"
          onChange={(e) => setTempSubjectInput(e.target.value)}
        />
      </div>

      <div className="assign-window-submit">
        <button
          className="green-button submit-btn"
          onClick={() => setSubjectInput(tempSubjectInput)}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default SubjectForm;
