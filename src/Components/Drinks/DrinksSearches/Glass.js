import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";

const Glass = () => {
  const [glass, setGlass] = useState("");
  const [fetchedGlass, setFetchedGlass] = useState([]);
  const navigate = useNavigate();
  const { categories, loading, fulfilled, rejected } = useSelector(
    (state) => state.drinksCategories
  );

  const { category } = useParams();

  // fetch drinks by glass
  const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`;

  let glassContainer;

  const fetchGlass = async () => {
    await axios
      .get(BASE_URL)
      .then((response) => {
        glassContainer = response.data.drinks;
        setFetchedGlass(glassContainer);
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
        <h1 className="search_heading">Search By Glass</h1>
        <div className="input_go">
          <input
            className="search_input"
            type="text"
            placeholder="Enter glass"
            autoFocus
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
          />
          <button className="go_btn drinks_go" onClick={fetchGlass}>
            Go
          </button>
        </div>
        {/* display drinks if present in the database */}
        <div className="one_cat">
          {fetchedGlass ? (
            fetchedGlass.map((item) => {
              return (
                <div className="individual_items" key={item.idDrink}>
                  <img
                    className="recipe_image"
                    src={item.strDrinkThumb}
                    alt={item.strDrink}
                    onClick={() => handleIndividualDrinks(item.idDrink)}
                  />
                  <h3 className="meal_title">{item.strDrink}</h3>
                </div>
              );
            })
          ) : (
            <h1 className="search_found">No recipes found. Please try another glass type...</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Glass;
