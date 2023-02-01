import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// import "bulma/css/bulma.min.css";

import "./meal_details.css";
import Navbar from "../MealsNavigation/Navbar";
import tube from "../../../assets/youtube.png";

const MealDetails = () => {
  const [fetchedMealDetails, setFetchedMealDetails] = useState([]);
  const [more, setMore] = useState(false);
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

  // handle more button for recipe instructions
  const handleShowMore = (e) => {
    setMore(!more);
    e.target.innerText = more ? "Show More" : "Show Less";
  };

  return (
    <div className="individual_meal">
      <Navbar type="meal_details" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div>
            <div>
              {fetchedMealDetails.status === 200
                ? fetchedMealDetails.data.meals.map((meal, index) => (
                    <div key={index} className="individual_meal_details">
                      <h1 className="meal_name">{meal.strMeal}</h1>

                      <div className="fun_facts">
                        <p className="facts">Fun Facts</p>
                        <p className="fact">
                          <span className="basics">Country of Origin: </span>
                          {meal.strArea}
                        </p>
                        <p className="fact">
                          <span className="basics">Category:</span>{" "}
                          {meal.strCategory}
                        </p>
                        <p className="fact">
                          <span className="basics">Tags:</span>{" "}
                          {meal.strTags
                            ? meal.strTags.split(",").join(", ")
                            : "No tags available"}
                        </p>
                      </div>

                      <p className="prep">PREPARATION</p>
                      <p className="instructions mt-5">
                        {/* add see more button */}
                        {more
                          ? meal.strInstructions
                              .split(". ")
                              .map((instruction, index) => (
                                <span key={index}>
                                  {instruction}.
                                  <br />
                                </span>
                              ))
                          : meal.strInstructions
                              .split(". ")
                              .slice(0, 3)
                              .map((instruction, index) => (
                                <span key={index}>
                                  {instruction}.
                                  <br />
                                </span>
                              ))}
                        <button
                          className="showmore_recipe"
                          onClick={handleShowMore}
                        >
                          Show More
                        </button>
                      </p>
                      {/* ingredients */}
                      <p className="ingredient_head">Ingredients</p>
                      <div className="section">
                        <div className="container">
                          <div className="columns is-multiline">
                            {ingredients.map((ingredient, index) => (
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
                      {/* video */}
                      <div className="vid_div">
                        <p className="video_head">Video</p>
                        <p className="vid_instructions">
                          Need more guidance? Watch the video below for the
                          visual on how to prepare this meal. Have fun with it!
                        </p>
                        <a href={meal.strYoutube} target="_blank">
                          <img className="tube" src={tube} alt="youtube" />
                        </a>
                      </div>
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
