import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";
import "./drinks_searches.css";

const ByAlcohol = () => {
  const [alcohol, setAlcohol] = useState("");
  const [fetchedAlcohol, setFetchedAlcohol] = useState([]);
  const navigate = useNavigate();

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
        "Please enter either 'alcoholic' or 'non alcoholic' (lowercase) in the search box.",
        "error"
      );
    }
  };

  // handle individual drinks
  const handleIndividualDrinks = (id) => {
    navigate(`/drinks_categories/:category/${id}`);
  };

  return (
    <section className="drinks_search_sect">
      <DrinksNavigation type="category" />
      <div className="search_div">
        <h1 className="search_heading">Search By Type</h1>
        <div className="input_go">
          <input
            className="alcohol_input"
            type="text"
            placeholder="Enter alcoholic or non alcoholic"
            autoFocus
            value={alcohol.replace("-", " ").toLocaleLowerCase()}
            onChange={(e) => setAlcohol(e.target.value)}
          />

          <button className="go_btn drinks_go" onClick={handleGo}>
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
                  <h4 id={item.idDrink} className="meal_title">
                    {item.strDrink.length > 20
                      ? `${item.strDrink.slice(0, 20)}...`
                      : item.strDrink}
                  </h4>
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
