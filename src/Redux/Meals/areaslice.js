import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

export const fetchAreas = createAsyncThunk("areas/fetchAreas", async () => {
  const response = await axios.get(BASE_URL);
  return response.data.meals;
}
);

const areasSlice = createSlice({
  name: "areas",
  initialState: {
    areas: [],
    loading: false,
  },
  extraReducers: {
    [fetchAreas.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAreas.fulfilled]: (state, action) => {
      state.loading = false;
      state.areas = action.payload;
    },
    [fetchAreas.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export default areasSlice.reducer;