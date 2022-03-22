import React from "react";
import { Routes, Route, Link ,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Drink from "./components/Drink.js";
import DrinkList from "./components/DrinkList.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import ReactGA from "react-ga";

function App() {

    ReactGA.initialize("G-BNG78G5GB6");

    const [user, setUser] = React.useState(null);

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null)
    }

    return (
        <div>
            <nav className="navbar shadow navbar-expand-lg navbar-dark bg-dark text-light">
                <div className="container-fluid">
                    <Link to={"/"} className="display-4 text-light">Black Sheep Barkeep</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/drinks"} className="nav-link">Recipes</Link>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link disabled">Sign up</div>
                            </li>
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link disabled">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br /> 
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/drinks" element={<DrinkList />} />
                    <Route path="/drinks/:id" element={<Drink />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            <br />
            <br />
        </div>
    );
}

export default App;
