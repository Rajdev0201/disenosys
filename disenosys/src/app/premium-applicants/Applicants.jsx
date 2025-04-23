"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../component/Pagination.jsx';
import { InternList } from '../Redux/action/internCertificate.js';
import { PremiumList } from '../Redux/action/createJob.js';
import { BsViewList } from 'react-icons/bs';


const MyCourse = () => {
  const dispatch = useDispatch();
  const {premium,loading} = useSelector((state) => state.jobs); 
  console.log(premium)
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 20;
  const [viewModal, setViewModal] = useState(false);
  const [resumeModal, setResumeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  

  
    useEffect(() => { 
      dispatch(PremiumList())
    },[dispatch]);


  useEffect(() => {
      const filtered = premium?.filter((item) => {
        const name = item.name?.toLowerCase().includes(search.toLowerCase());
        const email = item.email?.toLowerCase().includes(search.toLowerCase());
 
        return (
          name || email
        );
      });
      setFilteredData(filtered);
    }, [search, premium]);
  

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
 


  return (
    <div className="p-6 flex flex-col w-full mt-12">
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
           
        {loading && <span className="text-center text-red-500 font-bold flex justify-center items-center min-h-screen font-garet">Loading...</span>}   
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
                <th className="py-3 px-4 text-center border-r border-[#182073]">Job Applied</th>
                <th className="py-3 px-4 text-center border-r border-[#182073]">created Date</th>
                <th className="py-3 px-4 text-center ">Action</th>
              </tr>
            </thead>
             <tbody>
  {paginatedData?.map((item, index) => {
    return (
      <tr key={item._id} className="border-b border-gray-200">
        <td className="py-3 px-4 text-center text-gray-400">{startIndex + index + 1}</td>
        <td className="py-3 px-4 text-center text-gray-400 w-44">{item.name}</td>
        <td className="py-3 px-4 text-center text-gray-400 w-44">{item.email}</td>
        <td className="py-3 px-4 text-center text-gray-400 w-44">{item.title}</td>
        <td className="py-3 px-4 text-center text-gray-400">
          {new Date(item.createdAt).toLocaleDateString()}
        </td>
        <td className="py-3 px-4 text-center">
  <button
    onClick={() => {
      setSelectedUser(item); // select user
      setViewModal(true);    // open view modal
    }}
    className="text-blue-500 hover:text-blue-700"
  >
    <BsViewList/>
  </button>
</td>
      </tr>
    );
  })}
</tbody>


          </table>
        </div>
      )}
      
      {viewModal && selectedUser && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Details</h2>
        <button onClick={() => setViewModal(false)} className="text-red-500 text-xl font-bold">×</button>
      </div>
      <table className="w-full text-sm text-left border border-gray-300">
        <tbody>
          {Object.entries(selectedUser).slice(0, 10).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="font-medium capitalize px-3 py-2 w-1/3">{key}</td>
              <td className="px-3 py-2 break-words">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-center">
        <button
          onClick={() => setResumeModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Resume
        </button>
      </div>
    </div>
  </div>
)}

{resumeModal && (
  <div className="fixed inset-0 z-[60] bg-black bg-opacity-60 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg w-[90%] h-[90%] overflow-hidden relative">
      <button
        onClick={() => setResumeModal(false)}
        className="absolute top-2 right-4 text-red-500 text-xl font-bold"
      >
        ×
      </button>
      <iframe
        src={selectedUser.resume}
        title="Resume"
        className="w-full h-full"
      ></iframe>
    </div>
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
