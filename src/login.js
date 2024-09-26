import {Link } from "react-router-dom";

function Login() {

    return (
        <div className="login">
            <h1>Login page</h1>
            <div>
                <input placeholder="Username"></input>
            </div>
            <div>
                <input placeholder="Password"></input>
            </div>
            <div>
                <button>Login</button>
                <Link to="/register">
                <button>Register</button>
                </Link>
                
            </div>

        </div>

    );

}


export default Login;