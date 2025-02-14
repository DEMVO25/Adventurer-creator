import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Passwordreset() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const usernametest = async (username) => {
    if (!username) {
      alert("Please enter your username");
    } else
      fetch("/passwordreset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.authenticated) {
            setUsername(username);
            navigate("/register");
          } else {
            alert("Invalid username");
          }
        })
        .catch((error) => console.error(error));
  };

  return (
    <div>
      <input
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <button onClick={() => usernametest(username)}>TEST</button>
    </div>
  );
}
export default Passwordreset;
