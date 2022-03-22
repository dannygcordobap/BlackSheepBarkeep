import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Welcome!</h5>
                            <p className="card-text">
                                Feel free to browse recipes to find something you like! You can search by name, category, or ingredients.
                                When searching by ingredients, tick the exclusive search box to find recipes that only use the ingredients you selected.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <div className="card shadow">
                        <div className="card-header">
                            Create an Account
                        </div>
                        <div className="card-body">
                            <p className="card-text">This feature is currently under development, check back soon!</p>
                            <Link to={"/"} className="btn btn-secondary disabled">Coming Soon!</Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow">
                        <div className="card-header">
                            Browse recipes
                        </div>
                        <div className="card-body">
                            <p className="card-text">Browse recipes with the ability to search by name, category, or ingredients.</p>
                            <Link to={"/drinks"} className="btn btn-secondary">Search Recipes</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;