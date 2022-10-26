import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./meal_details.css";

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

  return (
    <div className="individual_meal">
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
                      <p>{meal.strInstructions}</p>
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
