"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTeacher, removeTeacher, teacher} from "../Redux/action/teacher.js";
import { AiOutlineClose } from "react-icons/ai";
import { courseld } from "../Redux/action/Course.js";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Pagination } from "../component/Pagination.jsx";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const History = () => {
  const [showPopup, setShowPopup] = useState(false);
 const {course} = useSelector((state) => state.courseLD);
  const dispatch = useDispatch();
  const [add, setAdd] = useState({
      name: "",
      email:"",
      phone:"",
      exp:"",
      subject:"",
    });
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [editteacher, setEditteacher] = useState({ id: "", name: "",
    email:"",
    phone:"",
    exp:"",
    subject:"", 
  });
 
   const itemsPerPage = 10;
    const {teach,loading,error} = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(teacher());
    dispatch(courseld());
  }, [dispatch]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  
    useEffect(() => {
      const filtered = teach?.data?.filter((item) => {
        const name = item.name
          ?.toLowerCase()
          .includes(search.toLowerCase());
          const email = item.email
          ?.toLowerCase()
          .includes(search.toLowerCase());
          const phone = item.phone
          ?.toLowerCase()
          .includes(search.toLowerCase());
          const exp = item.exp
          ?.toLowerCase()
          .includes(search.toLowerCase());
          const subject = item.subject
          ?.toLowerCase()
          .includes(search.toLowerCase());
        return name || email || phone || exp || subject;
      });
      setFilteredData(filtered);
    }, [search, teach]);
  
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData?.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    const handlePageChange = (page) => setCurrentPage(page);

  const handleChange = (e) => {
    if (typeof e === 'string') {
      setAdd((prev) => ({
        ...prev,
        phone: e, 
      }));
    } else {
      const { name, value } = e.target;
      setAdd((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDelete = (id) => {
      const confirmSubmit = window.confirm("Do you want to delete the course?");
      if(confirmSubmit){
        dispatch(removeTeacher(id));
        dispatch(teacher());
      }
    }

    const handleEditClick = (id,name,email,phone,exp,subject) => {
      setEditteacher({ id,name,email,phone,exp,subject });
      setShowEditPopup(true);
    };
  
    const handleEditChange = (e) => {
      if (typeof e === 'string') {
        // Phone input passes only value, update phone number
        setEditteacher((prev) => ({
          ...prev,
          phone: e, // Update phone field directly
        }));
      } else {
        // Handle regular text inputs
        const { name, value } = e.target;
        setEditteacher((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };
  
    const handleUpdate = (e) => {
      e.preventDefault();
      dispatch(editTeacher(editteacher.id, { name: editteacher.name,email:editteacher.email,phone:editteacher.phone,exp:editteacher.exp,subject:editteacher.subject }));
      dispatch(teacher());
      setShowEditPopup(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("https://disenosys-dkhj.onrender.com/ld/teacheradd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(add),
        });
  
        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Something went wrong");
          return;
        }
  
        if (data.success) {
          dispatch(teacher());
        }
        alert("Teachers Added SuccsessFully!..");
      } catch (error) {
        console.error(error);
        alert("Teachers added data is failed");
      }
      setShowPopup(false);
    };

  return (
    <div>
      <h2 className="text-[#0d1039] font-medium text-4xl text-center font-garet mb-1 mt-5">
        Teachers
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-20 gap-4  font-garet ">
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          Add Teacher
        </button>
      </div>

       <div className="px-3  font-garet ">
           {paginatedData?.length === 0 ? (
       <p className="text-lg text-red-500 text-center font-semibold">
         No Teachers added!.
       </p>
     ) : (
       <div className="w-full overflow-x-auto">
   {!loading ? (        
         <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
           <thead className="bg-blue-500 text-white font-sans">
             <tr>
               <th className="py-3 px-4 text-start border-r border-gray-300">S.No</th>
               <th className="py-3 px-4 text-start border-r border-gray-300">Name</th>
               <th className="py-3 px-4 text-start border-r border-gray-300">Email</th>
               <th className="py-3 px-4 text-start border-r border-gray-300">Phone</th>
               <th className="py-3 px-4 text-start border-r border-gray-300">Experience</th>
               <th className="py-3 px-4 text-start border-r border-gray-300">Subject</th>
               <th className="py-3 px-4 text-start border-r border-gray-300">
                       Created Date
              </th>
                 
              <th className="py-3 px-4 text-center border-r border-gray-300">
                  Action
              </th>
             </tr>
           </thead>
        
           <tbody>
             {paginatedData?.map((item, index) => (
               <tr
                 key={item._id}
                 className={`border-b border-gray-300 ${
                   index % 2 !== 0 ? "bg-blue-50" : "bg-white"
                 }`}
               >
                 <td className="py-3 px-4 text-start text-gray-600 font-medium">
                   {startIndex + index + 1}.
                 </td>
                 <td className="py-3 px-4 text-start text-gray-600 font-medium">
                   {item.name}
                 </td>
                 <td className="py-3 px-4 text-start  text-gray-600 font-medium">
                   {item.email}
                 </td>
                 <td className="py-3 px-4 text-start  text-gray-600 font-medium">
                   {item.phone}
                 </td>
                 <td className="py-3 px-4 text-start  text-gray-600 font-medium">
                   {item.exp}
                 </td>
                 <td className="py-3 px-4 text-start w-72 text-gray-600 font-medium">
                   {item.subject}
                 </td>
                 <td className="py-3 px-4  text-start text-gray-600 font-medium">
                         {item.createdAt
                           ? new Date(item.createdAt).toLocaleDateString()
                           : "N/A"}
              </td>
              <div className="flex justify-center items-center">
              <td className="py-3 px-2 text-gray-600 font-medium hover:cursor-pointer" onClick={() => handleEditClick(item._id, item.name,item.email,item.phone,item.exp,item.subject)}><CiEdit className="text-gray-500 w-6 h-6" /></td>
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

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative animate-slide-up ml-44 ">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPopup(false)}
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Add Teachers
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter FullName"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
              />

            <PhoneInput
            country={'in'}
            value={add.phone}
            onChange={handleChange} 
            placeholder="Enter your number"
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              className: 'w-[260px] lg:w-[406px] border border-gray-300 p-2 ml-12 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500',
            }}
          />

              <input
                type="text"
                name="exp"
                placeholder="Total Year of Experience"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
              />

              <select
               name="subject"
                value={add.subject}
                onChange={handleChange}
               className="border p-2 w-full text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select Subject
                </option>
                {course?.data?.map((item, index) => (
                  <option key={item._id} value={item.course}>
                    {item.course}
                  </option>
                ))}
              </select>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-[#0f165a] transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
          <div className="bg-white p-6 rounded-lg ml-44 w-[500px] space-y-4">
            <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>
            <input type="text" name = "name" value={editteacher.name} onChange={handleEditChange} className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name = "email" value={editteacher.email} onChange={handleEditChange} className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <PhoneInput
            country={'in'}
            value={editteacher.phone} 
            onChange={handleEditChange}
            placeholder="Enter your number"
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              className: 'w-[260px] lg:w-[406px] border border-gray-300 p-2 ml-12 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            }}
          />
            <input type="text" name = "exp" value={editteacher.exp} onChange={handleEditChange} className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <select
               name="subject"
                value={editteacher.subject}
                onChange={handleEditChange}
               className="border p-2 w-full text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select Subject
                </option>
                {course?.data?.map((item, index) => (
                  <option key={item._id} value={item.course}>
                    {item.course}
                  </option>
                ))}
              </select>
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

export default History;
