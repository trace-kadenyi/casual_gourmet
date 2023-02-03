import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";

const MainIngredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [fetchedMainIngredient, setFetchedMainIngredient] = useState([]);
  const navigate = useNavigate();

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
  };

  return (
    <section className="drinks_search_sect">
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
          <button className="go_btn drinks_go" onClick={fetchMainIngredient}>
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
                  <h4 id={item.idDrink} className="meal_title">
                    {item.strDrink.length > 20
                      ? `${item.strDrink.slice(0, 20)}...`
                      : item.strDrink}
                  </h4>{" "}
                </div>
              );
            })
          ) : (
            <h1 className="search_found">
              No recipes found. Please try another ingredient...
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainIngredient;
