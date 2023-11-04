import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../class_page.css";

function AssignmentList({ subjectFilter, assignments, setAssignments }) {
  const [filtered, setFiltered] = useState(assignments);

  useEffect(() => {
    if (subjectFilter !== "all")
      setFiltered(assignments.filter((f) => f.subject === subjectFilter));
    else setFiltered(assignments);
  }, [subjectFilter]);

  return (
    <ul className="assignment-list">
      {filtered.length > 0 ? (
        filtered.map((a) => {
          return <AssignmentCard key={a.assign_id} data={a} />;
        })
      ) : (
        <EmptyCard />
      )}
    </ul>
  );
}

function AssignmentCard({ data }) {
  let nav = useNavigate();

  return (
    <li className="card" key={data.assign_id}>
      <div className="card-info">
        <p
          className="card-click"
          onClick={() => {
            nav("user/" + data.owner_id);
          }}
        >
          Posted by {data.owner_name}
        </p>
        <p>{data.public ? "Public" : "Private"}</p>
      </div>
      <div
        onClick={() => {
          nav("/assignment/" + data.assign_id);
        }}
        className="card-click"
      >
        <p className="card-title">{data.title}</p>
        <p className="card-desc">{data.description}</p>
      </div>
    </li>
  );
}

function EmptyCard() {
  <li className="card" key={"empty"}>
    <div className="card-info">
      <p>Empty</p>
    </div>
    <div>
      <p>Seems like this subject is empty</p>
    </div>
  </li>;
}

export default AssignmentList;
