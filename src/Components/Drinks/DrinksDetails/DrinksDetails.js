import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./drinks_details.css";

const DrinksDetails = () => {
  const { categories, loading, fulfilled } = useSelector(
    (state) => state.drinksCategories
  );

  const [fetchedDrinks, setFetchedDrinks] = useState([]);
  const { id } = useParams();

  const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  // fetch drinks details
  let drinksContainer;

  const fetchDrinksDetails = async () => {
    await axios
      .get(BASE_URL)
      .then((response) => {
        drinksContainer = response.data.drinks;
        setFetchedDrinks(drinksContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDrinksDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {fulfilled ? (
            fetchedDrinks.map((drink) => {
              return (
                <div key={drink.idDrink}>
                  <h1>{drink.strDrink}</h1>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="drinks_details_img"
                  />
                  <p>{drink.strTags}</p>
                  <p>{drink.strCategory}</p>
                  <p>{drink.strIBA}</p>
                  <p>{drink.strAlcoholic}</p>
                  <p>{drink.strGlass}</p>
                  <p>{drink.strInstructions}</p>
                  <p>{drink.strInstructionsES}</p>
                  <p>{drink.strInstructionsDE}</p>
                  <p>{drink.strInstructionsFR}</p>
                  <p>{drink.strInstructionsIT}</p>
                </div>
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default DrinksDetails;
