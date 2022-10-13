import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCocktails } from "../../Redux/Drinks/cocktailslice";
import "./drinks.css";

const Cocktails = () => {
  const { cocktails, loading } = useSelector(
    (state) => state.cocktails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCocktails());
  }, []);

  return (
    <div>
      <h1 style={{ textDecoration: "underline", color: "red" }}>
        Cocktails
      </h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        cocktails.map((cocktails) => (
          <div key={cocktails.idDrink}>
            <h1>{cocktails.strDrink}</h1>
            <img
              src={cocktails.strDrinkThumb}
              alt={cocktails.strDrink}
              className="cocktailsImg"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Cocktails;
