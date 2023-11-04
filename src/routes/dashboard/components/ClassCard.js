import { useNavigate } from "react-router-dom";
import "../dashboard.css";

function ClassCard({ classData }) {
  let nav = useNavigate();

  return (
    <li key={classData.class_id}>
      <h3
        onClick={() => {
          nav("/class/" + classData.class_id);
        }}
      >
        {classData.name}
      </h3>
      <div>
        <p
          onClick={() => {
            navigator.clipboard.writeText(classData.class_id);
          }}
        >
          Class id: <span>{classData.class_id}</span>
        </p>
        <p
          onClick={() => {
            nav("/user/" + classData.owner_id);
          }}
        >
          Owned by: <span>{classData.owner_name}</span>
        </p>
      </div>
    </li>
  );
}

export default ClassCard;
