import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Passwordreset() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [correctResetToken, setCorrectResetToken] = useState(null);
  const dialogref = useRef(null);
  const newPasswordDialogRef = useRef(null);

  function toggledialog(dialog) {
    if (dialog.current) {
      dialog.current.hasAttribute("open")
        ? dialog.current.close()
        : dialog.current.showModal();
    }
  }

  const usernametest = async () => {
    if (!username.trim()) {
      alert("Please enter your username");
      return;
    }

    try {
      const response = await fetch(`/passwordreset/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (response.status === 404) {
        alert("Invalid username");
        return;
      }

      const data = await response.json();
      setCorrectResetToken(data.resetToken); // Store the received reset token

      toggledialog(dialogref); // Open OTP dialog
    } catch (error) {
      console.error("Error requesting reset token:", error);
      alert("Failed to request reset token");
    }
  };

  const verifyresetToken = () => {
    if (resetToken === correctResetToken) {
      toggledialog(dialogref);
      toggledialog(newPasswordDialogRef);
    } else {
      alert("Incorrect reset code, please try again");
    }
  };

  const submitNewPassword = async () => {
    if (!password.trim()) {
      alert("Please enter a new password");
      return;
    }
  
    try {
      const response = await fetch(`/updatepassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword: password }), // ✅ Ensure key is "newPassword"
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Password updated successfully!");
        toggledialog(newPasswordDialogRef);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    }
  };
  

  return (
    <div>
      <input
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={usernametest}>TEST</button>

      {/* OTP Input Dialog */}
      <dialog className="modal-content" ref={dialogref}>
        <p>Enter the reset code sent to your email:</p>
        <input
          placeholder="Enter the code here"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
        />
        <button onClick={verifyresetToken}>Submit Code</button>
      </dialog>

      {/* New Password Dialog */}
      <dialog className="modal-content" ref={newPasswordDialogRef}>
        <p>Enter your new password:</p>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={submitNewPassword}>Update Password</button>
      </dialog>
    </div>
  );
}

export default Passwordreset;
