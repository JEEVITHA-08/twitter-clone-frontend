import { useState } from "react";
import API from "../services/api";

function SearchUsers() {

    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const searchUsers = async () => {
        try {
            const response = await API.get(`/users/search?email=${email}`);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const followUser = async (userId) => {
        try {
            const response = await API.post(`/users/${userId}/follow`);
            setMessage(response.data);
            setTimeout(() => setMessage(""), 3000);
            searchUsers();
        } catch (error) {
            setMessage("Follow failed!");
            console.log(error);
        }
    };

    const unfollowUser = async (userId) => {
        try {
            const response = await API.delete(`/users/${userId}/unfollow`);
            setMessage(response.data);
            setTimeout(() => setMessage(""), 3000);
            searchUsers();
        } catch (error) {
            setMessage("Unfollow failed!");
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Search Users</h1>

            {message && <p style={{color: "green"}}>{message}</p>}

            <input
                type="text"
                placeholder="Search by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={searchUsers}>Search</button>
            <button onClick={() => window.location.href = "/profile"}>
                Back To Profile
            </button>
            <button onClick={() => window.location.href = "/home"}>
                Back To Home
            </button>

            <br /><br />

            {users.map((user) => (
                <div key={user.id} style={{border: "1px solid #ccc", margin: "10px", padding: "10px"}}>
                    <h3>{user.username || user.email}</h3>
                    <p>{user.email}</p>
                    <button onClick={() => followUser(user.id)}>Follow</button>
                    <button onClick={() => unfollowUser(user.id)}>Unfollow</button>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default SearchUsers;