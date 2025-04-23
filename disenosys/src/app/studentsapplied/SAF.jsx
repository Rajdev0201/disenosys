"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Online} from "../Redux/action/onlineStd.js";
import { useRouter } from 'next/navigation';


const SAF = () => {
    const {online,loading} = useSelector((state) => state.online);
    console.log(loading)
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        dispatch(Online());
      }, [dispatch])
    
  
      const goTo = (id) => {
        router.push(`safdetails/?profileId=${id}`);
      };

  return (
    <div className="px-6 md:px-12 mt-20">
      {!loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {online?.data?.map((data, i) => (
        <div key={i} className="w-full flex justify-center">

            <div className="max-w-lg rounded-xl border-2 border-gray-500 bg-white p-6 shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/3 flex flex-col items-center">
                <img 
                  src={data?.profile} 
                  className="object-cover w-28 h-28 rounded-md ring-2 ring-blue-400" 
                  alt="profile"
                />
              </div>
              <div className="w-full sm:w-2/3 mt-4 sm:mt-0 sm:pl-2 flex flex-col">
                <div className="space-y-2 text-gray-600 dark:text-gray-300 font-garet">
                <h2 className="mt-3 text-xl font-bold text-indigo-600 dark:text-indigo-400 font-garet">
                  {data?.fname.toUpperCase()}
                </h2>
                  <p><span className="font-medium text-base">ID:</span> {data?.sid}</p>
                  <p className='font-medium text-sm'><span>Phone:</span> {data?.no1}</p>
                </div>

                <div className="mt-2">
                  <button
                    className="rounded-md bg-blue-500 text-white px-4 py-2 transition hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => goTo(data?._id)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
        </div>
      ))}
  </div>
      ): (
        <p className="col-span-4 text-center text-red-500 font-bold flex justify-center items-center min-h-screen font-garet">
                Loading....
        </p>
      )}
</div>


  )
}

export default SAF