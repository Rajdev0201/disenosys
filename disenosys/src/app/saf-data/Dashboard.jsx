"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Online } from "../Redux/action/onlineStd.js";
import { GrInProgress } from "react-icons/gr";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Pagination } from "../component/Pagination.jsx";
import axios from "axios";
import { courseld } from "../Redux/action/Course.js";

const Dashboard = () => {
  const{online,loading} = useSelector((state) => state.online);
  const {course}= useSelector((state) => state.courseLD);
  const dispatch = useDispatch();
    const [filters, setFilters] = useState({
    course:"",
    status:"",
    name:"",
  });

  // const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [batch,setBatch] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

   const [add, setAdd] = useState({
    batch:"",
    topic:"",
    date:"",
  });

  useEffect(() => {
    dispatch(Online());
    dispatch(courseld());
  }, [dispatch]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

const handleBatchCreate = (e) => {
   const {name , value} = e.target;
   setAdd((prev) => ({
    ...prev,[name]:value
   }));
}

 //const normalize = (str) => str?.toLowerCase().replace(/[\u2010-\u2015\-]/g, '').replace(/\s+/g, '').trim();

  useEffect(() => {
    const {course,status} = filters;
      const noFilters = !course && !status;

  if (noFilters) {
    setFilteredData(online?.data || []);
    return;
  }
    const filtered = online?.data?.filter((item) => {
      // const names = item.fname?.toLowerCase().includes(name.toLowerCase());
      // const mainMatch = item.cname?.toLowerCase().includes(name.toLowerCase());
      
      const subrowMatch = item.subrows?.some((sub) => {
      console.log(sub.cname)
      const courseMatch = sub.cname?.toLowerCase().includes(course?.toLowerCase());
      console.log("course match" ,courseMatch)
      const isYetToStart = !sub.start && !sub.end; 
      const isInProgress = sub.start && !sub.end;
      const isCompleted = sub.start && sub.end;

      let statusMatch = true;
      if (status === "Yet to start") statusMatch = isYetToStart;
      else if (status === "inprogress") statusMatch = isInProgress;
      else if (status === "completed") statusMatch = isCompleted;

      return courseMatch && statusMatch;
    });
      return subrowMatch
    });
    setFilteredData(filtered);
  }, [filters, online]);

  const reset = () => {
    setFilters({
      course:"",
      status:"",
    })
    setFilteredData([]);
    setBatch([]);
  }
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);


 const handlePush = (name, sid, subrows) => {
  const exists = batch.find((b) => b.sid === sid); // Check if already added
  if (exists) {
    // Remove if already exists
    setBatch(batch.filter((b) => b.sid !== sid));
  } else {
    // Add if not exists
    setBatch([...batch, { name,sid,subrows }]);
  }
};

const handleBatch = () => {
  if(batch.length === 0 ){
    return alert("please add student details before create a batch");
  }else {
    setModalOpen(true);
  }
}

const handleBatchSubmit = async (e) => {
      e.preventDefault();
        const payload = {
    ...add,
    students: batch 
  };
      try{
      const res = await axios.post("https://disenosys-dkhj.onrender.com/batch-create",payload);
      if(res.status === 404){
        alert("something went wrong");
        return
      }
      alert(res.data.message);
      setModalOpen(false);
      setBatch([]);
    }catch(err){
      console.log(err)
    }
   
}

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-20 gap-4  font-garet ">
        <div className="flex items-center gap-3">
          <select
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                className="flex items-center bg-gray-200 w-[300px] justify-center rounded-lg border-2 border-blue-500 p-2 outline-none text-gray-800"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {course?.data?.map((item, index) => (
                  <option key={item._id} value={item.course}>
                    {item.course}
                  </option>
                ))}
          </select>
              {/* <div className="flex items-center">
          <div className="flex items-center bg-blue-500 justify-center w-10 rounded-tl-lg rounded-bl-lg border-r border-gray-200 p-3">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none w-5  fill-white"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <input
            name="name"
            type="text"
            className="bg-gray-300 pl-2 text-base font-medium outline-0 p-2  rounded-tr-lg rounded-br-lg "
            placeholder="Search..."
            value={filters.name}
            onChange={handleFilterChange}
          />
               </div> */}
                 <select
                 name="status"
                 value={filters.status}
                 onChange={handleFilterChange}
                 className="flex items-center bg-gray-200 w-[200px] justify-center rounded-lg border-2 border-blue-500 p-2 outline-none text-gray-800"
           >
            <option value="" disabled>Status</option>
            <option value="Yet to start">Yet to start</option>
            <option value="inprogress">Inprogress</option>
            <option value="completed">Completed</option>
          </select>
          <button className="bg-blue-500 text-white px-6 py-2 text-center rounded-md hover:bg-blue-400 translate-x-0" onClick={reset}>Reset</button>
          </div>
    
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleBatch}
        >
          Add batch
        </button>
      </div>
      <div className="px-12  font-garet ">
        {paginatedData?.length === 0 ? (
          <p className="text-lg text-red-500 text-center font-semibold">
            No Students added!.
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            {!loading ? (

            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-blue-500 text-white font-sans">
                <tr>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    S.No
                  </th>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Std-ID
                  </th>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Name
                  </th>

                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Course Name
                  </th>
                  {/* <th className="py-2 px-2 text-start border-r border-gray-300">
                    Contact
                  </th> */}
                  {/* <th className="py-2 px-2 text-start border-r border-gray-300">
                    Email
                  </th> */}
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    All Course
                  </th>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((item, index) => (
                  <>
                    {" "}
                    <tr
                      key={item._id}
                      className={`border-b border-gray-300 ${
                        index % 2 !== 0 ? "bg-blue-50" : "bg-white"
                      }`}
                    >
                      <td className="py-2 px-2 text-start text-gray-600 font-medium flex items-center gap-3">
                        {startIndex + index + 1}. {filters.course ? <input type="checkbox" className="bg-blue-100 rounded-sm text-start" onClick={() => handlePush(item.fname,item.sid,item.subrows)}/> :""}
                      </td>
                      <td className="py-2 px-2  text-start text-gray-600 font-medium">
                        {item.sid}
                      </td>
                      <td className="py-2 px-2  text-start text-gray-600 font-medium">
                        {item.fname}
                      </td>
                      <td className="py-2 px-2  text-start text-gray-600 font-medium">
                        {item.cname}
                      </td>
                      {/* <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        {item.no1}
                      </td> */}
                      {/* <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        {item.email}
                      </td> */}
                      <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => setSelectedStudent(item._id)}
                        >
                          Click Here
                        </button>
                      </td>
                      <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        {item.end !== "Not Completed" ? (
                          <p className="flex items-center justify-center  text-green-500 gap-2">
                            <IoCheckmarkDoneCircleOutline className="w-5 h-5 text-green-500" />{" "}
                          </p>
                        ) : (
                          <p className="flex items-center justify-center text-red-500 gap-2">
                            <GrInProgress className="w-4 h-4 text-red-500" />{" "}
                          </p>
                        )}
                      </td>
                    </tr>
                    {selectedStudent === item._id && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 font-garet">
                         <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 ml-44">
                          <h2 className="text-xl font-semibold mb-4 text-blue-500">
                            All course
                          </h2>
                          <table className="w-full border border-gray-300">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="py-2 px-4 border font-medium text-start">
                                  S.No
                                </th>
                                <th className="py-2 px-4 border font-medium  text-start">
                                  Course Name
                                </th>
                                <th className="py-2 px-4 border font-medium  text-start">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(item?.subrows) && item.subrows.length > 0 ? (
                                item?.subrows?.map((course, index) => (
                                  <tr key={index}>
                                    <td className="py-2 px-4 border text-gray-600">
                                      {startIndex + index + 1}.
                                    </td>
                                    <td className="py-2 px-4 border text-gray-600">
                                      {course.cname}
                                    </td>
                                    <td className="py-2 px-2 text-start border text-gray-600 font-medium">
                                                                {course.end !== "" ? (
                                                                  <p className="flex items-center justify-center text-green-500 gap-2">
                                                                    <IoCheckmarkDoneCircleOutline className="w-5 h-5 text-green-500" />{" "}
                                                                    
                                                                  </p>
                                                                ) : (
                                                                  <p className="flex items-center justify-center text-red-500 gap-2">
                                                                    <GrInProgress className="w-4 h-4 text-red-500" />{" "}
                                                                    
                                                                  </p>
                                                                )}
                                                              </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="py-2 px-4 text-center text-gray-600"
                                  >
                                    No course Added
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>

                          <div className="flex justify-end">
                            <button
                              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 "
                              onClick={() => setSelectedStudent(null)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
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
   

      {paginatedData?.length > 0 && (
        <div className="w-full mt-4 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

            {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ml-44">
          <form onSubmit={(e) => handleBatchSubmit(e)}>
          <div className="bg-white p-6 rounded-md w-[600px]">
            <h2 className="text-lg font-bold mb-3">Add Batch</h2>
            <span className="text-sm text-red-500 font-garet font-medium">
              Batch Name
            </span>
            <input
              type="text"
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
              name="batch"
              placeholder="ex:batch-1"
              onChange={handleBatchCreate}
            />
               <span className="text-sm text-red-500 font-garet font-medium">
             Topic Name
            </span>
           
             <select
                name="topic"
                value={add.topic}
                onChange={handleBatchCreate}
                className="flex items-center bg-gray-200 w-[300px] justify-center rounded-lg border-2 border-blue-500 p-2 outline-none text-gray-800"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {course?.data?.map((item, index) => (
                  <option key={item._id} value={item.course}>
                    {item.course}
                  </option>
                ))}
          </select>
            <span className="text-sm text-red-500 font-garet font-medium ">
              Batch Started date
            </span>
            <input
              type="date"
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
              name="date"
              onChange={handleBatchCreate}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                // onClick={() =>
                //   handleAddSubrow(
                //     document.getElementById("cname").value,
                //     document.getElementById("start").value,
                //     document.getElementById("end").value
                //   )
                // }
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
