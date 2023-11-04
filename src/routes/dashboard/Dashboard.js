import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie, { getCookie } from "../../cookies/Cookie";
import "./dashboard.css";

import addIcon from "../../assets/img/add.svg";

import DashHeader from "./components/DashHeader";
import ClassCard from "./components/ClassCard";
import ClassMenu from "./components/ClassMenu";
import DashControls from "./components/DashControls";
import { getRequest, postRequest } from "../../api/API";

//TODO: Add error message
function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [openMenu, setOpenMenu] = useState(false);
  const [userClasses, setUserClasses] = useState([]);

  let nav = useNavigate();

  useEffect(() => {
    //User login function
    async function cookieLogin() {
      console.log("function is called");
      const req = await postRequest("users/cookielogin", {
        user_id: getCookie("login_id"),
        login_token: getCookie("login_token"),
      });

      console.log(req.data);

      if (!req.success) setError(req.failMsg);
      else {
        setAccount(req);

        console.log("classes/" + req.data.user_id);
        const req2 = await getRequest("classes/" + req.data.user_id);
        console.log(req2);
        if (!req2.error) {
          if (req2.data) setUserClasses(req2.data);
          setLoading(false);
        } else setError(req2.error);
      }

      // if (!account && userClasses) nav("/login");
    }

    if (!account) {
      //Cookie checking
      if (getCookie("login_id") && getCookie("login_token")) {
        //Logs user in
        cookieLogin();
      } else nav("/login");
    }
  }, []);

  return (
    <section className="dashboard-body">
      <DashHeader account={account} />

      <DashControls setOpenMenu={setOpenMenu} />

      {loading ? (
        <div className="dashboard-loading">
          <h2>Loading dashboard...</h2>
        </div>
      ) : error ? (
        <div className="dashboard-loading">
          <h2>An error has occurred</h2>
          <p>{error}</p>
        </div>
      ) : userClasses.length > 0 ? (
        <ul className="class-list">
          {userClasses.map((c) => (
            <ClassCard classData={c} key={c.class_id} />
          ))}
        </ul>
      ) : (
        <div className="no-class">
          <h2>You're not in a class yet.</h2>
          <button className="green-button" onClick={() => setOpenMenu(true)}>
            Join one
          </button>
        </div>
      )}

      {openMenu ? (
        <ClassMenu account={account} setOpenMenu={setOpenMenu} />
      ) : null}
    </section>
  );
}

export default Dashboard;
