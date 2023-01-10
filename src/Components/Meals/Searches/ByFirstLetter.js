import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../MealsNavigation/Navbar";

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

  // console.log(fetchedFirstLetter);

  const handleIndividualMeal = (id) => {
    navigate(`/meals_categories/:category/${id}`);
  };

  return (
    <section>
      <Navbar type="meal_details" />
      <div>
        <h1>Search by First Letter</h1>
        <input
          type="text"
          placeholder="Enter first letter"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
        />
        <button onClick={fetchByFirstLetter}>Go</button>

        {fetchedFirstLetter.map((item) => {
          return (
            <div key={item.idMeal}>
              <h3>{item.strMeal}</h3>
              <img
                className="recipe_image"
                src={item.strMealThumb}
                alt={item.strMeal}
                onClick={() => handleIndividualMeal(item.idMeal)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ByFirstLetter;
