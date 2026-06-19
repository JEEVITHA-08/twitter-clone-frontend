import { useState } from "react";
import API from "../services/api";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            await API.post(
                "/auth/register",
                {
                    email,
                    password
                }
            );

            alert("Registration Successful!");

            window.location.href = "/";

        } catch (error) {

            console.log(error);

            alert("Registration Failed!");
        }
    };

    return (
        <div>

            <h1>Register</h1>

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

            <button onClick={handleRegister}>
                Register
            </button>

            <br /><br />

            <button
                onClick={() =>
                    window.location.href = "/"
                }
            >
                Back To Login
            </button>

        </div>
    );
}

export default Register;