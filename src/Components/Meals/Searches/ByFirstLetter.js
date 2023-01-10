import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../MealsNavigation/Navbar";
import "./searches.css";

const ByFirstLetter = () => {
  const [letter, setLetter] = useState("");
  const [fetchedFirstLetter, setFetchedFirstLetter] = useState([]);
  const navigate = useNavigate();

  // fetch meals based on first letter

  let firstLetterContainer;

  const fetchByFirstLetter = async () => {
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((response) => {
        firstLetterContainer = response.data.meals;
        setFetchedFirstLetter(firstLetterContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleIndividualMeal = (id) => {
    navigate(`/meals_categories/:category/${id}`);
  };

  return (
    <section>
      <Navbar type="meal_details" />
      <div className="search_div">
        <h1>Search by First Letter</h1>
        <div className="input_go">
          <input
            type="text"
            className="search_input"
            placeholder="Enter first letter"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <button className="go_btn" onClick={fetchByFirstLetter}>
            Go
          </button>
        </div>
        {/* display meals if present in the database */}
        <div className="one_cat">
          {fetchedFirstLetter ? (
            fetchedFirstLetter.map((item) => {
              return (
                <div className="individual_items" key={item.idMeal}>
                  <img
                    className="recipe_image"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    onClick={() => handleIndividualMeal(item.idMeal)}
                  />
                  <h3 className="meal_title search_head">{item.strMeal}</h3>
                </div>
              );
            })
          ) : (
            <h1>No Meals Found Yet...</h1>
          )}{" "}
        </div>
      </div>
    </section>
  );
};

export default ByFirstLetter;
