import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";

const FirstLetter = () => {
  const [firstLetter, setFirstLetter] = useState("");
  const [fetchedFirstLetter, setFetchedFirstLetter] = useState([]);
  const navigate = useNavigate();

  // fetch drinks by first letter
  const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  let firstLetterContainer;

  const fetchFirstLetter = async () => {
    await axios
      .get(BASE_URL)
      .then((response) => {
        firstLetterContainer = response.data.drinks;
        setFetchedFirstLetter(firstLetterContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle individual drinks
  const handleIndividualDrinks = (id) => {
    navigate(`/drinks_categories/:category/${id}`);
  };

  return (
    <section className="drinks_search_sect">
      <DrinksNavigation type="category" />
      <div className="search_div">
        <h1 className="search_heading">Search By First Letter</h1>
        <div className="input_go">
          <input
            className="search_input"
            type="text"
            placeholder="Enter first letter"
            autoFocus
            value={firstLetter}
            onChange={(e) => setFirstLetter(e.target.value)}
          />
          <button className="go_btn drinks_go" onClick={fetchFirstLetter}>
            Go
          </button>
        </div>
        {/* display drinks if present in the database */}
        <div className="one_cat">
          {fetchedFirstLetter ? (
            fetchedFirstLetter.map((item) => {
              return (
                <div className="individual_items" key={item.idDrink}>
                  <img
                    className="recipe_image"
                    src={item.strDrinkThumb}
                    alt={item.strDrink}
                    onClick={() => handleIndividualDrinks(item.idDrink)}
                  />
                  <h4 id={item.idDrink} className="meal_title">
                    {item.strDrink.length > 20
                      ? `${item.strDrink.slice(0, 20)}...`
                      : item.strDrink}
                  </h4>{" "}
                </div>
              );
            })
          ) : (
            <h1 className="search_found">
              No recipes found. Please try another letter...
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default FirstLetter;
