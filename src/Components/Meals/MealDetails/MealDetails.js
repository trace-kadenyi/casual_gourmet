import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./meal_details.css";
import Navbar from "../MealsNavigation/Navbar";

const MealDetails = () => {
  const [fetchedMealDetails, setFetchedMealDetails] = useState([]);
  const { categories, loading } = useSelector((state) => state.mealsCategories);

  const { id } = useParams();

  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

  let mealContainer;

  // fetch meal details from API
  const fetchMealDetails = async () => {
    await axios
      .get(`${BASE_URL}${id}`)
      .then((response) => {
        mealContainer = response;
        setFetchedMealDetails(mealContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMealDetails();
  }, []);

  // fetch ingredients and measures from API

  const ingredients = [];

  const handleIngredients = () => {
    if (fetchedMealDetails.data) {
      for (let i = 1; i <= 20; i++) {
        if (fetchedMealDetails.data.meals[0][`strIngredient${i}`]) {
          ingredients.push(
            `${fetchedMealDetails.data.meals[0][`strIngredient${i}`]} - ${
              fetchedMealDetails.data.meals[0][`strMeasure${i}`]
            }`
          );
        }
      }
      return ingredients;
    }
  };
  // call handleIngredients function
  handleIngredients();

  return (
    <div className="individual_meal">
      <Navbar type="meal_details" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Meal Details</h1>
          <div>
            <div>
              {fetchedMealDetails.status === 200
                ? fetchedMealDetails.data.meals.map((meal, index) => (
                    <div key={index} className="individual_meal_details">
                      <img
                        id={meal.idMeal}
                        className="recipe_image"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                      />
                      <h1>{meal.strMeal}</h1>
                    <h5>{meal.strArea}</h5>
                    <p>{meal.strCategory}</p>
                      <p>{meal.strInstructions}</p>
                      <h3>Ingredients</h3>
                      <ul>
                        {ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                      <div>
                  <a href={meal.strYoutube} target="_blank">Youtube Video</a>
                    </div>
                    <p>{meal.strTags ? `Tags: ${meal.strTags}` : <span>No tags</span>}</p>
                    </div>
                  ))
                  : null}
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
