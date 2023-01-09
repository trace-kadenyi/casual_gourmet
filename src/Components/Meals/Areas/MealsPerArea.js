import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./areas.css";

const MealsPerArea = () => {
  const [fetchedArea, setFetchedArea] = useState([]);
  const { areas, loading } = useSelector((state) => state.areas);
  const navigate = useNavigate();

  // fetch area data from API
  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";

  const { area } = useParams();
  let areaContainer;

  const fetchArea = async () => {
    await axios
      .get(`${BASE_URL}${area}`)
      .then((response) => {
        areaContainer = response;
        setFetchedArea(areaContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchArea();
  }, []);

  // navigate to meal details page
  const handleMealDetails = (id) => {
    navigate(`/meals_categories/:category/${id}`);
  };

  return (
    <div className="individual_area">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h1>{area}</h1>

          <div>
            {fetchedArea.status === 200 ? (
              fetchedArea.data.meals.map((meal, index) => (
                <div key={index}>
                  <img
                    className="meal_img"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    onClick={() => handleMealDetails(meal.idMeal)}
                  />
                  <h3>{meal.strMeal}</h3>
                </div>
              ))
            ) : (
              <h1>No meals found</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealsPerArea;
