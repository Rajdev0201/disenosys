"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { payment } from '../Redux/action/Payment';
import { setUser } from '../Redux/features/authSlice';

const History = () => {
    const pay = useSelector((state) => state.payment);
    const dispatch = useDispatch();
    let startindex = 1;
   console.log(pay)
    useEffect(() => {
        dispatch(payment());
      }, [dispatch]);

 
   const user = useSelector((state) => state?.user);
   const total = pay.data
   ?.filter((item) => item.customerDetails.name === user?.user?.user?.userName)
   ?.map((item) => 
     item.lineItems.reduce((acc, curr) => acc + curr.price, 0)
   ).reduce((acc,cur) => acc + cur,0)
 
   const getyear = new Date().getFullYear();
//    const getmonth = new Date().getMonth();
    const getmonthname = new Date().toLocaleString('default', { year: "numeric",
        month: "long",
        day: "2-digit", });
   
   useEffect(() => {
     const storedUser = localStorage.getItem("profile");
     if (storedUser) {
       // Dispatch action to update Redux with localStorage data
       dispatch(setUser(JSON.parse(storedUser)));
     }
   }, [dispatch]);

  return (
    <div className='bg-[#FAFBFF] mt-32 lg:px-44 lg:py-32'>
              <div className='grid grid-cols-12 gap-2 font-garet mx-auto container'>
               <div className='flex flex-col font-garet col-span-12 lg:col-span-9'>
                <h1 className='text-2xl text-[#0D1039] font-bold text-center lg:text-start'>Purchase History</h1>
               <table className='bg-gray-200 rounded-xl shadow-inner lg:p-6 mt-5 w-full overflow-x-auto'>
                    <thead className='border-b-2 border-white'>
                    <tr className='px-6 py-2'>
                        <th className='px-2 py-1 text-lg font-bold text-center border-r-2 border-white'>S.no</th>
                        <th className='px-2 lg:px-12 py-1 text-lg font-bold text-start  border-r-2 border-white'>Course Name</th>
                        <th className='px-2 py-1 text-lg font-bold text-center  border-r-2 border-white'>Amount</th>
                        <th className='px-2 py-1 text-lg font-bold text-center'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pay.data?.map((item, index) => (
                        item.customerDetails.name ===  user?.user?.user?.userName && (
                        item.lineItems.map((item,ind) => (
                    <tr key={ind} className='border-b-2 border-white hover:bg-white'>
                        <td className='px-2 py-2 text-md font-medium text-center  border-r-2 border-white'>{startindex ++}</td>
                        <td className='px-2 lg:px-12 py-2 text-md font-medium text-start  border-r-2 border-white'>{item.name}</td>
                        <td className='px-2 py-2 text-md font-medium text-center  border-r-2 border-white'>{item.price}</td>
                        <td className='px-2 py-2 text-md font-medium text-center'>
                        <span className='bg-green-300 px-6 py-2 mb-2 rounded-full shadow-inner text-gray-500'>Paid</span>
                        </td>
                    </tr>
                        )
                    ))
                    ))}
                    </tbody>
               </table>
                </div>
              <div className='flex flex-col lg:mx-12 gap-2 col-span-12 lg:col-span-3 mt-12'>
                <div className='bg-[#DCFAED] p-4 rounded-lg shadow-inner flex flex-col lg:w-[300px] lg:h-[130px]'>
                    <h1 className='text-xl text-[#0D1039] font-bold'>Total Purchase</h1>
                    <p className='text-lg text-[#0EAD69] font-bold'>₹{total}</p>
                    <span className='text-sm'>{`as of ${getmonthname}`}</span>
                </div>

                {/* <div className='bg-[#F5F6F8] p-4 rounded-lg shadow-inner flex flex-col w-[300px] h-[130px]'>
                    <h1 className='text-xl text-[#0D1039] font-bold'>Pending Purchase</h1>
                    <p className='text-lg text-[#1DB7C2] font-bold'>₹430.00</p>
                    <span className='text-sm'>as of 01-December 2022</span>
                </div> */}

              </div>
              </div>
       </div>
  )
}

export default History