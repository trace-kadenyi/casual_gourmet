import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchCategories } from "../../../Redux/Drinks/drinkscategoriesSlice";
import "./drinks_categories.css";

const DrinksCategories = () => {
  const { categories, loading } = useSelector(
    (state) => state.drinksCategories
  );
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
    <div className="drinks_categories_sect">
      <h1 className="categories_head">Drinks Categories</h1>
      <div className="drinks_categories_mainDiv">
        {loading ? (
          <h1 className="search_found">Loading...</h1>
        ) : (
          categories.map((category, index) => (
            <div key={index} className="drinks_categories_div">
              <button
                className={`drinks_categories_btn ${assignClass(
                  category.strCategory
                )}`}
                onClick={() => navigate(`/drinks/${category.strCategory}`)}
              >
                {category.strCategory}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DrinksCategories;
