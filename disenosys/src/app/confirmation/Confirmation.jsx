"use client"
import React, { useEffect, useState } from 'react';
import {useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { CheckOut, freeConsult, takenAmt } from '../Redux/action/consult.js';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';

const Confirmation = () => {
const router = useRouter();
const search = useSearchParams();
const time = search.get("time");
const timezone = search.get("timezone");
const date = search.get("date");
const consult = useSelector((state) => state?.consult?.amt);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(takenAmt())
},[dispatch])

  const formattedDate = date ? dayjs(date).format('MMM D') : '';

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    bookedtime:time,
    timeZone:timezone,
    bookeddate:date,
  });

  const price = consult?.[0]?.amt; 
  const total = parseInt(price) + 5;
  console.log(total)
  const [cartItems, setCartItems] = useState([
    { coursename: "Job Consultation For Freshers In Auto Design", price: total},
  ]);
 

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setUserData({ ...userData, phone });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(price > 0){
    const data = { userData, cartItems };
    dispatch(CheckOut(data));
    }else{
     const data = {userData,cartItems};
     dispatch(freeConsult(data));
     router.push("/")
    }
  };
 
  const change = () => {
    router.push("/consultation")
  }
 


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-10 font-garet">

  <div className="flex items-center mb-4">
    <div className="text-xl text-[#182073] font-semibold">
      Job Consultation For Freshers In Auto Design
    </div>
  </div>

  <p className="text-sm text-gray-600">Video Call | 15mins</p>

  <div className="my-4 p-3 bg-gray-100 rounded-md flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="flex flex-col text-center text-[#182073] border border-gray-300 p-2">
        <p className="font-semibold text-sm">{formattedDate}</p>
      </div>
      <p className="text-sm text-gray-500">{time} (GMT {timezone})</p>
    </div>
    <button className="text-blue-500 font-medium text-sm bg-[#182073] text-white p-2" onClick={change}>Change</button>
  </div>

 
  <form className="space-y-4" onSubmit={handleSubmit}>
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
       type="text"
       name="name"
       value={userData.name}
       onChange={handleInputChange}
        placeholder="Enter your name"
        className="w-full border border-gray-300 p-2 rounded-md"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        className="w-full border border-gray-300 p-2 rounded-md"
        required
      />
    </div>
    <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <PhoneInput
            country={'in'}
            value={userData.phone}
            onChange={handlePhoneChange} // Corrected the handler
            placeholder="Enter your number"
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              className: 'w-[260px] lg:w-[350px] border border-gray-300 p-2 ml-12 rounded-md',
            }}
          />
        </div>
  
   {price > 0 ? (
  <div className="mt-5 p-4 bg-white shadow-md rounded-md">
  <h4 className="text-lg text-[#182073] font-bold mb-4">Order Summary</h4>
  <table className="w-full border-collapse">
    <tbody>
 
      <tr className="border-b">
        <td className="py-2 text-sm text-gray-600">1 x Job Consultation for Freshers in Auto Design</td>
        <td className="py-2 text-sm text-right text-gray-800 font-medium">₹{price}</td>
      </tr>

      <tr className="border-b">
        <td className="py-2 text-sm text-gray-600">Platform Fee</td>
        <td className="py-2 text-sm text-right text-gray-800 font-medium line-through">₹10</td>
      </tr>
  
      <tr className="border-b">
        <td className="py-2 text-sm text-gray-600">Additional Fee</td>
        <td className="py-2 text-sm text-right text-gray-800 font-medium">₹5</td>
      </tr>
   
      <tr>
        <td className="py-2 text-lg font-semibold text-[#182073]">Total</td>
        <td className="py-2 text-lg font-semibold text-right text-[#182073]">₹{total}</td>
      </tr>
    </tbody>
  </table>
 </div>
   ) : ("") 
  }
  <div className="sticky bottom-0 bg-white py-4 flex justify-between items-center shadow-lg border-t border-gray-400 mt-6">
    <div className="text-lg font-semibold">
      {price > 0 ? (
       <span>₹{total}</span>
      ) : <span>Free</span>}
  
      </div>
    <button
      type='submit'
      className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
    >
      Confirm and Pay
    </button>
  </div>
  </form>
</div>

  );
};

export default Confirmation;
