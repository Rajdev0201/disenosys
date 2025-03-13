"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Online } from "../Redux/action/onlineStd.js";
import { courseld } from "../Redux/action/Course";
import { GrInProgress } from "react-icons/gr";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Pagination } from "../component/Pagination.jsx";

const Dashboard = () => {
  const online = useSelector((state) => state.online);
  console.log(online);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(Online());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const filtered = online?.data?.filter((item) => {
      const name = item.fname?.toLowerCase().includes(search.toLowerCase());
      const email = item.email?.toLowerCase().includes(search.toLowerCase());
      const phone = item.phone?.toLowerCase().includes(search.toLowerCase());
      const stdid = item.sid?.toLowerCase().includes(search.toLowerCase());
      const course = item.cname?.toLowerCase().includes(search.toLowerCase());
      const start = item.start?.toLowerCase().includes(search.toLowerCase());
      const end = item.end?.toLowerCase().includes(search.toLowerCase());
      const status = item.status?.toLowerCase().includes(search.toLowerCase());
      return (
        name || email || phone || course || start || end || status || stdid
      );
    });
    setFilteredData(filtered);
  }, [search, online]);

  const toggleRow = (itemId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const openModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  // const handleAddSubrow = (cname, start, end) => {
  //   setSubRows((prev) => ({
  //     ...prev,
  //     [selectedId]: [...(prev[selectedId] || []), { cname, start, end }],
  //   }));
  //   setModalOpen(false);
  // };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-end items-center px-12 py-20 gap-4  font-garet ">
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
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          Add Students
        </button> */}
      </div>
      <div className="px-12  font-garet ">
        {paginatedData?.length === 0 ? (
          <p className="text-lg text-red-500 text-center font-semibold">
            No Students added!.
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
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
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Contact
                  </th>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Email
                  </th>
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
                      <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        {startIndex + index + 1}.
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
                      <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        {item.cdate
                          ? new Date(item.cdate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        {item.email}
                      </td>
                      <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        <button
                          className="text-blue-600 underline"
                          onClick={() => setIsOpen(true)}
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
                    {isOpen && (
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
                              {item.subrows?.length > 0 ? (
                                item.subrows.map((course, index) => (
                                  <tr key={index}>
                                    <td className="py-2 px-4 border text-gray-600">
                                      {startIndex + index + 1}.
                                    </td>
                                    <td className="py-2 px-4 border text-gray-600">
                                      {course.cname}
                                    </td>
                                    <td className="py-2 px-2 text-start text-gray-600 font-medium">
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
                              onClick={() => setIsOpen(false)}
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
    </div>
  );
};

export default Dashboard;
