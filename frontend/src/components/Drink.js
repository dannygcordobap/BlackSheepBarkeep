import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DrinkDataService from "../services/drink.js";

const Drink = () => {

    const initialDrinkState = {
        id: null,
        ImageLink: "",
        Name: "",
        Category: "",
        Glass: "",
        Alcoholic: null,
        Ingredients: [],
        Steps: [],
        Comment: []
    }
    
    const { id } = useParams()

    const [drink, setDrink] = useState(initialDrinkState);
    const getDrink = id => {
        DrinkDataService.get(id).then(response =>{
            setDrink(response.data);
            console.log(response.data)
        }).catch(e => {
            console.log(e)
        });
    };

    useEffect(() => {
        getDrink(id);
    }, [id]);
    
    return (
        <div className="App">
            <div className="card shadow">
                <div className="display-4 card-header bg-dark text-light text-center">
                    <strong>{drink.Name}</strong>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <strong>Category: </strong>{drink.Category}<br />    
                    </li>
                    <li class="list-group-item">
                        <strong>Drinkware: </strong>{drink.Glass}    
                    </li>
                </ul>
                <div className="row card-body">
                    <div className="col">
                        <img className="card-img-top rounded" src={drink.ImageLink}></img>
                    </div>
                    <div className="col ">
                        <div className="container">
                            <div className="row">
                                <h4><strong>Ingredients:</strong></h4>
                                <hr />
                            </div>
                            {
                                drink.Ingredients.length > 0 ? (
                                    drink.Ingredients.map((ingredient) => {
                                        return (
                                            <div className="row ">
                                                <blockquote>
                                                    {ingredient.Measurement} - {ingredient.Name}
                                                    {ingredient.Note ? (
                                                        <div className="text-muted"><em>Note:</em> {ingredient.Note}</div>
                                                    ) : (null)}
                                                </blockquote>
                                            </div>
                                        )
                                    }
                                )) : (
                                    <div>
                                        It looks like this recipe is missing the ingredients!
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <h4><strong>Recipe Directions:</strong></h4>
                        <hr />
                    </div>
                    {
                        drink.Steps.length > 0 ? (
                            drink.Steps.map((step, index) => {
                                return (
                                    <div className="row">
                                        <h5>Step {index + 1}: </h5>
                                        <blockquote>
                                            {step.Step}
                                            {step.Note ? (
                                                <div className="text-muted"><em>Note:</em> {step.Note}</div>
                                            ) : (null)}
                                        </blockquote>
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                It looks like this recipe is missing the directions!
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Drink;