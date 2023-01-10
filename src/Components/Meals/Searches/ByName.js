import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../MealsNavigation/Navbar";

const ByName = () => {
  const [name, setName] = useState("");
  const [fetchedName, setFetchedName] = useState([]);
  const navigate = useNavigate();

  // fetch meals based on name

  let nameContainer;

  const fetchByName = async () => {
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then((response) => {
        nameContainer = response.data.meals;
        setFetchedName(nameContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle individual meal
  const handleIndividualMeal = (id) => {
    navigate(`/meals_categories/:category/${id}`);
  };

  return (
    <section>
      <Navbar type="meal_details" />
      <div>
        <h1>Search by Name</h1>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={fetchByName}>Go</button>

        {fetchedName.map((item) => {
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

export default ByName;
