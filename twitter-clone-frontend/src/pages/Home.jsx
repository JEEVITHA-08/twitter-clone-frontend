import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {

    const [tweets, setTweets] = useState([]);
    const [feed, setFeed] = useState([]);
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        fetchTweets();
        fetchFeed();
    }, []);

    const fetchTweets = async () => {
        try {
            const response = await API.get("/tweets");
            setTweets(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFeed = async () => {
        try {
            const response = await API.get("/tweets/feed");
            setFeed(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createTweet = async () => {
        if (!content) {
            alert("Write something first!");
            return;
        }
        try {
            await API.post("/tweets", { content });
            setContent("");
            setMessage("Tweet posted!");
            setTimeout(() => setMessage(""), 3000);
            fetchTweets();
            fetchFeed();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTweet = async (tweetId) => {
        try {
            await API.delete(`/tweets/${tweetId}`);
            setMessage("Tweet deleted!");
            setTimeout(() => setMessage(""), 3000);
            fetchTweets();
            fetchFeed();
        } catch (error) {
            console.log(error);
        }
    };

    const likeTweet = async (tweetId) => {
        try {
            const response = await API.post(`/tweets/${tweetId}/like`);
            setMessage(response.data);
            setTimeout(() => setMessage(""), 3000);
            fetchTweets();
            fetchFeed();
        } catch (error) {
            console.log(error);
        }
    };

    const unlikeTweet = async (tweetId) => {
        try {
            const response = await API.delete(`/tweets/${tweetId}/like`);
            setMessage(response.data);
            setTimeout(() => setMessage(""), 3000);
            fetchTweets();
            fetchFeed();
        } catch (error) {
            console.log(error);
        }
    };

    const retweet = async (tweetId) => {
        try {
            await API.post(`/tweets/${tweetId}/retweet`);
            setMessage("Retweeted!");
            setTimeout(() => setMessage(""), 3000);
            fetchTweets();
        } catch (error) {
            console.log(error);
        }
    };

    const TweetCard = ({ tweet }) => (
        <div style={{border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "8px"}}>
            <p><strong>@{tweet.user?.username || tweet.user?.email}</strong></p>
            {tweet.originalTweet && (
                <p style={{color: "gray"}}>🔁 Retweeted from @{tweet.originalTweet.user?.username}</p>
            )}
            <p>{tweet.content}</p>
            <p>❤️ {tweet.likesCount} likes</p>
            <button onClick={() => likeTweet(tweet.id)}>👍 Like</button>
            <button onClick={() => unlikeTweet(tweet.id)}>👎 Unlike</button>
            <button onClick={() => retweet(tweet.id)}>🔁 Retweet</button>
            <button onClick={() => deleteTweet(tweet.id)} style={{color: "red"}}>🗑️ Delete</button>
        </div>
    );

    return (
        <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px"}}>
            <h1>🐦 Twitter Clone</h1>

            <div>
                <button onClick={() => window.location.href = "/profile"}>👤 Profile</button>
                <button onClick={() => window.location.href = "/search-users"}>🔍 Search Users</button>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}>🚪 Logout</button>
            </div>

            <hr />

            {message && <p style={{color: "green", fontWeight: "bold"}}>{message}</p>}

            <div>
                <textarea
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="3"
                    cols="50"
                />
                <br />
                <button onClick={createTweet}>🐦 Tweet</button>
            </div>

            <hr />

            <div>
                <button
                    onClick={() => setActiveTab("all")}
                    style={{fontWeight: activeTab === "all" ? "bold" : "normal"}}
                >
                    All Tweets
                </button>
                <button
                    onClick={() => setActiveTab("feed")}
                    style={{fontWeight: activeTab === "feed" ? "bold" : "normal"}}
                >
                    My Feed
                </button>
            </div>

            <br />

            {activeTab === "all" && (
                <div>
                    <h2>All Tweets ({tweets.length})</h2>
                    {tweets.length === 0 && <p>No tweets yet!</p>}
                    {tweets.map((tweet) => (
                        <TweetCard key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            )}

            {activeTab === "feed" && (
                <div>
                    <h2>My Feed ({feed.length})</h2>
                    {feed.length === 0 && <p>Follow users to see their tweets here!</p>}
                    {feed.map((tweet) => (
                        <TweetCard key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;