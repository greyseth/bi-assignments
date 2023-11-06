import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../../cookies/Cookie";
import { getRequest, postRequest } from "../../../api/API";

function UserLoading({ setLoading, setAccount, setViewAccount, setError }) {
  let nav = useNavigate();
  let { user_id } = useParams();
  let isLogging = false;

  useEffect(() => {
    async function loadUserData() {
      if (isLogging) return;
      isLogging = true;

      //Logs self account in
      if (getCookie("login_id") && getCookie("login_token")) {
        const req = await postRequest("users/cookielogin", {
          user_id: getCookie("login_id"),
          login_token: getCookie("login_token"),
        });

        if (req.error) setError("There was a problem during authentication");
        else {
          if (req.success) {
            setAccount(req.data);

            //Loads viewing user data
            const req2 = await getRequest("users/" + user_id);
            if (req2.error) setError(req2.error);
            else setViewAccount(req2.data);
          } else nav("/login");
        }
      } else nav("/login");

      setLoading(false);
    }

    loadUserData();
  }, []);

  return (
    <div className="user-content">
      <h1>Loading account info...</h1>
    </div>
  );
}

export default UserLoading;
