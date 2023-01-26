import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";

const DrinksFunCorner = () => {
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


  return (
    <div className="fun_corner_sect">
      <DrinksNavigation type="category" />
      <h1>Drinks Fun Corner</h1>


      <div className="fun_corner_div">
       

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

               {/* search by glass */}
              <p className="name_btn">
                Glass{" "}
                <button onClick={handleGlass} className="click">
                  GO
                </button>
              </p>

               {/* search by alcoholic */}
              <p className="name_btn">
                Alcoholic / Non-Alcoholic{" "}
                <button onClick={handleAlcoholic} className="click">
                  GO
                </button>
              </p>

            
            </div>
          </div>

          {/* random drink */}
          <div className="randoms">
            <p>
              Want to be even more adventurous? Click the random button to get a
              random drink recipe.
            </p>
            <div className="random_button_div">
              <button className="random_btn">
                Random
              </button>
            </div>
            {/* <div className="random_meal">
              {fetchedRandomMeal.map((meal) => {
                return (
                  <div className="random_div" key={meal.idMeal}>
                    <h3 className="random_title">{meal.strMeal}</h3>
                    <img
                      className="random_img"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      
                    />
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksFunCorner;




