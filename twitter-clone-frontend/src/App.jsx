import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchUsers from "./pages/SearchUsers";
import Register from "./pages/Register";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
                    path="/search-users"
                    element={<SearchUsers />}
                />


            </Routes>

        </BrowserRouter>
    );
}

export default App;
