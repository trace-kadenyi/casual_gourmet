import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./Meals/categoriesslice";
import categoryReducer from "./Meals/individual_category_slice";
import cocktailsReducer from "./Drinks/cocktailslice";
import regularDrinksReducer from "./Drinks/regularDrinksSlice";
import areasReducer from "./Meals/areaslice";
import drinksCategoryReducer from "./Drinks/drinkscategoriesSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  mealsCategories: categoriesReducer,
  mealsCategory: categoryReducer,
  cocktails: cocktailsReducer,
  regularDrinks: regularDrinksReducer,
  areas: areasReducer,
  drinksCategories: drinksCategoryReducer,
  middleware: [thunk],
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
