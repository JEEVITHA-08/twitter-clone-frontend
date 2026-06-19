import { useState } from "react";
import API from "../services/api";

function SearchUsers() {

    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    const searchUsers = async () => {

        try {

            const response = await API.get(
                `/users/search?email=${email}`
            );

            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const followUser = async (userId) => {

        try {

            await API.post(
                `/users/${userId}/follow`
            );

            searchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    const unfollowUser = async (userId) => {

        try {

            await API.delete(
                `/users/${userId}/unfollow`
            );

            searchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div>

            <h1>Search Users</h1>

            <input
                type="text"
                placeholder="Search by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={searchUsers}>
                Search
            </button>

            <button
                onClick={() =>
                    window.location.href = "/profile"
                }
            >
                Back To Profile
            </button>

            <br /><br />

            {users.map((user) => (

                <div key={user.id}>

                    <h3>{user.email}</h3>

                    <button
                        onClick={() => followUser(user.id)}
                    >
                        Follow
                    </button>

                    <button
                        onClick={() => unfollowUser(user.id)}
                    >
                        Unfollow
                    </button>

                    <hr />

                </div>

            ))}

        </div>
    );
}

export default SearchUsers;