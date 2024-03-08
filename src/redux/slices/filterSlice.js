import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categoryId: 0,
    sort: {
      name: "популярности (↑)",
      sortProp: "rating",
    },
    currentPage: 1,
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortId: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortId, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
