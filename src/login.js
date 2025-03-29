import { useState, useEffect } from "react";
import Register from "./register";
import Passwordreset from "./passwordreset";

const DialogType = {
  register: "Register",
  passwordreset: "Password Reset",
};

function Login({ username, setUsername, children }) {
  const [currDialogType, setCurrDialogType] = useState(null);

  const [usernameForm, setUsernameForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");

  useEffect(() => {
    const validateJWT = async () => {
      const res = await fetch("/verifyjwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.authenticated) {
        console.log(data);
        setUsername(data.username);
      } else {
        alert(data.message);
      }
    };

    const token = localStorage.getItem("jwt-token");
    if (token) {
      validateJWT();
    }
  }, []);

  const loginhandle = async (event) => {
    event.preventDefault();
    const jwt = async () => {
      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameForm,
            password: passwordForm,
          }),
        });
        const data = await res.json();
        if (data.message === "success") {
          localStorage.setItem("jwt-token", data.token);
          setUsername(data.username);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    await jwt();
  };

  const handleCurrDialogType = (e) => {
    setCurrDialogType(e.target.name);
  };

  const closeDialog = () => {
    setCurrDialogType(null);
  };

  if (username) {
    return children;
  }

  return (
    <>
      <div className="login">
        <h1>Login page</h1>
        <form onSubmit={loginhandle}>
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
            <button type="submit">Login</button>
            <button
              type="button"
              name={DialogType.register}
              onClick={handleCurrDialogType}
            >
              Register
            </button>
            <button
              type="button"
              name={DialogType.passwordreset}
              onClick={handleCurrDialogType}
            >
              Forgot password
            </button>
          </div>
        </form>
      </div>
      <Passwordreset
        open={currDialogType == DialogType.passwordreset}
        closeForm={closeDialog}
      />
      <Register
        open={currDialogType == DialogType.register}
        closeForm={closeDialog}
      />
    </>
  );
}

export default Login;
