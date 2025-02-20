import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Passwordreset() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const dialogref = useRef(null);
  function toggledialog() {
    dialogref.current.hasAttribute("open")
      ? dialogref.current.close()
      : dialogref.current.showModal();
  }
  const usernametest = async (username) => {
    if (!username.trim()) {
      alert("Please enter your username");
    } else
      fetch(`/passwordreset/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      }).then((response) => {
        if (response.status === 404) {
          alert("Invalid username");
        }else{
          toggledialog()
        }
      });
  };

  return (
    <div>
      <input
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <dialog className="modal-content" ref={dialogref}>
          COntent
        </dialog>
      <button onClick={() =>{ usernametest(username)}}>TEST</button>
    </div>
  );
}
export default Passwordreset;
