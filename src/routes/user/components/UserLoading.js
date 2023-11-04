import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UserLoading({ setLoading, setAccount, setViewAccount, setError }) {
  useEffect(() => {
    //Loads data
  }, []);

  return (
    <div className="user-content">
      <h1>Loading account info...</h1>
    </div>
  );
}

export default UserLoading;
