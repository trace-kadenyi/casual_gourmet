import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";
import "./drinks_searches.css";

const ByAlcohol = () => {
  const [alcohol, setAlcohol] = useState("");
  const [fetchedAlcohol, setFetchedAlcohol] = useState([]);
  const navigate = useNavigate();
  const { categories, loading, fulfilled, rejected } = useSelector(
    (state) => state.drinksCategories
  );

  const { category } = useParams();

  // fetch drinks by alcohol
  const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`;

  let alcoholContainer;

  const fetchAlcohol = async () => {
    await axios
      .get(BASE_URL)
      .then((response) => {
        alcoholContainer = response.data.drinks;
        setFetchedAlcohol(alcoholContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle go button
  const handleGo = () => {
    if (alcohol === "alcoholic" || alcohol === "non alcoholic") {
      fetchAlcohol();
    } else {
      swal(
        "Oops!",
        "Please enter either 'Alcoholic' or 'Non Alcoholic' in the search box.",
        "error"
      );
    }
  };

  // handle individual drinks
  const handleIndividualDrinks = (id) => {
    navigate(`/drinks_categories/:category/${id}`);
    console.log(category);
  };

  return (
    <section className="drinks_search_sect">
      <DrinksNavigation type="category" />
      <div className="search_div">
        <h1 className="search_heading">Search By Alcohol</h1>
        <div className="input_go">
          <input
            className="search_input drink_input"
            type="text"
            placeholder="Enter alcohol"
            autoFocus
            value={alcohol.replace("-", " ")}
            onChange={(e) => setAlcohol(e.target.value)}
          />

          <button className="go_btn" onClick={handleGo}>
            Go
          </button>
        </div>
        {/* display drinks if present in the database */}
        <div className="one_cat">
          {fetchedAlcohol ? (
            fetchedAlcohol.map((item) => {
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
            <h1 className="search_found">No recipes found.</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default ByAlcohol;
