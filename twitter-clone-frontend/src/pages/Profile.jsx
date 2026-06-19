import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const response = await API.get(
                "/users/me"
            );

            setUser(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!user) {

        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>My Profile</h1>

            <h3>Email</h3>
            <p>{user.email}</p>

            <h3>User ID</h3>
            <p>{user.id}</p>

            <h3>Followers</h3>
            <p>{user.followers?.length || 0}</p>

            <h3>Following</h3>
            <p>{user.following?.length || 0}</p>

            <button
                onClick={() =>
                    window.location.href = "/home"
                }
            >
                Back To Home
            </button>
            <button
                onClick={() =>
                    window.location.href = "/search-users"
                }
            >
                Search Users
            </button>

        </div>
    );
}

export default Profile;