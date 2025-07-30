"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../component/Pagination.jsx';
import { CourseList } from '../Redux/action/CourseCertificate.js';


const MyCourse = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.coursec);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 20;


  useEffect(() => {
    dispatch(CourseList());
  }, [dispatch]);


  useEffect(() => {
      const filtered = course?.data?.filter((item) => {
        const name = item.name?.toLowerCase().includes(search.toLowerCase());
        //const email = item.email?.toLowerCase().includes(search.toLowerCase());
        const udin = item.Udin?.toLowerCase().includes(search.toLowerCase());
        const course = item.course?.toLowerCase().includes(search.toLowerCase());
 
        return (
          name || udin || course
        );
      });
      setFilteredData(filtered);
    }, [search, course]);
  

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);



  return (
    <div className="p-6 flex flex-col w-full mt-12">
      <h2 className="text-[#182073] font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-1">
        Course-Certificate-List
      </h2>
      
      <div className="flex flex-col md:flex-row justify-between items-center p-5">
        <div className="p-2 flex-grow">
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

      {paginatedData?.length === 0 ? (
        <p className="text-lg text-red-400 text-center">No Data Available.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-slate-200 border-b border-gray-300 text-[#182073]">
              <tr>
                <th className="py-3 px-4 text-center border-r border-[#182073]">S.No</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Name</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Email</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Course</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">UDIN</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Completion</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">created Date</th>
              </tr>
            </thead>
             <tbody>
  {paginatedData?.map((item, index) => {
    return (
      <tr key={item._id} className="border-b border-gray-200">
        <td className="py-3 px-4 text-center text-gray-400">{startIndex + index + 1}</td>
        <td className="py-3 px-4 text-center text-gray-400 w-44">{item.name}</td>
        <td className="py-3 px-4 text-center text-gray-400 w-44">{item.email}</td>
        <td className="py-3 px-4 text-center text-gray-400">{item.course}</td>
        <td className="py-3 px-4 text-center text-gray-400">{item.Udin}</td>
        <td className="py-3 px-4 text-center text-gray-400">{new Date(item.Completion).toLocaleDateString()}</td>
        <td className="py-3 px-4 text-center text-gray-400">
          {new Date(item.createdAt).toLocaleDateString()}
        </td>
      </tr>
    );
  })}
</tbody>


          </table>
        </div>
      )}
      
      {paginatedData?.length > 0 && (
        <div className="w-full mt-4 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default MyCourse;
