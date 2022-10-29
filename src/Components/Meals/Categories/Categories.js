import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./categories.css";
import { fetchCategories } from "../../../Redux/Meals/categoriesslice";
import { useNavigate, NavLink } from "react-router-dom";

const Categories = () => {
  const { categories, loading } = useSelector((state) => state.mealsCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleCocktails = () => {
    navigate("/cocktails");
  };

  const handleRegularDrinks = () => {
    navigate("/regular");
  };

  return (
    <div>
      {/* meals section */}
      <button
        className="trial"
        style={{
          padding: "20px",
          width: "550px",
          display: "flex",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        Trial
      </button>
      <div className="todo">
        <h3>TODO</h3>
        <p>
          1. Search by:
          <span>a. Ingredients</span>
          <span>b. Country of Origin</span>
          <span>c. First letter</span>
          <span>d. Main ingredient</span>
        </p>
        <p>2. List all areas</p>
      </div>
      <h1 style={{ textDecoration: "underline", color: "red" }}>
        Meals Categories
      </h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        categories.map((category) => (
          <div key={category.idCategory}>
            <h1>{category.strCategory}</h1>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="categoriesImg"
            />
            <NavLink
              className="arrow"
              to={`/meals_categories/${category.strCategory}`}
            >
              <FaLongArrowAltRight />
            </NavLink>
          </div>
        ))
      )}

      {/* drinks section */}
      <h1 style={{ textDecoration: "underline", color: "red" }}>Drinks</h1>
      <button className="alcoholic" onClick={handleCocktails}>
        Cocktails
      </button>
      <button className="non_alcoholic" onClick={handleRegularDrinks}>
        Regular Drinks
      </button>
    </div>
  );
};

export default Categories;
