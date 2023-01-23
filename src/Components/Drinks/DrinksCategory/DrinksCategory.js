import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      className={`drinks_category ${assignClass(foundCategory.strCategory)}`}
    >
      <DrinksNavigation type="category"/>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="category_container">
          <h1>{foundCategory.strCategory}</h1>
          <div className="one_drink_cat">
            {fetchedCategory.map((drink) => {
              return (
                <div key={drink.idDrink}>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="drink_img"
                    onClick={() => navigateToDrinksDetails(drink.idDrink)}
                  />
                  <h3 className="drink_cat_name">{drink.strDrink}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinksCategory;
