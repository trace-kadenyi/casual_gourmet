import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../MealsNavigation/Navbar";
import "./searches.css";

const ByMainIngredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [fetchedMainIngredient, setFetchedMainIngredient] = useState([]);
  const navigate = useNavigate();

  // fetch meals based on main ingredients
  let mainIngredientsContainer;

  const fetchByMainIngredient = async () => {
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => {
        mainIngredientsContainer = response.data.meals;
        setFetchedMainIngredient(mainIngredientsContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle individual meal
  const handleIndividualMeal = (id) => {
    navigate(`/meals_categories/:category/${id}`);
  };

  return (
    <section>
      <Navbar type="meal_details" />
      <div className="search_div">
        <h1>Search by Main Ingredient</h1>
        <div className="input_go">
          <input
            className="search_input"
            type="text"
            placeholder="Enter main ingredient"
            autoFocus
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button className="go_btn" onClick={fetchByMainIngredient}>
            Go
          </button>
        </div>
        {/* display meals if present in the database */}
        <div className="one_cat">
          {fetchedMainIngredient ? (
            fetchedMainIngredient.map((item) => {
              return (
                <div className="individual_items" key={item.idMeal}>
                  <img
                    className="recipe_image"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    onClick={() => handleIndividualMeal(item.idMeal)}
                  />
                  <h3 className="meal_title search_head">{item.strMeal}</h3>
                </div>
              );
            })
          ) : (
            <h1 className="search_found">No Meals Found Yet...</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default ByMainIngredient;
