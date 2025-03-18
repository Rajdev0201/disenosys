"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProductFromCart,
} from "../Redux/action/addToCart.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckOut, payment } from "../Redux/action/Payment.js";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { setUser } from "../Redux/features/authSlice.js";
import { getAllCarts } from "@/app/Redux/action/addToCart.js";

const CartModal = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pay = useSelector((state) => state.payment);
  const cart = useSelector((state) => state?.currentCart);

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCarts());
    dispatch(payment());
  }, [dispatch]);




  const cartUserName = user?.user?.user?.userName;

  useEffect(() => {
    if (cart?.cartItems?.length > 0 && cartUserName) {
      const total = cart.cartItems.reduce((acc, item) => {
        if (item.userName === cartUserName) {
          return acc + item.price * item.quantity;
        }
        return acc;
      }, 0);
      setTotalPrice(total);
    }
  }, [cart, cartUserName]);

  useEffect(() => {
    if (checkoutSuccess) {
      dispatch(payment());
      setCheckoutSuccess(false);
    }
  }, [checkoutSuccess, dispatch]);

  const handleDelete = (itemId) => {
    if (window.confirm("Do you want to delete this item?")) {
      dispatch(removeProductFromCart(itemId));
    }
  };

  const handlePlaceOrder = async () => {
    if (cart?.cartItems?.length > 0) {
      const UserData = {
        userData: user?.user?.user,
        cartItems: cart.cartItems.filter(
          (item) => item.userName === cartUserName
        ),
      };
      await dispatch(CheckOut(UserData, router));
      setCheckoutSuccess(true);
    } else {
      toast.dark("Your cart is empty, please choose an item", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  const handleIncrementQuantityChange = (cartId) => {
    dispatch(increaseQuantity(cartId));
  };

  const handleDecrementQuantityChange = (cartId) => {
    dispatch(decreaseQuantity(cartId));
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 mt-16 lg:mt-40">
    <h2 className="text-3xl font-medium mb-4 font-garet">Shopping Carts</h2>

    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3 border p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-3 font-sans">
  {cart?.cartItems?.filter(item => item.userName === cartUserName).length} Courses in Cart
</h3>
        <div className="max-h-96 overflow-y-auto border-t">
          {cart?.cartItems?.length > 0 && cartUserName ? (
            cart?.cartItems
              .filter((item) => item.userName === cartUserName)
              .map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-3 border-b"
                >
                  <img
                    src={item.img}
                    className="w-20 h-20 object-cover rounded-md"
                    alt={item.name}
                  />
                  <div className="flex-1 font-garet">
                    <h4 className="font-medium text-xl">{item.name}</h4>
                    <p className="text-gray-500 text-sm">By Faculty Name</p>
                    <span className="text-yellow-500">★★★★★</span>
                    <p className="font-medium text-lg">₹{item.price}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="w-full md:w-1/3 p-4 rounded-md space-y-2">
        <h3 className="text-xl font-semibold mb-2 font-sans">Total:</h3>
        <p className="text-3xl font-bold font-garet">₹ {totalPrice.toLocaleString()}</p>
        <p className="text-gray-500 line-through text-xl font-garet">₹{(totalPrice * 2.5).toLocaleString()}</p>
        <p className="text-green-600 font-semibold font-garet text-md">60% off</p>
        <div className="mt-2 flex flex-row justify-start gap-2 items-center mb-12">
          <input
            type="text"
            placeholder="Coupon code"
            className="px-3 py-2 border rounded-xl bg-gray-100 focus:outline-none"
          />
          <button className="px-2 py-1 lg:px-6 bg-[#0d1039] text-white lg:py-1 rounded shadow-inner text-lg font-garet">
            Apply
          </button>
        </div>
        <div className="mt-12">
        <button
          className="bg-[#0d1039] hover:opacity-90 transition-opacity text-xl font-garet text-white font-medium w-full py-2 rounded mt-4 hover:bg-gray-600 "
          onClick={handlePlaceOrder}
        >
          Checkout
        </button>
        </div>
        {/* Coupon Section */}
      </div>
    </div>
  </div>
  );
};

export default CartModal;
