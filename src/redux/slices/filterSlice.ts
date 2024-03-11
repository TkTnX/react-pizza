import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type filterSliceType = {
  name: string;
  sortProp: string;
};

interface filterSliceState {
  searchValue: string;
  categoryId: number;
  sort: filterSliceType;
  currentPage: number;
}

const initialState: filterSliceState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности (↑)",
    sortProp: "rating",
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortId: (state, action: PayloadAction<filterSliceType>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSortId, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
