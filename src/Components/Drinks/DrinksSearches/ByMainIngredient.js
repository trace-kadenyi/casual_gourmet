import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";

const MainIngredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [fetchedMainIngredient, setFetchedMainIngredient] = useState([]);
  const navigate = useNavigate();
  const { categories, loading, fulfilled, rejected } = useSelector(
    (state) => state.drinksCategories
  );

  const { category } = useParams();

  // fetch drinks by main ingredient
  const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  let mainIngredientContainer;

  const fetchMainIngredient = async () => {
    await axios
      .get(BASE_URL)
      .then((response) => {
        mainIngredientContainer = response.data.drinks;
        setFetchedMainIngredient(mainIngredientContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle individual drinks
  const handleIndividualDrinks = (id) => {
    navigate(`/drinks_categories/:category/${id}`);
    console.log(category);
  };

  return (
    <section>
      <DrinksNavigation type="category" />
      <div className="search_div">
        <h1 className="search_heading">Search By Main Ingredient</h1>
        <div className="input_go">
          <input
            className="search_input"
            type="text"
            placeholder="Enter main ingredient"
            autoFocus
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button className="go_btn" onClick={fetchMainIngredient}>
            Go
          </button>
        </div>
        {/* display drinks if present in the database */}
        <div className="one_cat">
          {fetchedMainIngredient ? (
            fetchedMainIngredient.map((item) => {
              return (
                <div className="individual_items" key={item.idDrink}>
                  <img
                    className="recipe_image"
                    src={item.strDrinkThumb}
                    alt={item.strDrink}
                    onClick={() => handleIndividualDrinks(item.idDrink)}
                  />
                  <h3 className="meal_title">{item.strDrink}</h3>
                </div>
              );
            })
          ) : (
            <h1 className="no_recipe">No recipe found</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainIngredient;
