import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.items = action.payload;
    },

    removeFromCart: (state, action) => {
      state.items = action.payload;
    },

    // incrementQuantity: (state, action) => {
    //   const courseId = action.payload;
    //   const existingItem = state.items.find(item => item.courseId === courseId);
    //   if (existingItem) {
    //     existingItem.quantity++;
    //     state.totalPrice += existingItem.price;
    //   }
    // },

    // decrementQuantity: (state, action) => {
    //   const courseId = action.payload;
    //   const existingItem = state.items.find(item => item.courseId === courseId);
    //   if (existingItem && existingItem.quantity > 1) {
    //     existingItem.quantity--;
    //     state.totalPrice -= existingItem.price;
    //   }
    // }
  },
});

export const { addCart, decrementQuantity, incrementQuantity, removeFromCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;
