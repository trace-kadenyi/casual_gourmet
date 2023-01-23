import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";
import "./drinks_category.css";

const CoffeeTea = () => {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const navigate = useNavigate();

  const { categories, loading } = useSelector(
    (state) => state.drinksCategories
  );

  const COFFEE_TEA_URL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Coffee / Tea";

  // fetch coffee/tea category data from API
  let categoryContainer = [];

  const fetchCoffeeTeaCategory = async () => {
    await axios
      .get(`${COFFEE_TEA_URL}`)
      .then((response) => {
        categoryContainer = response.data.drinks;
        setFetchedCategory(categoryContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCoffeeTeaCategory();
  }, []);

  return (
    <div className="individual_category coffee_tea_cat">
      <DrinksNavigation type="category" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="category_container">
          <h1 className="title_head">Coffee / Tea</h1>
          <div className="one_cat">
            {fetchedCategory ? (
              fetchedCategory.map((drink) => {
                return (
                  <div key={drink.idDrink} className="individual_items">
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      className="recipe_image drinks_image"
                      // navigate to drink details page
                      onClick={() => {
                        navigate(
                          `/drinks_categories/Coffee_Tea/${drink.idDrink}`
                        );
                      }}
                    />
                    <h4 id={drink.idDrink} className="meal_title">
                      {drink.strDrink.length > 20
                        ? `${drink.strDrink.slice(0, 20)}...`
                        : drink.strDrink}
                    </h4>
                  </div>
                );
              })
            ) : (
              <h1 className="search_found">Loading...</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoffeeTea;
