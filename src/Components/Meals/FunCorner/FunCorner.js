import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Navbar from "../MealsNavigation/Navbar";
import { fetchAreas } from "../../../Redux/Meals/areaslice";

import "./fun_corner.css";

const FunCorner = () => {
  const [country, setCountry] = useState("");
  const [fetchedRandomMeal, setFetchedRandomMeal] = useState([]);
  const navigate = useNavigate();
  const { areas, loading } = useSelector((state) => state.areas);
  const dispatch = useDispatch();

  // fetch areas on load
  useEffect(() => {
    dispatch(fetchAreas());
  }, []);

  // handle country
  const foundArea = areas.find((area) => area.strArea === country);

  const handleCountry = () => {
    if (foundArea) {
      navigate(`/areas/${country}`);
    } else {
      swal(
        "NB: Some countries are not represented in the database.",
        "Please enter a valid country of origin and capitalize the first letter (i.e. American, British, Canadian, Chinese, Croatian, Dutch, Egyptian, French, Greek, Indian, Irish, Italian, Jamaican, Japanese, Kenyan, Malaysian, Mexican, Moroccan, Polish, Portuguese, Russian, Spanish, Thai, Tunisian, Turkish, Unknown, Vietnamese)."
      );
    }
  };

  // handle search by main ingredient
  const handleMainIngredient = () => {
    navigate(`/main_ingredient`);
  };

  // handle search by first letter
  const handleFirstLetter = () => {
    navigate("/first_letter");
  };

  // handle search by name
  const handleName = () => {
    navigate("/name");
  };

  // handle search by random meal
  let randomMeal;

  const handleRandomMeal = async () => {
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((response) => {
        randomMeal = response.data.meals;
        setFetchedRandomMeal(randomMeal);
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
    <section className="fun_corner_sect">
      <Navbar type="fun_corner" />
      <div className="fun_corner_div">
        <h3>Fun Corner</h3>
        <p>Spice up your cooking experience in this little fun corner. </p>
        <div className="searches">
          {/* search by country of origin */}
          <div>
            <input
              type="text"
              placeholder="Search by Country of Origin"
              className="fun_input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button className="go" onClick={handleCountry}>
              Go
            </button>
          </div>

          {/* {/* search by main ingredient */}
          <div>
            <button
              className="main_ingredient_btn"
              onClick={handleMainIngredient}
            >
              Search By Main Ingredient
            </button>
          </div>
          {/* search by first letter */}
          <div>
            <button className="first_letter_btn" onClick={handleFirstLetter}>
              Search By First Letter
            </button>
          </div>

          {/* search by name */}
          <div>
            <button className="name_btn" onClick={handleName}>
              Search By Name
            </button>
          </div>
        </div>
        {/* random meal */}
        <p>
          Want to be even more spontaneous? Click the random button to get a
          random meal.
        </p>
        <button onClick={handleRandomMeal}>Random</button>

        <div className="random_meal">
          {fetchedRandomMeal.map((meal) => {
            return (
              <div key={meal.idMeal}>
                <h3>{meal.strMeal}</h3>
                <img
                  className="recipe_image"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  onClick={() => handleIndividualMeal(meal.idMeal)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FunCorner;
