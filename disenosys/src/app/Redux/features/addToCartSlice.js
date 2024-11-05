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
      const cartId = action.payload._id; // Get the correct ID from the payload
      const existingItem = state.items.find(item => item._id === cartId);
      if (existingItem) {
        existingItem.quantity++;
        state.totalPrice += existingItem.price;
      }
    },
    
    decrementQuantity: (state, action) => {
      const cartId = action.payload._id; // Get the correct ID from the payload
      const existingItem = state.items.find(item => item._id === cartId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalPrice -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        // Optionally handle the removal of the item from the cart if needed
      }
    }
    
  },
});

export const { addCart, decrementQuantity, incrementQuantity, removeFromCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;
