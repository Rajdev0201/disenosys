"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Online } from "../Redux/action/onlineStd.js";
import { useRouter } from 'next/navigation';
import Image from 'next/image.js';

const SAF = () => {
    const online = useSelector((state) => state.online);
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        dispatch(Online());
      }, [dispatch])
    
  
      const goTo = (id) => {
        router.push(`safdetails/?profileId=${id}`);
      };

  return (
    <div className="px-6 md:px-12 mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {online?.data?.length ? (
      online?.data?.map((data, i) => (
        <div key={i} className="flex justify-start">
          <div className="w-72 rounded-xl border-2 border-gray-500 bg-white p-6 text-center shadow-md dark:bg-gray-800 dark:border-gray-700">
            <figure className="mx-auto flex items-center justify-center rounded-full mb-4">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-person-fill text-white dark:text-indigo-300"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg> */}
              <img src={data?.profile} className='object-cover w-28  ring-2 ring-blue-400  rounded-full' alt='profile'/>
              <figcaption className="sr-only">{data?.fname}, Profile</figcaption>
            </figure>

            <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {data?.fname.toUpperCase()}
            </h2>

 
            <div className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
              <p><span className="font-medium text-base">ID:</span> {data?.sid}</p>
              <p><span className="font-medium text-base">Phone:</span> {data?.no1}</p>
              {/* <p><span className="font-medium text-base">Course:</span> {data?.cname}</p> */}
            </div>

    
            <div className="mt-6 flex items-center justify-center space-x-4">
              <button
                className="rounded-md bg-blue-500 text-white px-4 py-2 transition hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => goTo(data?._id)}
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="col-span-4 text-center text-gray-500 mt-12">
        No matching profiles found.
      </p>
    )}
  </div>
</div>

  )
}

export default SAF