import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div className="drinks_category">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="category_container">
          <h1>Coffee / Tea</h1>
          <div className="one_drink_cat">
            {fetchedCategory.map((drink) => {
              return (
                <div key={drink.idDrink}>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="drink_img"
                    // navigate to drink details page
                    onClick={() => {
                      navigate(
                        `/drinks_categories/Coffee_Tea/${drink.idDrink}`
                      );
                    }}
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

export default CoffeeTea;
