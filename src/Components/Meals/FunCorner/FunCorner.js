import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BiWorld } from "react-icons/bi";

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
        "Please enter a valid country of origin and remember to capitalize the first letter (i.e. American, British, Canadian, Chinese, Croatian, Dutch, Egyptian, French, Greek, Indian, Irish, Italian, Jamaican, Japanese, Kenyan, Malaysian, Mexican, Moroccan, Polish, Portuguese, Russian, Spanish, Thai, Tunisian, Turkish, Unknown, Vietnamese)."
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
        <h3 className="fun_intro">
          Spice up your cooking experience in this little corner{" "}
        </h3>
        <p className="fun_intro_para">
          Cooking can be a fun venture if you want it to be. <br /> On this
          page, you can search for various meal recipes based on the origin,
          name or main ingredient. <br /> You can even take it further and
          choose what to cook based on the first letter that pops in your mind!{" "}
          <br /> So...
          <br /> Get your apron...
          <br /> Raid your kitchen cabinets to see what ingredients you already
          have...
          <br /> And let's get cooking...
        </p>

        <div className="all_queries">
          {/* search buttons/input fields */}
          <div className="search_bys">
            <h3>Search By</h3>
            <div className="searches">
              {/* {/* search by main ingredient */}
              <p className="main_ingredient_btn">
                Main Ingredient{" "}
                <button onClick={handleMainIngredient} className="click">
                  GO
                </button>
              </p>
              {/* search by first letter */}
              <p className="first_letter_btn">
                First Letter{" "}
                <button className="click" onClick={handleFirstLetter}>
                  GO
                </button>
              </p>

              {/* search by name */}
              <p className="name_btn">
                Name{" "}
                <button onClick={handleName} className="click">
                  GO
                </button>
              </p>

              {/* search by country of origin */}
              <div className="origin">
                <input
                  type="text"
                  placeholder="Input Origin/Country"
                  required
                  className="fun_input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <button className="go" onClick={handleCountry}>
                  <BiWorld className="world" />
                </button>
              </div>
            </div>
          </div>

          {/* random meal */}
          <div className="randoms">
            <p>
              Want to be even more adventurous? Click the random button to get a
              random meal recipe.
            </p>
            <div className="random_button_div">
              <button onClick={handleRandomMeal} className="random_btn">
                Random
              </button>
            </div>
            <div className="random_meal">
              {fetchedRandomMeal.map((meal) => {
                return (
                  <div className="random_div" key={meal.idMeal}>
                    <h3 className="random_title">{meal.strMeal}</h3>
                    <img
                      className="random_img"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      onClick={() => handleIndividualMeal(meal.idMeal)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="footer">
        <p>
          &copy; <span className="footer_name">2023 Kadenyi</span>{" "}
        </p>
      </div>
    </section>
  );
};

export default FunCorner;
