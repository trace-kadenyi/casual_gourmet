import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";
import "./drinks_fun_corner.css";

const DrinksFunCorner = () => {
  const [fetchedRandomDrink, setFetchedRandomDrink] = useState([]);
  const navigate = useNavigate();

  // handle search by main ingredient
  const handleMainIngredient = () => {
    navigate(`/drinks_main_ingredient`);
  };

  // handle search by first letter
  const handleFirstLetter = () => {
    navigate("/drinks_first_letter");
  };

  // handle search by name
  const handleName = () => {
    navigate("/drinks_name");
  };

  // handle search by glass
  const handleGlass = () => {
    navigate("/drinks_glass");
  };

  // handle search by alcoholic
  const handleAlcoholic = () => {
    navigate("/drinks_alcoholic");
  };

  // handle search by random drink

  let randomDrink;

  const handleRandomDrink = async () => {
    await axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then((response) => {
        randomDrink = response.data.drinks;
        setFetchedRandomDrink(randomDrink);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle individual drinks
  const handleIndividualDrinks = (id) => {
    navigate(`/drinks_categories/:category/${id}`);
  };

  return (
    <div className="fun_corner_sect">
      <DrinksNavigation type="category" />
      <h3 className="fun_intro">
        Have a little fun making your drinks in this corner{" "}
      </h3>
      <p className="fun_intro_para">
        So, you're an amateur mixologist and you want to try your hand at making
        some drinks...
        <br />
        There's no reason why you can't have some fun in the process. <br />
        On this page, you can search for various drinks based on the main
        ingredient, name, glass or type. <br />
        You can even take it further and choose what drink to make based on the
        first letter. <br />
        So...
        <br /> Get your ingredients and let's get mixing.
      </p>

      <div className="fun_corner_div">
        <div className="all_queries">
          {/* search buttons/input fields */}
          <div className="drinks_search_bys">
            <h3>Search By</h3>
            <div className="searches">
              {/* {/* search by main ingredient */}
              <p className="main_ingredient_btn drinks_search_btns">
                Main Ingredient{" "}
                <button onClick={handleMainIngredient} className="click">
                  GO
                </button>
              </p>
              {/* search by first letter */}
              <p className="first_letter_btn drinks_search_btns">
                First Letter{" "}
                <button className="click" onClick={handleFirstLetter}>
                  GO
                </button>
              </p>

              {/* search by name */}
              <p className="name_btn drinks_search_btns">
                Name{" "}
                <button onClick={handleName} className="click">
                  GO
                </button>
              </p>

              {/* search by glass */}
              <p className="name_btn drinks_search_btns">
                Glass{" "}
                <button onClick={handleGlass} className="click">
                  GO
                </button>
              </p>

              {/* search by alcoholic */}
              <p className="name_btn drinks_search_btns alcoholic_btn">
                Alcoholic / Non-Alcoholic{" "}
                <button onClick={handleAlcoholic} className="click">
                  GO
                </button>
              </p>
            </div>
          </div>

          {/* random drink */}
          <div className="drinks_randoms">
            <p>
              Want to be even more adventurous? Click the random button to get a
              random drink recipe.
            </p>
            <div className="random_button_div">
              <button
                className="random_btn drinks_random_btn"
                onClick={handleRandomDrink}
              >
                Random
              </button>
            </div>
            <div className="random_meal">
              {fetchedRandomDrink.map((drink) => {
                return (
                  <div className="random_div" key={drink.idDrink}>
                    <h3 className="random_title">{drink.strDrink}</h3>
                    <img
                      className="random_img drinks_random_img"
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      onClick={() => handleIndividualDrinks(drink.idDrink)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksFunCorner;
