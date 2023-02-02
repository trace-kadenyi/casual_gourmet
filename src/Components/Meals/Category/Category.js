import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import axios from "axios";

import "./category.css";
import Navbar from "../MealsNavigation/Navbar";

const Category = () => {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const { categories, loading } = useSelector((state) => state.mealsCategories);
  const navigate = useNavigate();

  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  const { category } = useParams();

  // const foundCategory = categories.find((cat) => cat.strCategory === category);

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

  // assign specific class to each category

  const assignClass = (category) => {
    return `${category.toLowerCase().replace(" ", "_")}_cat`;
  };

  return (
    <div
      className={`individual_category ${assignClass(
        category
      )}`}
    >
      <Navbar type="category" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 className="title_head">{category} Recipes</h1>
          <div>
            <div className="one_cat">
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
                      {meal.strMeal.length > 20
                        ? `${meal.strMeal.slice(0, 20)}...`
                        : meal.strMeal}
                    </h4>

                    <NavLink
                      to={`/meals_categories/${category}/${meal.idMeal}`}
                      className="arrow"
                    >
                      <TiArrowForwardOutline />
                    </NavLink>
                  </div>
                ))
              ) : (
                <h1 className="search_found">Loading...</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
