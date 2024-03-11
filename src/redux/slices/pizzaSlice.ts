import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

type fetchPizzasParams = Record<string, string>;

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: fetchPizzasParams) => {
    const { category, sortType, currentPage } = params;
    const pizzaArr = await axios.get(
      `https://82322d706a51e4fa.mokky.dev/pizzas?&limit=4&page=${currentPage}&${category}&sortBy=${sortType}`
    );

    return pizzaArr.data.items as PizzaItem[];
  }
);

type PizzaItem = {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface pizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
