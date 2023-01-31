import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";
import "./drinks_details.css";

const DrinksDetails = () => {
  const { categories, loading, fulfilled } = useSelector(
    (state) => state.drinksCategories
  );
  const navigate = useNavigate();

  const [fetchedDrinks, setFetchedDrinks] = useState([]);
  const { id } = useParams();

  const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  // fetch drinks details
  let drinksContainer;

  const fetchDrinksDetails = async () => {
    await axios
      .get(BASE_URL)
      .then((response) => {
        drinksContainer = response.data.drinks;
        setFetchedDrinks(drinksContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetch ingredients and measures from API

  const ingredients = [];

  const handleIngredients = () => {
    if (fetchedDrinks) {
      for (let i = 1; i <= 20; i++) {
        if (fetchedDrinks[0][`strIngredient${i}`]) {
          ingredients.push(
            `${fetchedDrinks[0][`strIngredient${i}`]} - ${
              fetchedDrinks[0][`strMeasure${i}`]
            }`
          );
        }
      }
      return ingredients;
    }
  };

  // fetch drinks details on page load
  useEffect(() => {
    fetchDrinksDetails();
  }, []);

  return (
    <div className="individual_meal">
      <DrinksNavigation type="category" />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {fulfilled ? (
            fetchedDrinks.map((drink) => {
              return (
                <div key={drink.idDrink} className="individual_meal_details">
                  <h1 className="meal_name">{drink.strDrink}</h1>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="drinks_details_img"
                  />
                  {/* fun facts */}
                  <div className="fun_facts">
                    <p className="facts">Fun Facts</p>
                    <p>
                      <span className="basics">Category:</span>{" "}
                      {drink.strCategory}
                    </p>
                    <p>
                      <span className="basics">Glass:</span> {drink.strGlass}
                    </p>
                    <p>
                      <span className="basics">Type:</span> {drink.strAlcoholic}
                    </p>
                    <p>
                      <span className="basics">Tags:</span>{" "}
                      {drink.strTags
                        ? drink.strTags.split(",").join(", ")
                        : "No tags available"}
                    </p>
                  </div>
                  {/* back button */}
                  <button
                    className="back_btn"
                    onClick={() => {
                      navigate(`/drinks_categories/${drink.strCategory}`);
                    }}
                  >
                    Back to {drink.strCategory}
                  </button>

                  <p className="prep">PREPARATION</p>
                  <span className="lang">English</span>
                  <p className="instructions">
                    {drink.strInstructions ? (
                      drink.strInstructions
                    ) : (
                      <span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                        Not available...
                      </span>
                    )}
                  </p>
                  <span className="lang">German</span>
                  <p className="instructions">
                    {drink.strInstructionsDE ? (
                      drink.strInstructionsDE
                    ) : (
                      <span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                        Not available...
                      </span>
                    )}
                  </p>
                  <span className="lang">Italian</span>
                  <p className="instructions">
                    {drink.strInstructionsIT ? (
                      drink.strInstructionsIT
                    ) : (
                      <span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                        Not available...
                      </span>
                    )}
                  </p>
                  {/* display ingredients */}
                  <div className="ingredients_div">
                    <p className="ingredient_head">Ingredients</p>
                    <div className="columns is-multiline">
                      {handleIngredients().map((ingredient, index) => (
                        <div key={index} className="column is-half">
                          <div className="card ingredient_card drinks_ingredients_card">
                            <div className="card-content">
                              <div className="content">
                                <p className="ingredient_span">
                                  <span>{ingredient.split("-")[0]} </span>
                                  <span>-</span>
                                  <span className="measurement">
                                    {ingredient.split("-")[1]}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="wrong">
              <h3>Oops, Something went wrong!</h3>
              <button
                className="wrong_btn"
                onClick={() => {
                  navigate("/drinks_categories");
                }}
              >
                Back to Drinks Homepage
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrinksDetails;
