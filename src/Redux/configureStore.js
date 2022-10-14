import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./Meals/categoriesslice";
import cocktailsReducer from "./Drinks/cocktailslice";
import regularDrinksReducer from "./Drinks/regularDrinksSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  mealsCategories: categoriesReducer,
  cocktails: cocktailsReducer,
  regularDrinks: regularDrinksReducer,
  middleware: [thunk],
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
