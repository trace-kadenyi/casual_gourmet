import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchCategories } from "../../../Redux/Drinks/drinkscategoriesSlice";
import DrinksNavigation from "../DrinksNavigation/DrinksNavigation";
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
      <DrinksNavigation type="Categories" />
      <h1 className="categories_head drinks_cat_head">Drink Categories</h1>
      <p className="categories_intro_para drinks_cat_head">
        Drinks are a great way to relax and unwind after a long day. Like meals,
        there are numerous categories of drinks available. Want to try your hand
        at mixology from the comfort of your kitchen? Click on any category to
        view multiple recipes for drinks from mocktails to cocktails.
      </p>
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
                onClick={() =>
                  navigate(`/drinks_categories/${category.strCategory}`)
                }
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
