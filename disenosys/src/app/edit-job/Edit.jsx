"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editJob ,getJob,remove } from "../Redux/action/createJob";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Pagination } from "../component/Pagination";
import Link from "next/link";

const Edit = () => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [editData, seteditData] = useState({ id: "", title: "",location:"",salary:"",type:""});

  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const {jobs,loading} = useSelector((state) => state.jobs);

 
  useEffect(() => {
    const filtered = jobs?.jobs?.filter((item) => {
      const title = item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return title;
    });
    setFilteredData(filtered);
  }, [search, jobs]);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    dispatch(getJob());
  }, [dispatch]);


  const handleDelete = (id) => {
    const confirmSubmit = window.confirm("Do you want to delete the job?");
    if(confirmSubmit){
      dispatch(remove(id))
    }
  }
  const handleEditClick = (id, data) => {
    seteditData({ id, title: data.title,location:data.location,salary:data.salary,type:data.type });
    setShowEditPopup(true);
  };

  const handleEditChange = (e) => {
    const {name, value} = e.target;
    const confirmSubmit = window.confirm("Do you want to edit job?");
    if(confirmSubmit){
        seteditData({ ...editData, [name]: value });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm("Do you want to update job?");
    if (confirmSubmit) {
        dispatch(editJob(editData.id, { title: editData.title ,location: editData.location,salary:editData.salary,type:editData.type}));
    }
    setShowEditPopup(false);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-20 gap-4 font-garet mt-12">
        <div className="flex items-center">
          <div className="flex items-center bg-blue-500 justify-center w-10  rounded-tl-lg rounded-bl-lg border-r border-gray-200 p-3">
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
            className="bg-gray-300 pl-2 text-base font-medium outline-0 p-2  rounded-tr-lg rounded-br-lg "
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link href="/create-job"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          createJob
        </Link>
      </div>

        <div className="px-24  font-garet ">
      {paginatedData?.length === 0 ? (
  <p className="text-lg text-red-500 text-center font-semibold">
    No Jobs Added!.
  </p>
) : (
  <div className="w-full overflow-x-auto">
       {!loading ? (  
         <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-slate-200 border-b border-gray-300 text-[#182073]">
        <tr>
          <th className="py-3 px-4 text-center border-r border-[#182073]">S.No</th>
          <th className="py-3 px-4 text-center border-r border-[#182073]">jobTitle</th>
          <th className="py-3 px-4 text-center border-r border-[#182073]">CompanyName</th>
          <th className="py-3 px-4 text-center border-r border-[#182073]">
                  Created Date
         </th>
            
         <th className="py-3 px-4 text-center">
             Action
         </th>
        </tr>
      </thead>
      <tbody>
        {paginatedData?.map((item, index) => (
          <tr
            key={item._id}
            className='border-b border-gray-200'
          >
            <td className="py-3 px-4 text-center text-gray-600 font-medium">
              {startIndex + index + 1}.
            </td>
            <td className="py-3 px-4 text-center text-gray-600 font-medium">
              {item.title}
            </td>
            <td className="py-3 px-4 text-center text-gray-600 font-medium">
              {item.companyName}
            </td>
            <td className="py-3 px-4 text-center text-gray-600 font-medium">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
         </td>
         <div className="flex justify-center items-center">
         <td className="py-3 px-2 text-gray-600 font-medium hover:cursor-pointer" onClick={() => handleEditClick(item._id, item)}><CiEdit className="text-gray-500 w-6 h-6" /></td>
         <td className="py-3 px-2 text-gray-600 font-medium hover:cursor-pointer" onClick={() => handleDelete(item._id)}><RiDeleteBin5Line className="text-red-500 w-6 h-6"/></td>
         </div>
          </tr>
        ))}
      </tbody>
    </table>
        ) : (
          <span className="text-lg flex justify-center min-h-screen text-green-500 font-semibold">
          Loading ....
          </span>
        )}
  </div>
)}
</div>

       {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg  w-[500px] space-y-2">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <input type="text" value={editData.title} onChange={handleEditChange} className="border p-2 w-full rounded" />
            <input type="text" value={editData.location} onChange={handleEditChange} className="border p-2 w-full rounded" />
            <input type="text" value={editData.salary} onChange={handleEditChange} className="border p-2 w-full rounded" />
            <input type="text" value={editData.type} onChange={handleEditChange} className="border p-2 w-full rounded" />
            <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-red-500 rounded text-white px-4 py-2 mt-4"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
            <button className="bg-blue-500 rounded text-white px-4 py-2 mt-4" onClick={handleUpdate}>
              Update Course
            </button>
            </div>
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

export default Edit;
