import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const IndividualCategory = () => {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const { categories, loading } = useSelector((state) => state.mealsCategories);

  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  const { category } = useParams();

  const foundCategory = categories.find((cat) => cat.strCategory === category);

  let categoryContainer;

  const fetchCategory = async () => {
    await axios
      .get(`${BASE_URL}${category}`)
      .then((response) => {
        categoryContainer = response;
        setFetchedCategory(categoryContainer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{foundCategory.strCategory}</h1>
          <img
            src={foundCategory.strCategoryThumb}
            alt={foundCategory.strCategory}
            className="categoriesImg"
          />
          <div>
            <h3>Recipes</h3>
            <div>
              {fetchedCategory.status === 200 ? (
                fetchedCategory.data.meals.map((meal, index) => (
                  <div key={index}>
                    <h4>{meal.strMeal}</h4>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                  </div>
                ))
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualCategory;
