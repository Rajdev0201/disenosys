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

    incrementQuantity: (state, action) => {
      // console.log('State before update:', state);
      const cartId = action.payload._id;
      if (Array.isArray(state.items)) {
        const existingItem = state.items.find(item => item._id === cartId);
        if (existingItem) {
          existingItem.quantity++;
          state.totalPrice += existingItem.price;
          // console.log('State after update:', state);
        }
      }
    },
    
    
    decrementQuantity: (state, action) => {
      const cartId = action.payload._id; 
      if (Array.isArray(state.items)) {
        const existingItem = state.items.find(item => item._id === cartId);
        if (existingItem) {
          existingItem.quantity--;
          state.totalPrice -= existingItem.price;
          console.log('State after update:', state);
        }
      }
    }
    
  },
});

export const { addCart, decrementQuantity, incrementQuantity, removeFromCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;
