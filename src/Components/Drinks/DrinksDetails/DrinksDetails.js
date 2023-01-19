import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {fulfilled ? (
            fetchedDrinks.map((drink) => {
              return (
                <div key={drink.idDrink}>
                  <h1>{drink.strDrink}</h1>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="drinks_details_img"
                  />
                  <p>{drink.strTags}</p>
                  <p>{drink.strCategory}</p>
                  <button
                    className="back_btn"
                    onClick={() => {
                      navigate(`/drinks_categories/${drink.strCategory}`);
                    }}
                  >
                    Back to {drink.strCategory}
                  </button>
                  <p>{drink.strIBA}</p>
                  <p>{drink.strAlcoholic}</p>
                  <p>{drink.strGlass}</p>
                  <p>{drink.strInstructions}</p>
                  <p>{drink.strInstructionsES}</p>
                  <p>{drink.strInstructionsDE}</p>
                  <p>{drink.strInstructionsFR}</p>
                  <p>{drink.strInstructionsIT}</p>
                  {/* display ingredients */}
                  <div className="ingredients_div">
                    <h2 className="ingredients_heading">Ingredients</h2>
                    <div className="ingredients_ul">
                      {handleIngredients().map((ingredient, index) => (
                        <div key={index} className="column is-half">
                          <div className="card ingredient_card">
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
            <h2>Loading...</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default DrinksDetails;
