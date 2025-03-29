import { useState } from "react";
import Dialog from "./components/dialog";

function Register({ open, closeForm }) {
  const [emailForm, setEmailForm] = useState("");
  const [usernameForm, setUsernameForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailForm || !usernameForm || !passwordForm) {
      alert("Please enter both username and password.");
      return;
    }

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailForm,
        username: usernameForm,
        password: passwordForm,
      }),
    });

    const data = await res.json();
    if (data.message === "Username already exists") {
      alert("Username already exists. Please choose a different username.");
    } else if (data.message === "User created successfully") {
      alert("User  created successfully!");
      closeForm();
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Dialog open={open} closeForm={closeForm} title="Register">
      <div className="register">
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="email"
              value={emailForm}
              onChange={(e) => setEmailForm(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder="Username"
              value={usernameForm}
              onChange={(e) => setUsernameForm(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              value={passwordForm}
              onChange={(e) => setPasswordForm(e.target.value)}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default Register;
