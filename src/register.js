import {Link } from "react-router-dom";

function Register() {

    return (
        <div className="register">
            <h1>Register page</h1>
            <div>
                <input placeholder="Username"></input>
            </div>
            <div>
                <input placeholder="Password"></input>
            </div>
            <div>
                <button>Register</button>
                <Link to="/">
                <button>Login</button>
                </Link>
            </div>

        </div>

    );

}


export default Register;