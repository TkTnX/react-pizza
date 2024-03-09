import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { category, sortType, currentPage } = params;
    const pizzaArr = await axios.get(
      `https://82322d706a51e4fa.mokky.dev/pizzas?&limit=4&page=${currentPage}&${category}&sortBy=${sortType}`
    );

    return pizzaArr.data.items;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    items: [],
    status: "loading",
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
