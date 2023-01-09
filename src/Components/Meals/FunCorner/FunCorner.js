import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


import Navbar from "../MealsNavigation/Navbar";
import MealsPerArea from "../Areas/MealsPerArea";
import { fetchAreas } from "../../../Redux/Meals/areaslice";

import "./fun_corner.css";

const FunCorner = () => {
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const { areas, loading } = useSelector((state) => state.areas);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAreas());
  }, []);

  // const { area } = useParams();

  const foundArea = areas.find((area) => area.strArea === country);
  

  const handleChange = () => {
    if (foundArea) {
      navigate(`/areas/${country}`);
    }
    else {
      swal(
        "NB: Some countries are not represented in the database.",
        "Please enter a valid country of origin and capitalize the first letter (i.e. American, British, Canadian, Chinese, Croatian, Dutch, Egyptian, French, Greek, Indian, Irish, Italian, Jamaican, Japanese, Kenyan, Malaysian, Mexican, Moroccan, Polish, Portuguese, Russian, Spanish, Thai, Tunisian, Turkish, Unknown, Vietnamese).")
    }
    
  }


  //   const handleChange = () => {
  //   // navigate(`/areas/${country}`);
  //   if (foundArea) {
  //     navigate(`/areas/${country}`);
  //   } else {
  //     swal(
  //       "NB: Some countries are not represented in the database.",
  //       "Please enter a valid country of origin (i.e. American, British, Canadian, Chinese, Croatian, Dutch, Egyptian, French, Greek, Indian, Irish, Italian, Jamaican, Japanese, Kenyan, Malaysian, Mexican, Moroccan, Polish, Portuguese, Russian, Spanish, Thai, Tunisian, Turkish, Unknown, Vietnamese)."
  //     );
  //   }
  // };

  const fetchByMainIngredient = () => {

  }

  return (
    <section className="fun_corner_sect">
      <Navbar type="fun_corner" />
      <div className="fun_corner_div">
        <h3>Fun Corner</h3>
        <p>
          Spice up your cooking experience in this little fun corner. </p>
        {/* country of origin */}
        <input type="text" placeholder="Search by Country of Origin" className="fun_input" value={country} onChange={(e) => setCountry(e.target.value)} />
        <button className="go" onClick={handleChange}>Go</button>
        {/* main ingredient */}
        <input type="text" placeholder="Search by Main Ingredient" className="fun_input" />
        <button className="go">Go</button>
          
          {/* <ul>
            <li>Country of Origin</li>
            <li>First letter</li>
            <li>Main ingredient</li>
            <li>Name</li>
          </ul> */}
        <p>Want to be even more spontaneous? Click the random button to get a random meal.</p>

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
