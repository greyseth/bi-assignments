import { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "./class_page.css";

import ClassHeader from "./components/ClassHeader";
import ClassControls from "./components/ClassControls";
import AssignmentList from "./components/AssignmentList";
import AssignmentForm from "./components/AssignmentForm";
import SubjectForm from "./components/SubjectForm";

import { dummyAssignmentData, dummyClassData } from "./dummydata";
import { getRequest, postRequest } from "../../api/API";
import { getCookie, setCookie } from "../../cookies/Cookie";

function ClassPage() {
  const [loadingClass, setLoadingClass] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(true);

  const [account, setAccount] = useState(undefined);
  const [classData, setClassData] = useState(undefined);
  const [assignments, setAssignments] = useState(undefined);

  const [subjectFilter, setSubjectFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("public");

  const [addAssignment, setAddAssignment] = useState(false);
  const [addSubject, setAddSubject] = useState(false);

  let { class_id } = useParams();

  useEffect(() => {
    async function loadAssignment() {
      // if (!assignments) return;
      // console.log("changed owner filter");

      setLoadingAssignments(true);
      if (ownerFilter === "public") {
        const req = await getRequest("assignments/inclass/" + class_id);
        if (!req.error) {
          setAssignments(req.data);
          setLoadingAssignments(false);
        } else console.log(req.error);
      } else if (ownerFilter === "yours") {
        const req = await postRequest("assignments/postedby", {
          class_id: class_id,
          user_id: account.user_id,
        });

        if (!req.error) {
          setAssignments(req.data);
          setLoadingAssignments(false);
        } else console.log(req.error);
      }
    }

    loadAssignment();
  }, [ownerFilter]);

  return (
    <section className="class-body">
      <ClassHeader
        className={classData ? classData.name : "Loading..."}
        account={account}
      />

      {/* #region Overlays */}

      {addAssignment ? (
        <AssignmentForm
          setAddAssignment={setAddAssignment}
          classData={classData}
          account={account}
        />
      ) : null}
      {addSubject ? (
        <SubjectForm
          setAddSubject={setAddSubject}
          classData={classData}
          setClassData={setClassData}
        />
      ) : null}
      {/* #endregion */}

      {classData ? (
        <ClassControls
          classData={classData}
          setSubjectFilter={setSubjectFilter}
          ownerFilter={ownerFilter}
          setOwnerFilter={setOwnerFilter}
          setAddAssignment={setAddAssignment}
          setAddSubject={setAddSubject}
        />
      ) : null}

      {loadingClass ? (
        <LoadingClass
          account={account}
          setAccount={setAccount}
          setLoadingClass={setLoadingClass}
          classData={classData}
          setClassData={setClassData}
        />
      ) : !classData ? (
        <NotFound />
      ) : loadingAssignments ? (
        <LoadingAssignments
          account={account}
          setLoadingAssignments={setLoadingAssignments}
          ownerFilter={ownerFilter}
          setAssignments={setAssignments}
        />
      ) : !assignments ? (
        <Empty />
      ) : (
        <AssignmentList
          subjectFilter={subjectFilter}
          assignments={assignments}
          setAssignments={setAssignments}
        />
      )}
    </section>
  );
}

function LoadingClass({
  account,
  setAccount,
  setLoadingClass,
  classData,
  setClassData,
}) {
  let { class_id } = useParams();
  let nav = useNavigate();
  let loadingClass = false;

  useEffect(() => {
    async function loadClass() {
      if (loadingClass) return;
      if (!account) {
        loadingClass = true;

        if (getCookie("login_id") && getCookie("login_token")) {
          const req = await postRequest("users/cookielogin", {
            user_id: getCookie("login_id"),
            login_token: getCookie("login_token"),
          });

          if (req.success) {
            setAccount(req.data);

            const req2 = await getRequest("classes/id/" + class_id);
            console.log(req2);
            if (req2.error) {
              console.log(req2.error);
              setClassData(undefined);
            } else {
              setClassData(req2.data);
            }

            setCookie("last_class", class_id);
            setLoadingClass(false);
          } else {
            console.log(req.failMsg);
            nav("/login");
          }
        } else nav("/login");

        loadingClass = false;
      }
    }

    loadClass();
  }, [account]);

  return (
    <div className="class-text-container">
      <h2>Loading class data...</h2>
    </div>
  );
}

function LoadingAssignments({
  account,
  setLoadingAssignments,
  ownerFilter,
  setAssignments,
}) {
  let { class_id } = useParams();

  //I cant figure out a way to call this function during first render and every time
  //ownerFilter is changed due to some React bullshittery
  useEffect(() => {
    async function loadAssignment() {
      if (ownerFilter === "public") {
        const req = await getRequest("assignments/inclass/" + class_id);
        if (!req.error) {
          setAssignments(req.data);
          setLoadingAssignments(false);
        } else console.log(req.error);
      } else if (ownerFilter === "yours") {
        const req = await postRequest("assignments/postedby", {
          class_id: class_id,
          user_id: account.user_id,
        });

        if (!req.error) {
          setAssignments(req.data);
          setLoadingAssignments(false);
        } else console.log(req.error);
      }
    }

    loadAssignment();
  }, []);

  return (
    <div className="class-text-container">
      <h2>Loading assignments...</h2>
    </div>
  );
}

function NotFound() {
  let nav = useNavigate();

  return (
    <div className="class-text-container">
      <h2>Class not found</h2>
      <p>Are you sure you got the Id correct?</p>
      <button className="green-button" onClick={() => nav("/")}>
        Return
      </button>
    </div>
  );
}

function Empty() {
  return (
    <div className="class-text-container">
      <h2>It's quite empty here</h2>
      <p>Seems like no one has uploaded an assignment yet. Be the first!</p>
    </div>
  );
}

export default ClassPage;
