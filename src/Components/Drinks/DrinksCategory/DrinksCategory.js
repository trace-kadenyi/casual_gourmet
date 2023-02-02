import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { TiArrowForwardOutline } from "react-icons/ti";

import { useSelector } from "react-redux";
import axios from "axios";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";
import "./drinks_category.css";

const DrinksCategory = () => {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const navigate = useNavigate();
  const { categories, loading } = useSelector(
    (state) => state.drinksCategories
  );

  const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=";

  const { category } = useParams();

  const foundCategory = categories.find((cat) => cat.strCategory === category);

  let categoryContainer;

  // fetch category data from API
  const fetchCategory = async () => {
    await axios
      .get(`${BASE_URL}${category}`)
      .then((response) => {
        categoryContainer = response.data.drinks;
        setFetchedCategory(categoryContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // navigate to drinks details page
  const navigateToDrinksDetails = (id) => {
    navigate(`/drinks_categories/${category}/${id}`);
  };

  // assign specific class to each category

  const assignClass = (category) => {
    return `${category.toLowerCase().replace(" ", "_")}_cat`;
  };

  return (
    <div
      className={`individual_category ${assignClass(
        foundCategory.strCategory
      )}`}
    >
      <DrinksNavigation type="category" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="category_container">
          <h1 className="title_head drinks_cat_head">{foundCategory.strCategory}</h1>
          <div className="one_cat">
            {fetchedCategory ? (
              fetchedCategory.map((drink, index) => (
                <div key={index} className="individual_items">
                  <img
                    id={drink.idDrink}
                    className="recipe_image drinks_image"
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    onClick={(e) => navigateToDrinksDetails(drink.idDrink)}
                  />
                  <h4 id={drink.idDrink} className="meal_title">
                    {drink.strDrink.length > 20
                      ? `${drink.strDrink.slice(0, 20)}...`
                      : drink.strDrink}
                  </h4>
                </div>
              ))
            ) : (
              <h1 className="search_found">Loading...</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinksCategory;
