"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Online} from "../Redux/action/onlineStd.js";
import { useRouter } from 'next/navigation';


const SAF = () => {
    const {online,loading} = useSelector((state) => state.online);
    const[search,setSearch] = useState("");
    const [filteredData,setFilteredData] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    console.log(filteredData)

    useEffect(() => {
        dispatch(Online());
      }, [dispatch])
    
      useEffect(() => {
     const filtered =  online?.data?.filter((item) => {
      const name = item.fname.toLowerCase().includes(search.toLowerCase());
      const email = item.email.toLowerCase().includes(search.toLowerCase());
      return(
        name || email
      )
     })
      setFilteredData(filtered)
      },[search,online])
  
      const goTo = (id) => {
        router.push(`safdetails/?profileId=${id}`);
      };

  return (
    <div className="px-6 md:px-12 mt-20 py-8">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-garet mb-5 ">
        <div className="flex-grow">
        <div className="flex items-center">
            <div className="flex items-center bg-[#182073] justify-center w-10  rounded-tl-lg rounded-bl-lg border-r border-gray-200 p-3">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none w-5  fill-white"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input
              type="text"
              className=" bg-white pl-2 text-base font-semibold outline-0 p-2"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {!loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredData?.map((data, i) => (
        <div key={i} className="w-full flex justify-center">

            <div className="max-w-lg rounded-xl border-2 border-gray-500 bg-white p-6 shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/3 flex flex-col items-center">
                <img 
                  src={data?.profile} 
                  className="object-cover w-28 h-28 rounded-md ring-2 ring-blue-400" 
                  alt="profile"
                />
              </div>
              <div className="w-full sm:w-44 h-44 mt-4 sm:mt-0 sm:pl-2 flex flex-col">
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