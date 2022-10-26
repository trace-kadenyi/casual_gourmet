import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./category.css";

const Category = () => {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const { categories, loading } = useSelector((state) => state.mealsCategories);
  const navigate = useNavigate();

  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  const { category } = useParams();

  const foundCategory = categories.find((cat) => cat.strCategory === category);

  let categoryContainer;

  // fetch category data from API
  const fetchCategory = async () => {
    await axios
      .get(`${BASE_URL}${category}`)
      .then((response) => {
        categoryContainer = response;
        setFetchedCategory(categoryContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // navigate to meal details page
  const navigateToMealDetails = (id) => {
    navigate(`/meals_categories/${category}/${id}`);
  };

  return (
    <div className="individual_category">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{foundCategory.strCategory} Recipes</h1>
          <div>
            <div>
              {fetchedCategory.status === 200 ? (
                fetchedCategory.data.meals.map((meal, index) => (
                  <div key={index} className="individual_items">
                    <img
                      id={meal.idMeal}
                      className="recipe_image"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      onClick={(e) => navigateToMealDetails(e.target.id)}
                    />
                    <h4
                      id={meal.idMeal}
                      className="meal_title"
                      onClick={(e) => navigateToMealDetails(e.target.id)}
                    >
                      {meal.strMeal}
                    </h4>
                  </div>
                ))
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
