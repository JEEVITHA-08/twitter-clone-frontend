import { useState } from "react";
import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data
            );

            window.location.href = "/home";
        } catch (error) {

            alert("Login Failed!");

            console.log(error);
        }
    };

    return (
        <div>
            <h1>Twitter Clone Login</h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>
            <button
                onClick={() =>
                    window.location.href = "/register"
                }
            >
                Register
            </button>

        </div>
    );
}

export default Login;