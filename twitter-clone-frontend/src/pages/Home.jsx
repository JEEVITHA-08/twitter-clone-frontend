import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);

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

    const uploadProfileImage = async () => {

        if (!file) {

            alert("Select an image first");

            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            await API.post(
                "/users/upload-profile-image",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            alert(
                "Profile image uploaded successfully"
            );

            fetchProfile();

        } catch (error) {

            console.log(error);

            alert(
                "Failed to upload profile image"
            );
        }
    };

    if (!user) {

        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>My Profile</h1>

            {user.profileImage && (

                <img
                    src={
                        `http://localhost:8080${user.profileImage}`
                    }
                    alt="Profile"
                    width="150"
                    height="150"
                    style={{
                        borderRadius: "50%"
                    }}
                />

            )}

            <br />
            <br />

            <input
                type="file"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <button
                onClick={
                    uploadProfileImage
                }
            >
                Upload Image
            </button>

            <h3>Email</h3>
            <p>{user.email}</p>

            <h3>User ID</h3>
            <p>{user.id}</p>

            <h3>Followers</h3>
            <p>
                {user.followers?.length || 0}
            </p>

            <h3>Following</h3>
            <p>
                {user.following?.length || 0}
            </p>

            <button
                onClick={() =>
                    window.location.href = "/home"
                }
            >
                Back To Home
            </button>

            <button
                onClick={() =>
                    window.location.href =
                        "/search-users"
                }
            >
                Search Users
            </button>

        </div>
    );
}

export default Profile;