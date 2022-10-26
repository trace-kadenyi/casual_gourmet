import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./category.css";

const Category = () => {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const { categories, loading } = useSelector((state) => state.mealsCategories);

  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  const { category } = useParams();

  const foundCategory = categories.find((cat) => cat.strCategory === category);

  let categoryContainer;

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

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{foundCategory.strCategory} Recipes</h1>
          {/* <img
            src={foundCategory.strCategoryThumb}
            alt={foundCategory.strCategory}
            className="categoriesImg"
          /> */}
          <div>
            <div>
              {fetchedCategory.status === 200 ? (
                fetchedCategory.data.meals.map((meal, index) => (
                  <div key={index}>
                    <h4>{meal.strMeal}</h4>
                    <img
                      className="recipe_image"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                    />
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
