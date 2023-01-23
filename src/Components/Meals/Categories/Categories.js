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

  // assign specific class to each category
  const assignClass = (category) => {
    return category.toLowerCase().replace(" ", "_");
  };

  return (
    <div className="categories_sect">
      <Navbar type="categories" />
      <h1 className="categories_head">Categories</h1>
      <p className="categories_intro_para">
        Food is one of <span>life's greatest pleasures</span>. This page
        contains some of the most popular categories of food. Click on any
        category to view multiple recipes that could liven up your cooking
        experience.
      </p>
      <div className="categories_div">
        {loading ? (
          <h1 className="search_found">Loading...</h1>
        ) : (
          categories.map((category) => (
            <div
              key={Math.random()}
              // key={category.idCategory}
              className={`category_div ${assignClass(category.strCategory)}`}
            >
              <h1 className="cat_heading">{category.strCategory}</h1>
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="categoriesImg"
              />
              <p className="cat_description">
                {category.strCategoryDescription}
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
    </div>
  );
};

export default Categories;
