import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Other = () => {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const { categories, loading } = useSelector(
    (state) => state.drinksCategories
  );

  const OTHER_UKNOWN_URL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other / Unknown";

  // fetch other/unknown category data from API
  let categoryContainer = [];

  const fetchOtherCategory = async () => {
    await axios
      .get(`${OTHER_UKNOWN_URL}`)
      .then((response) => {
        categoryContainer = response.data.drinks;
        setFetchedCategory(categoryContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchOtherCategory();
  }, []);

  return (
    <div className="drinks_category">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="category_container">
          <h1>Other/Uknown</h1>
          <div className="one_drink_cat">
            {fetchedCategory.map((drink) => {
              return (
                <div key={drink.idDrink}>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="drink_img"
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

export default Other;