import { Link } from "react-router-dom";

function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
      
        fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        })
          .then(response => response.json())
          .then(data => {
            if (data.message === "Username already exists") {
              alert("Username already exists. Please choose a different username.");
            } else if (data.message === "User created successfully") {
              alert("User created successfully!");
            } else {
              alert("An error occurred. Please try again.");
            }
          })
          .catch(error => console.error(error));
      };

  return (
    <div className="register">
      <h1>Register page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input id="username" placeholder="Username" name="username" />
        </div>
        <div>
          <input id="password" placeholder="Password" name="password" type="password" />
        </div>
        <div>
          <button type="submit">Register</button>
          <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;