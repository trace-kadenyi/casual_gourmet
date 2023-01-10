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

  // handle main ingredient
  const handleMainIngredient = () => {
    navigate(`/main_ingredient`);
  };

  // handle first letter
  const handleFirstLetter = () => {
    navigate("/first_letter");
  };

  // handle name
  const handleName = () => {
    navigate("/name");
  };

  return (
    <section className="fun_corner_sect">
      <Navbar type="fun_corner" />
      <div className="fun_corner_div">
        <h3>Fun Corner</h3>
        <p>Spice up your cooking experience in this little fun corner. </p>
        <div className="searches">
          {/* country of origin */}
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

          {/* {/* main ingredient */}
          <div>
            <button
              className="main_ingredient_btn"
              onClick={handleMainIngredient}
            >
              Search By Main Ingredient
            </button>
          </div>
          {/* first letter */}
          <div>
            <button className="first_letter_btn" onClick={handleFirstLetter}>
              Search By First Letter
            </button>
          </div>

          {/* name */}
          <div>
            <button className="name_btn" onClick={handleName}>
              Search By Name
            </button>
          </div>
        </div>
        {/* <ul>
         
            <li>Name</li>
          </ul> */}

        <p>
          Want to be even more spontaneous? Click the random button to get a
          random meal.
        </p>
      </div>

      {/* <div className="todo">
        <h3>TODO</h3>
        <p>
        // spice up your cooking experience in this little fun corner. You can search for meals by:
        // Want to be even more spontaneous? Click the random button to get a random meal.
          1. Search by:
          <span>b. Country of Origin- www.themealdb.com/api/json/v1/1/filter.php?a=Canadian</span>
          <span>c. First letter- www.themealdb.com/api/json/v1/1/search.php?f=a</span>
          <span>d. Main ingredient- www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast</span>
          <span>e. Name - www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata</span>
          <span>f. Random - www.themealdb.com/api/json/v1/1/random.php</span>
        </p>
        <p>3. Ingredient Details - www.themealdb.com/api/json/v1/1/list.php?i=list</p>
      </div> */}
      {/* <button onClick={handleAreas}>Areas</button> */}
    </section>
  );
};

export default FunCorner;
