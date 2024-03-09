import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
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
      state.totalPrice = state.products.reduce((sum, obj) => {
        return (obj.price + sum) * obj.count;
      }, 0);
    },

    minusItem: (state, action) => {
      const findItem = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        findItem.count--;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }

      if (findItem.count <= 0) {
        state.products.splice(findItem, 1);
      }
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearProducts: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCartItem = (id) => (state) =>
  state.cart.products.find((obj) => obj.id === id);
export const selectCartProducts = (state) => state.cart.products;
export const selectCart = (state) => state.cart;

export const { addProduct, removeProduct, minusItem, clearProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
