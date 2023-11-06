import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../../cookies/Cookie";
import { getRequest, postRequest } from "../../../api/API";

function AssignLoading({ setAccount, setLoading, setAssignData, setError }) {
  let { assign_id } = useParams();
  let nav = useNavigate();

  useEffect(() => {
    async function initData() {
      //Loads account data
      if (getCookie("login_id") && getCookie("login_token")) {
        const accReq = await postRequest("users/cookielogin", {
          user_id: getCookie("login_id"),
          login_token: getCookie("login_token"),
        });

        if (accReq.error) setError(accReq.error);
        else {
          if (!accReq.success) {
            console.log(accReq.failMsg);
            nav("/login");
          } else {
            setAccount(accReq.data);

            //Loads assignment data
            const assReq = await getRequest("assignments/" + assign_id);
            if (assReq.error) setError(assReq.error);
            else {
              if (!assReq) setError("Assignment not found");
              else {
                if (!assReq.data.attachments) assReq.attachments = [];

                setAssignData(assReq.data);
              }
            }
          }
        }
      } else {
        console.log("no cookies");
        nav("/login");
      }

      setLoading(false);
    }

    initData();
  }, []);

  return (
    <div className="assign-content">
      <h1>Fetching assignment data...</h1>
    </div>
  );
}

export default AssignLoading;
