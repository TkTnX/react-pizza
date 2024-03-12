import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getLSProducts } from "../../utils/getLocalStorageProducts";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  products: CartItem[];
}

const { items, totalPrice } = getLSProducts();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  products: items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.products);
    },

    minusItem: (state, action: PayloadAction<{ id: number }>) => {
      const findItem = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        findItem.count--;
      }
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
      state.totalPrice = calcTotalPrice(state.products);
    },
    clearProducts: (state) => {
      state.products = [];
      state.totalPrice = 0;
      localStorage.clear();
    },
  },
});

export const selectCartItem = (id: number) => (state: RootState) =>
  state.cart.products.find((obj) => obj.id === id);
export const selectCartProducts = (state: RootState) => state.cart.products;
export const selectCart = (state: RootState) => state.cart;

export const { addProduct, removeProduct, minusItem, clearProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
