import { useState } from "react";

import addIcon from "../../../assets/img/add.svg";

function ClassControls({
  classData,
  setSubjectFilter,
  ownerFilter,
  setOwnerFilter,
  setAddAssignment,
  setAddSubject,
}) {
  return (
    <div className="class-controls">
      <div>
        <select
          className="subject-dropdown"
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value={"all"}>All subjects</option>
          {classData.subjects.map((subject) => {
            return (
              <option key={subject} value={subject}>
                {subject}
              </option>
            );
          })}
        </select>

        <div className="owner-toggle">
          <button
            disabled={ownerFilter === "public"}
            onClick={() => setOwnerFilter("public")}
          >
            Public
          </button>
          <div className="toggle-separator"></div>
          <button
            disabled={ownerFilter === "yours"}
            onClick={() => setOwnerFilter("yours")}
          >
            Yours
          </button>
        </div>
      </div>

      <div className="add-buttons">
        <button onClick={() => setAddAssignment(true)}>
          <p>Add assignment</p>
          <img src={addIcon} className="svg-white" />
        </button>
        <button onClick={() => setAddSubject(true)}>
          <p>New subject</p>
          <img src={addIcon} className="svg-white" />
        </button>
      </div>
    </div>
  );
}

export default ClassControls;
