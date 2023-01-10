import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../MealsNavigation/Navbar";


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

  // console.log(fetchedMainIngredient);

  const handleIndividualMeal = (id) => {
    navigate(`/meals_categories/:category/${id}`);
  };

  return (
    <section>
       <Navbar type="meal_details" />
      <div>
        <h1>Search by Main Ingredient</h1>
        <input
          type="text"
          placeholder="Enter main ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button onClick={fetchByMainIngredient}>Go</button>

        {fetchedMainIngredient.map((item) => {
          return (
            <div key={item.idMeal}>
              <h3>{item.strMeal}</h3>
              <img
                className="recipe_image"
                src={item.strMealThumb}
                alt={item.strMeal}
                onClick={() => handleIndividualMeal(item.idMeal)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ByMainIngredient;
