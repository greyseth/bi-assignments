import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../../api/API";
import closeBtn from "../../../assets/img/close.svg";

import "../dashboard.css";

function ClassMenu({ account, setOpenMenu }) {
  const [loading, setLoading] = useState(false);
  const [newType, setNewType] = useState("add");
  const [newInput, setNewInput] = useState(undefined);

  return (
    <div className="class-menu-container">
      {loading ? (
        <Processing
          account={account}
          newType={newType}
          newInput={newInput}
          setLoading={setLoading}
        />
      ) : (
        <AddMenu
          newType={newType}
          setNewType={setNewType}
          setNewInput={setNewInput}
          setLoading={setLoading}
          setOpenMenu={setOpenMenu}
        />
      )}
    </div>
  );
}

function Processing({ account, newType, newInput, setLoading }) {
  const [error, setError] = useState(undefined);

  let processing = false;
  let nav = useNavigate();

  useEffect(() => {
    if (!newInput)
      setError(`You must enter a ${newType === "add" ? "code" : "name"}!`);

    async function handleJoining() {
      if (processing) return;
      processing = true;
      console.log("joining");

      const req = await postRequest("classes/join", {
        user_id: account.data.user_id,
        class_id: newInput,
      });

      if (req.error) setError("Class id not found");
      else nav("/class/" + newInput);

      processing = false;
    }

    async function handleCreating() {
      if (processing) return;
      processing = true;

      const req = await postRequest("classes/new", {
        owner_id: account.data.user_id,
        name: newInput,
      });

      if (req.error) setError("An error has occurred");
      else nav("/class/" + req.data);

      processing = false;
    }

    if (newType === "add") handleJoining();
    else if (newType === "create") handleCreating();
  }, []);

  return (
    <div className="class-menu">
      <div className="class-menu-header">
        <h3>{error ? "An error has occurred" : "Processing new class..."}</h3>
      </div>
      {error ? (
        <div className="class-menu-error">
          <p>{error}</p>
          <button onClick={() => setLoading(false)}>Return</button>
        </div>
      ) : (
        <div className="class-menu-loading">
          <p className="class-menu-message">
            {newType === "add"
              ? `Joining class with id ${newInput}`
              : `Creating new class '${newInput}'`}
          </p>
        </div>
      )}
    </div>
  );
}

function AddMenu({
  newType,
  setNewType,
  setNewInput,
  setLoading,
  setOpenMenu,
}) {
  return (
    <div className="class-menu">
      <div className="class-menu-header">
        <h3>Add a class</h3>
        <button onClick={() => setOpenMenu(false)}>
          <img src={closeBtn} className="svg-white" />
        </button>
      </div>
      <div className="class-menu-buttons">
        <button
          className={newType === "add" ? "selected" : null}
          onClick={() => setNewType("add")}
        >
          <p>Join a class</p>
          <p>Join an existing class by entering it's id</p>
        </button>
        <div className="class-menu-separator"></div>
        <button
          className={newType === "create" ? "selected" : null}
          onClick={() => setNewType("create")}
        >
          <p>Create a class</p>
          <p>Create a completely new class</p>
        </button>
      </div>
      <div className="class-menu-input">
        <input
          type="text"
          placeholder={newType === "add" ? "Class id" : "New class name"}
          onChange={(e) => setNewInput(e.target.value)}
        />
        <button onClick={() => setLoading(true)}>
          {newType === "add" ? "Join" : "Create"}
        </button>
      </div>
    </div>
  );
}

export default ClassMenu;
