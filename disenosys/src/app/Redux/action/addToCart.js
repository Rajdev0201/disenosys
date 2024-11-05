"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCart, decrementQuantity, incrementQuantity, removeFromCart } from '../features/addToCartSlice';
import {setCart} from "../features/currentCartSlice.js"
import { payment } from './Payment';

export const addProductToCart = (cart) => async (dispatch) => {
    try {
        const response = await axios.post('https://disenosys-1.onrender.com/api/v1/addCart', cart);
        const { cartItem } = response.data;
        dispatch(addCart(cartItem));
        dispatch(getAllCarts());
        dispatch(payment());
        toast.info('course added in your cart!', {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
            });
    } catch (err) {
        toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
        });
    }
};

export const removeProductFromCart = (cartId) => async (dispatch) => {
    try {
        await axios.delete(`https://disenosys-1.onrender.com/api/v1/cart/${cartId}`);
        dispatch(removeFromCart(cartId));
        dispatch(getAllCarts())
    } catch (error) {
        console.error('Error removing product from cart:', error);
    }
};

// export const increaseQuantity = (cartId) => async (dispatch) => {
//     try {
//         const response = await axios.patch(`http://localhost:8000/api/v1/cart/${cartId}/increament`);
//         const updatedItem = response.data;
//         dispatch(incrementQuantity(updatedItem));
//         dispatch(getAllCarts());
//     } catch (error) {
//         console.error('Error increasing quantity:', error);
//     }
// };


// export const decreaseQuantity = (cartId) => async (dispatch) => {
//     try {
//         const response = await axios.patch(`http://localhost:8000/api/v1/cart/${cartId}/decreament`);
//         const updatedItem = response.data;
//         dispatch(decrementQuantity(updatedItem));
//         dispatch(getAllCarts());
//     } catch (error) {
//         console.error('Error decreasing quantity:', error);
//     }
// };


export const getAllCarts = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-1.onrender.com/api/v1/getCart");
        const getCart = res.data;
        dispatch(setCart(getCart));
    } catch (error) {
        console.error('Error decreasing quantity:', error);
    }
}