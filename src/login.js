import { Link } from "react-router-dom";

function Login() {
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
                    window.location.href = '/menu';
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="login">
            <h1>Login page</h1>
            <form onSubmit={loginhandle}>
                <div>
                    <input placeholder="Username" id="usernamelogin"></input>
                </div>
                <div>
                    <input placeholder="Password" id="passwordlogin"></input>
                </div>
                <div>
                    <button type="submit">Login</button>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;