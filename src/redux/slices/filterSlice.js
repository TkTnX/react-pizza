import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchValue: "",
    categoryId: 0,
    sort: {
      name: "популярности (↑)",
      sortProp: "rating",
    },
    currentPage: 1,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
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

export const selectFilter = (state) => state.filter;
export const selectFilterSort = (state) => state.filter.sort;

export const { setCategoryId, setSortId, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
