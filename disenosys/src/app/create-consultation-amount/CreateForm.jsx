"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice";
import { createAmt, takenAmt } from "../Redux/action/consult";
import { IoIosCloudDone } from "react-icons/io";
import axios from "axios";


const CreateForm = () => {
    const user = useSelector((state) => state?.user);
    const name = user?.user?.user?.userName;
    const dispatch = useDispatch()
    const consult = useSelector((state) => state?.consult?.amt);

     useEffect(() => {
        const storedUser = localStorage.getItem("profile");
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
      }, [dispatch]);

  const [amt, setAmt] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    dispatch(takenAmt())
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amt) {
        return setErr("Please Enter the amount");
    } 
    
    try {
        const res = await axios.post("https://disenosys-dkhj.onrender.com/consult/create-amount", { name, amt });

        if (res.status === 200) {
            alert(`${res.data.message}`);
        }
        dispatch(takenAmt());
        setAmt("");
        setErr("");
    } catch (error) {
        console.error("Error submitting amount:", error);
        setErr("Something went wrong. Please try again.");
    }
};

  return (
    <div className="bg-blue-50  h-screen flex flex-col px-8 py-12 font-garet">
      <h1 className=" text-xl">Create Consultation Amount</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row mt-8 gap-4">
          <input
            className="bg-white border-2 border-gray-200 rounded-md shadow-inner focus:outline-none outline-none p-2"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
            placeholder="Enter Amount"
          />
          <button
            className="bg-blue-500 p-2 rounded-md shadow-inner text-white"
            type="submit"
          >
            Create Amount
          </button>
        </div>
             <p className="text-red-500 text-sm mt-2">{err ? <span>{err}*</span> : " "}</p>

             <div className="mt-10 flex flex-col">
                 <h1 className="text-lg">Recently Created Amount:</h1>
                 {consult?.map((item,i) => (
                  <div key={i} className="flex justify-between items-center p-6 bg-white shdaow-md rounded-lg mt-5">
                    <p>{item?.name}</p>
                    <p>{item?.amt}</p>
                    <IoIosCloudDone className="text-white rounded-full bg-blue-500 cursor-pointer p-1 ring-2" size={30}/>
                  </div>
                  ))}
             </div>
      </form>
    </div>
  );
};

export default CreateForm;
