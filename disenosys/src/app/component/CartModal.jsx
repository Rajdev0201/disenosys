"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart } from '../Redux/action/addToCart.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckOut, payment } from "../Redux/action/Payment.js";
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';

const CartModal = ({ isOpen, setIsOpen, cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pay = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);

  const paidCourses = pay?.data?.flatMap(item => item?.lineItems.map(course => course.name)) || [];

  useEffect(() => {
    const total = cart?.cartItems?.filter(item => !paidCourses.includes(item.name))
      .reduce((acc, item) => acc + item.totalPrice, 0);
    
    setTotalPrice(total);
  }, [cart, paidCourses]);

  const handleDelete = (itemId) => {
    const confirmSubmit = window.confirm("Do you want to delete the code?");
    if(confirmSubmit) {
      dispatch(removeProductFromCart(itemId));
    }
  };

  const handleClose = () => setIsOpen(false);

  const UserData = {
    userData: user?.user?.user,
    cartItems: cart?.cartItems
  };

  const handlePlaceOrder = () => {
    if(cart?.cartItems?.length > 0) {
      console.log("UserData before dispatching:", UserData);
      dispatch(CheckOut(UserData, router));
    } else {
      toast.dark('Your cart is empty, please choose any item', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="bg-slate-900/70 backdrop-blur p-4 sm:p-6 md:p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#182073] to-indigo-600 text-white p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-md shadow-xl cursor-default relative overflow-hidden"
          >
            <FiShoppingCart className="text-white/10 rotate-12 text-[100px] sm:text-[150px] md:text-[200px] absolute z-0 -top-12 sm:-top-16 md:-top-24 -left-10 sm:-left-16 md:-left-24" />
             
            <div className="relative z-10">
              <div className="bg-white w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2 rounded-full text-xl sm:text-2xl md:text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiShoppingCart className='text-[#182073]' />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">Cart</h3>
              <div className="text-center mb-6">
                {cart?.cartItems?.length > 0 ? (
                  cart?.cartItems?.filter(item => !paidCourses.includes(item.name)) // Exclude paid courses
                    .map((item) => (
                      <div key={item._id} className="flex flex-col space-x-2 sm:flex-row justify-between items-center py-2 border-b text-sm sm:text-md md:text-lg">
                        <img src={item.img} className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover' alt={item.name} />
                        <span className="flex-1 text-center sm:text-left font-bold">{item.name}</span>
                        <span className='text-lg font-semibold font-poppins'>₹{item.price}</span>
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
                  <p className="text-white">Your cart is empty.</p>
                )}
              </div>
              <div className='flex justify-end items-end mb-4'>
                {totalPrice > 0 ? (
                  <span className='bg-blue-600 p-3 text-white rounded font-bold font-poppins'>Total: ₹{totalPrice}</span>
                ) : (
                  <span className='bg-blue-600 p-2 rounded text-white'>Total: 0</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleClose}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Close
                </button>
                {totalPrice > 0 && (
                  <button
                    className="bg-[#182073] hover:opacity-90 transition-opacity text-white font-semibold w-full py-2 rounded"
                    onClick={handlePlaceOrder}
                  >
                    Checkout
                  </button>
                )}
              </div>
              <FiX
                size={24}
                onClick={handleClose}
                className="absolute top-4 right-4 cursor-pointer text-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
