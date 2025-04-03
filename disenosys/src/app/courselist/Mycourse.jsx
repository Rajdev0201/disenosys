"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payment } from "../Redux/action/Payment.js";
import { Pagination } from '../component/Pagination.jsx';
import { fetchCourse } from '../Redux/action/Course.js';

const MyCourse = () => {
  const dispatch = useDispatch();
  const pay = useSelector((state) => state.payment);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;
  console.log(pay);
  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);

  useEffect(() => {
    const filtered = pay?.data?.filter((item) =>
      item.mode !== "Offline" && 
      (
        item.customerDetails.name.toLowerCase().includes(search.toLowerCase()) ||
        item.lineItems[0].name.toLowerCase().includes(search.toLowerCase()) ||
        item.sessionId.toLowerCase().includes(search.toLowerCase()) ||
        new Date(item.createdAt).toLocaleDateString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [search, pay]);
  

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleToggle = (id, isActive) => {
    const confirmMessage = isActive
      ? "Do you want to deactivate this course?"
      : "Do you want to activate this course?";
    
    const confirmSubmit = window.confirm(confirmMessage);
    if (confirmSubmit) {
      fetch(`https://disenosys-dkhj.onrender.com/course/toggleCode/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(fetchCourse());
            dispatch(payment()); 
            console.log(data)
          } else {
            alert(data.error);
          }
        })
        .catch((err) => console.log(err));
      }
  };
  


  return (
    <div className="p-6 flex flex-col w-full mt-12">
      <h2 className="text-[#182073] font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-1">
        Online Payments List
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
        <p className="text-lg text-red-400 text-center">No Course Data Available.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-slate-200 border-b border-gray-300 text-[#182073]">
              <tr>
                <th className="py-3 px-4 text-center border-r border-[#182073]">S.No</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Name</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Course Name</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Paid Price</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Order ID</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">Payment Date</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
             <tbody>
  {paginatedData?.map((item, index) => {
    const courseNames = item.lineItems.map(lineItem => lineItem.name).join(', ');
    const totalPrice = item.lineItems.reduce((sum, lineItem) => sum + lineItem.totalPrice, 0);

    return (
      <tr key={item._id} className="border-b border-gray-200">
        <td className="py-3 px-4 text-center text-gray-400">{startIndex + index + 1}</td>
        <td className="py-3 px-4 text-center text-gray-400 w-44">{item.customerDetails.name}</td>
        <td className="py-3 px-4 text-center text-gray-400">{courseNames}</td>
        <td className="py-3 px-4 text-center text-gray-400">{totalPrice}</td>
        <td className="py-3 px-4 text-center text-gray-400">{item.sessionId}</td>
        <td className="py-3 px-4 text-center text-gray-400">
          {new Date(item.createdAt).toLocaleDateString()}
        </td>
        <td className="text-center">
          <button
            className={`relative inline-flex items-center h-6 w-11 rounded-full ${
              item.isActive ? "bg-green-500" : "bg-red-500"
            }`}
            onClick={() => handleToggle(item._id, item.isActive)}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                item.isActive ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
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
