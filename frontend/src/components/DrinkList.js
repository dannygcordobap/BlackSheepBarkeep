import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DrinkDataService from "../services/drink.js";
import Select from "react-select";

function DrinkList() {
    const [drinks, setDrinks] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [searchExclusivity, setSearchExclusivity] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState(["All Categories"]);
    const [currentPage, setPage] = useState(0);
    const [searchType, setSearchType] = useState("");

    const onChangeSearchName= e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const onChangeSearchCategory= e => {
        const searchCategory = e.target.value;
        setSearchCategory(searchCategory);
    };

    const onChangeSearchIngredients = selectedOptions => {
        let options = []
        for (const option of selectedOptions) {
            options.push(option.value)
        }
        console.log(options)
        setSearchIngredients(options);
    };

    const onChangeSearchExclusivity = e => {
        const searchExclusivity = e.target.checked;
        setSearchExclusivity(searchExclusivity);
    };

    const retrieveDrinks = (page = 0) => {
        DrinkDataService.getAll(page).then(
            response => {
                console.log(response.data);
                setDrinks(response.data.recipes);
                setPage(response.data.page);
            }
        ).catch(e => {
            console.log(e);
        });
    };

    const retrieveIngredients = () => {
        DrinkDataService.getIngredients().then(
            response => {
                console.log(response.data);
                let options = []
                for (const ingredient of response.data) {
                    options.push({
                        "value": ingredient,
                        "label": ingredient
                    })
                }
                setIngredients(options);
            }
        ).catch(e => {
            console.log(e);
        });
    };

    const retrieveCategories = () => {
        DrinkDataService.getCategories().then(
            response => {
                console.log(response.data);
                setCategories(["All Categories"].concat(response.data));
            }
        ).catch(e => {
            console.log(e);
        });
    };

    const retrieveNextPage = () => {
        let nextPage = currentPage + 1;
        if (searchType) {
            let query;
            if (searchType == "name") {
                query = searchName;
            } else if (searchType == "category") {
                query = searchCategory;
            } else if (searchType == "ingredients") {
                query = searchIngredients;
            }
            find(query, searchType, searchExclusivity, nextPage);
        } else {
            retrieveDrinks(nextPage);
        }
    };

    const retrievePreviousPage = () => {
        let previousPage = currentPage - 1;
        if (searchType) {
            let query;
            if (searchType == "name") {
                query = searchName;
            } else if (searchType == "category") {
                query = searchCategory;
            } else if (searchType == "ingredients") {
                query = searchIngredients;
            }
            find(query, searchType, searchExclusivity, previousPage);
        } else {
            retrieveDrinks(previousPage);
        }
    }
    
    const refresh = () => {
        retrieveDrinks();
    };

    const find = (query, by, exclusive = false, page = 0) => {
        DrinkDataService.find(query, by, exclusive, page).then(
            response => {
                console.log(response.data);
                setDrinks(response.data.recipes);
                setPage(response.data.page);
            }
        );
    };

    const findByName = (e) => {
        find(searchName, "name");
        setSearchType("name");
    };

    const findByCategory = () => {
        if (searchCategory == "All Categories") {
            refresh()
        } else {
            find(searchCategory, "category");
            setSearchType("category");
        }
    };

    const findByIngredients = () => {
        find(searchIngredients.join(","), "ingredients", searchExclusivity)
        setSearchType("ingredients");
    };

    useEffect(() => {
        retrieveDrinks();
        retrieveIngredients();
        retrieveCategories();
    }, []);

    return (
        <div className="App">
            <div className="card">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="name-tab" data-bs-toggle="tab" data-bs-target="#name" type="button" role="tab" aria-controls="name" aria-selected="true">Search by Name</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link " id="category-tab" data-bs-toggle="tab" data-bs-target="#category" type="button" role="tab" aria-controls="category" aria-selected="false">Search by Category</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="ingredients-tab" data-bs-toggle="tab" data-bs-target="#ingredients" type="button" role="tab" aria-controls="ingredients" aria-selected="false">Search by Ingredients</button>
                    </li>
                </ul>
                <div class="tab-content card-body" id="myTabContent">
                    <div class="tab-pane fade show active" id="name" role="tabpanel" aria-labelledby="name-tab">
                        <div className="input-group col-lg-4">
                            <input type="text" className="form-control" placeholder="Search by name!" value={searchName} onChange={onChangeSearchName} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="category" role="tabpanel" aria-labelledby="category-tab">
                        <div className="input-group col-lg-4">
                            <select value={searchCategory} onChange={onChangeSearchCategory}>
                                {categories.map(category => {
                                    return (
                                        <option value={category}>{category}</option>
                                    )
                                })}
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={findByCategory}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
                        <div className="col">
                            <div className="row">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="exclusiveSearch" onChange={onChangeSearchExclusivity}/>
                                    <label class="form-check-label" for="exclusiveSearch">
                                        Exclusive Search
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Select isMulti className="basic-multi-select" classNamePrefix="select" options={ingredients} onChange={onChangeSearchIngredients}/>
                                    <button className="btn btn-outline-secondary" type="button" onClick={findByIngredients}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <hr />
            <br />
            <div className="row">
                {drinks.map(drink => {
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-title">{drink.Name}</h1>
                                    <p className="card-text">
                                        <strong>Category: </strong>{drink.Category}<br />
                                        <strong>Ingredients: </strong>{drink.Ingredients.map((ingredient) => {
                                            return ingredient.Name
                                        }).join(", ")}
                                    </p>
                                    <div className="row">
                                        <Link to={"/drinks/" + drink._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Recipe
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        {currentPage > 0 ? (
                            <li class="page-item">
                                <div class="page-link" onClick={retrievePreviousPage}>Previous</div>
                            </li>
                        ) : (
                            <li className="page-item disabled">
                                <div class="page-link">Previous</div>
                            </li>
                        )}
                    </li>
                    <li class="page-item">
                        <div class="page-link" onClick={retrieveNextPage}>Next</div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default DrinkList;