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
  // console.log(pay.data.message);
  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);

  useEffect(() => {
    const filtered = pay?.data?.filter((item) => {
      return (
        item.customerDetails.name.toLowerCase().includes(search.toLowerCase()) ||
        item.lineItems[0].name.toLowerCase().includes(search.toLowerCase()) ||
        item.sessionId.toLowerCase().includes(search.toLowerCase()) ||
        new Date(item.createdAt).toLocaleDateString().toLowerCase().includes(search.toLowerCase())
      );
    });
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
      fetch(`https://disenosys-1.onrender.com/course/toggleCode/${id}`, {
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
        My Courses
      </h2>
      
      <div className="flex justify-between items-center p-5">
        <div className="p-2 flex-grow">
          <input
            type="text"
            className="bg-white pl-2 text-base font-semibold outline-0 p-2"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
              {paginatedData?.map((item, index) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center text-gray-400">{startIndex + index + 1}</td>
                  <td className="py-3 px-4 text-center text-gray-400">{item?.customerDetails?.name}</td>
                  <td className="py-3 px-4 text-center text-gray-400">{item.lineItems[0].name}</td>
                  <td className="py-3 px-4 text-center text-gray-400">{item.lineItems[0].totalPrice}</td>
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
              ))}
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
