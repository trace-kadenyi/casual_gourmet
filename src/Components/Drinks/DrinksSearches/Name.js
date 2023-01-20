import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";

const Name = () => {
  const [name, setName] = useState("");
  const [fetchedName, setFetchedName] = useState([]);
  const navigate = useNavigate();
  const { categories, loading, fulfilled, rejected } = useSelector(
    (state) => state.drinksCategories
  );

  const { category } = useParams();

  // fetch drinks by name
  const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

  let nameContainer;

  const fetchName = async () => {
    await axios
      .get(BASE_URL)
      .then((response) => {
        nameContainer = response.data.drinks;
        setFetchedName(nameContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle individual drinks
  const handleIndividualDrinks = (id) => {
    navigate(`/drinks_categories/:category/${id}`);
    console.log(category);
  };

  return (
    <section>
      <DrinksNavigation type="category" />
      <div className="search_div">
        <h1 className="search_heading">Search By Name</h1>
        <div className="input_go">
          <input
            className="search_input"
            type="text"
            placeholder="Enter name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="go_btn" onClick={fetchName}>
            Go
          </button>
        </div>
        {/* display drinks if present in the database */}
        <div className="one_cat">
          {fetchedName ? (
            fetchedName.map((item) => {
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
            <h1 className="no_recipe">No recipe found</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Name;
