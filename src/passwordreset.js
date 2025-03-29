import React, { useState, useRef } from "react";
import Dialog from "./components/dialog";

function Passwordreset({open, closeForm}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    toggledialog(dialogref);
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
      setCorrectResetToken(data.resetToken);
    } catch (error) {
      console.error("Error requesting reset token:", error);
      alert("Failed to request reset token");
    }
  };

  const verifyresetToken = async () => {
    try {
      const response = await fetch(`/verifyotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp: correctResetToken }),
      });

      if (response.status === 200) {
        toggledialog(dialogref);
        toggledialog(newPasswordDialogRef);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error verifying reset token:", error);
      alert("Failed to verify reset token");
    }
  };

  const submitNewPassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      alert("Please enter a new password and confirm it");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
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
        closeForm();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    }
  };

  return (
    <Dialog open={open} closeForm={closeForm} title="Password Change">
      <div>
        <input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={usernametest}>TEST</button>

        <dialog className="modal-content" ref={dialogref}>
          <p>Enter the reset code sent to your email:</p>
          <input
            placeholder="Enter the code here"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value.trim())}
          />
          <button onClick={verifyresetToken}>Submit Code</button>
        </dialog>

        <dialog className="modal-content" ref={newPasswordDialogRef}>
          <p>Enter your new password:</p>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <button onClick={submitNewPassword}>Update Password</button>
        </dialog>
      </div>
    </Dialog>
  );
}

export default Passwordreset;
