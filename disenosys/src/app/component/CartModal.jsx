"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeProductFromCart } from '../Redux/action/addToCart.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckOut, payment } from "../Redux/action/Payment.js";
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';
import { setUser } from '../Redux/features/authSlice.js'; 

const CartModal = ({ isOpen, setIsOpen, cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pay = useSelector((state) => state.payment);
  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);

  // const paidCourses = pay?.data
  //   ?.filter((item) => item?.customerDetails?.name === user?.user?.user?.userName)
  //   ?.flatMap((item) => item?.lineItems?.map((course) => course?.name)) || [];

  const cartUserName = user?.user?.user?.userName || user?.user?.name || user?.user?.userName; 

  useEffect(() => {
    if (cart?.cartItems?.length > 0 && cartUserName) {
      const total = cart.cartItems.reduce((acc, item) => {
        if (item.userName === cartUserName) {
          return acc + (item.price * item.quantity);
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

  const handleClose = () => setIsOpen(false);

  // const handlePlaceOrder = async () => {
  //   if (cart?.cartItems?.length > 0) {
  //     const UserData = {
  //       userData: user?.user?.user,
  //       cartItems: cart.cartItems.filter(item => item.userName === cartUserName)
  //     };
  //     await dispatch(CheckOut(UserData, router));
  //     setCheckoutSuccess(true); 
  //   } else {
  //     toast.dark('Your cart is empty, please choose an item', {
  //       position: "top-right",
  //       autoClose: 5000,
  //       theme: "light",
  //     });
  //   }
  // };

  const handlePlaceOrder = async () => {
    if (cart?.cartItems?.length > 0) {
      router.push('/cart');
  }
}
const handleIncrementQuantityChange = (cartId) => {
      dispatch(increaseQuantity(cartId))
}

const handleDecrementQuantityChange = (cartId) => {
  dispatch(decreaseQuantity(cartId))
}

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="bg-slate-900/70  backdrop-blur p-4 sm:p-6 md:p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-[#0d1039] p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-xl cursor-default relative overflow-hidden "
          >
            <FiShoppingCart className="text-[#0d1039] rotate-12 text-[100px] sm:text-[150px] md:text-[200px] absolute z-0 -top-12 sm:-top-16 md:-top-24 -left-10 sm:-left-16 md:-left-24" />
             
            <div className="relative z-10 font-garet">
              <div className="bg-blue-500 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2 rounded-full text-xl sm:text-2xl md:text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiShoppingCart className='text-white' />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">Cart</h3>
             
              <div className="text-center mb-6">
              {cart?.cartItems?.length > 0 && cartUserName ? (
    cart?.cartItems
      .filter(item => item.userName === cartUserName) // Only show items for the current user
      .map((item) => (
                      <div key={item._id} className="flex flex-col space-x-2 sm:flex-row justify-between items-center py-2 border-b text-sm sm:text-md md:text-lg">
                        <img src={item.img} className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover' alt={item.name} />
                        <span className="flex-1 text-center sm:text-left font-medium text-sm">{item.name}</span>
                        <span className='text-sm font-medium'>₹{item.price}</span>
                        {/* <span className='text-lg font-semibold '>quantity: {item.quantity}</span> */}
                        <div className="flex items-center">
                <button 
                  className="bg-blue-500 text-white rounded px-2 py-1 mr-2" 
                  onClick={() => handleDecrementQuantityChange(item._id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className='text-sm font-medium'>Quantity: {item.quantity}</span>
                <button 
                  className="bg-blue-500 text-white rounded px-2 py-1 ml-2" 
                  onClick={() => handleIncrementQuantityChange(item._id)} 
                >
                  +
                </button>
              </div>
                        <span className='cursor-pointer text-red-500'>
                          <MdDelete
                            size={30}
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleDelete(item._id)}
                          />
                        </span>
                      </div>
                    ))
                ) : (
                  <p className="text-[#0d1039]">Your cart is empty.</p>
                )}
              </div>

              <div className='flex justify-end items-end mb-4'>
                {totalPrice > 0 ? (
                  <span className='bg-blue-600 p-3 text-white rounded font-bold '>Total: ₹{totalPrice}</span>
                ) : (
                  <span className='bg-blue-600 p-2 rounded text-white'>Total: 0</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleClose}
                  className="bg-transparent hover:bg-white/10 transition-colors text-[#0d1039] font-semibold w-full py-2 rounded"
                >
                  Close
                </button>
                {totalPrice > 0 && (
                  <button
                    className="bg-[#0d1039] hover:opacity-90 transition-opacity text-white font-semibold w-full py-2 rounded"
                    onClick={handlePlaceOrder}
                  >
                   Continue to Checkout
                  </button>
                )}
              </div>
              <FiX
                size={28}
                onClick={handleClose}
                className="absolute -top-5 ring-2 font-bold text-xl p-1 bg-red-500 ring-white rounded-full -right-5 cursor-pointer text-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
