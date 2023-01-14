import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TiArrowForwardOutline } from "react-icons/ti";
import "./categories.css";
import { fetchCategories } from "../../../Redux/Meals/categoriesslice";
import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "../MealsNavigation/Navbar";

const Categories = () => {
  const [showMore, setShowMore] = useState(false);
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

  const handleShowMore = (e) => {
    setShowMore(!showMore);
    e.target.innerText = showMore ? "Show More" : "Show Less";
  };

  // assign specific class to each category
  const assignClass = (category) => {
    return category.toLowerCase().replace(" ", "_");
  };

  return (
    <div className="categories_sect">
      <Navbar type="categories" />
      {/* meals section */}
      {/* <button
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
      </button> */}
      {/* <div className="todo">
        <h3>TODO</h3>
        <p>
          1. Search by:
          <span>a. Ingredients</span>
          <span>b. Country of Origin- www.themealdb.com/api/json/v1/1/filter.php?a=Canadian</span>
          <span>c. First letter- www.themealdb.com/api/json/v1/1/search.php?f=a</span>
          <span>d. Main ingredient- www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast</span>
          <span>e. Name - www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata</span>
          <span>f. Random - www.themealdb.com/api/json/v1/1/random.php</span>
        </p>
        <p>3. Ingredient Details - www.themealdb.com/api/json/v1/1/list.php?i=list</p>
      </div> */}
      {/* <button onClick={handleAreas}>Areas</button> */}
      <h1 className="categories_head">Categories</h1>
      <p className="categories_intro_para">
        Food is one of <span>life's greatest pleasures</span>. This page contains some of the most popular categories of food. Click on any category to view multiple recipes that could liven up your cooking experience. 
      </p>
      <div className="categories_div">
        {loading ? (
          <h1 className="search_found">Loading...</h1>
        ) : (
          categories.map((category) => (
            <div
              key={category.idCategory}
              className={`category_div ${assignClass(category.strCategory)}`}
            >
              <h1 className="cat_heading">{category.strCategory}</h1>
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="categoriesImg"
              />
              <p className="cat_description">
                {showMore
                  ? category.strCategoryDescription
                  : `${category.strCategoryDescription.slice(0, 100)}...`}
                <span onClick={handleShowMore} className="showMore">
                  Show More
                </span>
              </p>
              <NavLink
                className="arrow"
                to={`/meals_categories/${category.strCategory}`}
              >
                <TiArrowForwardOutline />
              </NavLink>
            </div>
          ))
        )}
      </div>

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
