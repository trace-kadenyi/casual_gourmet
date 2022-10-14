import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

export const fetchRegularDrinks = createAsyncThunk(
  "regularDrinks/fetchRegularDrinks",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data.drinks;
  }
);

const regularDrinkSlice = createSlice({
  name: "regularDrinks",
  initialState: {
    regularDrinks: [],
    loading: false,
  },
  extraReducers: {
    [fetchRegularDrinks.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchRegularDrinks.fulfilled]: (state, action) => {
      state.loading = false;
      state.regularDrinks = action.payload;
    },
    [fetchRegularDrinks.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default regularDrinkSlice.reducer;
