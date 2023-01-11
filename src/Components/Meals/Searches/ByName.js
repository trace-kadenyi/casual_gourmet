import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../MealsNavigation/Navbar";
import "./searches.css";

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
      <div className="search_div">
        <h1>Search by Name</h1>
        <div className="input_go">
          <input
            type="text"
            className="search_input"
            placeholder="Enter name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="go_btn" onClick={fetchByName}>
            Go
          </button>
        </div>
        {/* display meals if present in the database */}
        <div className="one_cat">
          {fetchedName ? (
            fetchedName.map((item) => {
              return (
                <div className="individual_items" key={item.idMeal}>
                  <img
                    className="recipe_image"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    onClick={() => handleIndividualMeal(item.idMeal)}
                  />
                  <h3 className="meal_title search_head">
                    {item.strMeal.length > 20
                      ? `${item.strMeal.slice(0, 20)}...`
                      : item.strMeal}
                  </h3>
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

export default ByName;
