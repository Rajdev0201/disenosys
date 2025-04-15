"use client"
import axios from 'axios';
import {  useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Reset = () => {
    const search = useSearchParams();
    const token = search.get("token");
    console.log(token)
    const router = useRouter();

  const handleChangeReset = async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmpassword")
      .value.trim();
    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }
      if (password.length < 6) {
          return toast.error("Password must be at least 6 characters");
        }
    
        if (password !== confirmPassword) {
          return toast.error("Passwords do not match");
        }
    try{
    const res = await axios.put(`https://disenosys-dkhj.onrender.com/api/v1/user/changePassword/${token}`, {
      password,
      confirmPassword
    });
    if(res.data.success){
      toast.success("Successfully changed password");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }catch(err){
      toast.error(`Error - ${err?.response?.data?.message}`);
  }
  };
    
  return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-garet">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <form className="bg-white p-6 rounded-md shadow-md w-96" onSubmit={handleChangeReset}>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" id="password" name="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="confirmpassword" name="confirmpassword" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Reset Password</button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
             Powered by <span className="font-semibold">Disenosys</span>
            </p>
        </div>
  )
}

export default Reset