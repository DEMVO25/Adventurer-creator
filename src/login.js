import { Link, useNavigate } from "react-router-dom";

function Login({ setUsername }) {
    const navigate = useNavigate();

    const loginhandle = (event) => {
        event.preventDefault();
        const usernamelogin = document.getElementById("usernamelogin").value;
        const passwordlogin = document.getElementById("passwordlogin").value;

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernamelogin, password: passwordlogin }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.authenticated) {
                    setUsername(usernamelogin);
                    navigate('/menu');
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch(error => console.error(error));
    };
    function passwordreset() {
        navigate("/passwordreset", {
          });
      }
    return (
        <div className="login">
            <h1>Login page</h1>
            <form onSubmit={loginhandle}>
                <div>
                    <input placeholder="Username" id="usernamelogin" />
                </div>
                <div>
                    <input placeholder="Password" id="passwordlogin" type="password" />
                </div>
                <div>
                    <button type="submit">Login</button>
                    <Link to="/register">
                        <button type="button">Register</button>
                    </Link>
                    <button onClick={passwordreset}>Forgot password</button>
                </div>
            </form>
        </div>
    );
}

export default Login;