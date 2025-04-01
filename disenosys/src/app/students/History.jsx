"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOnline, Online, removeOnline } from "../Redux/action/onlineStd.js";
import { courseld } from "../Redux/action/Course";
import { AiOutlineClose } from "react-icons/ai";
import { GrInProgress } from "react-icons/gr";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Pagination } from "../component/Pagination.jsx";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaChevronDown, FaChevronUp, FaPlus, FaRegCopy } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";

const History = () => {
  const [showPopup, setShowPopup] = useState(false);
  const {course}= useSelector((state) => state.courseLD);
  const {online,loading,error}= useSelector((state) => state.online);
  console.log(loading)
  const dispatch = useDispatch();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [subRows, setSubRows] = useState({});
  const [add, setAdd] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    start: "",
    end: "Not Completed",
    status: "In-progress",
  });
  const [editStudent, setEditStudent] = useState({
    id: "",
    fname: "",
    cname: "",
    end: "",
    status: "",
  });
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    parentId: "",
    subrowId: "",
    cname: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    dispatch(Online());
    dispatch(courseld());
  }, [dispatch]);

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

  const handleAddSubrow = async (cname, start, end) => {
    try {
      const response = await fetch(
        `https://disenosys-dkhj.onrender.com/ld/subrows/${selectedId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cname, start, end }),
        }
      );

      if (!response.ok) throw new Error("Failed to add subrow");

      const updatedData = await response.json();
      setSubRows((prev) => ({
        ...prev,
        [selectedId]: updatedData.subrows,
      }));
      setExpandedRows((prev) => ({
        ...prev,
        [selectedId]: true,
      }));
      dispatch(Online());
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubrow = (parentId, subrowId, cname, start, end) => {
    setEditData({ parentId, subrowId, cname, start, end });
    setModalEditOpen(true);
  };

  const handleUpdateSubrow = async () => {
    try {
      const response = await fetch(
        `https://disenosys-dkhj.onrender.com/ld/subrows/${editData.parentId}/${editData.subrowId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cname: editData.cname,
            start: editData.start,
            end: editData.end,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to edit subrow");

      const updatedData = await response.json();
      setSubRows((prev) => ({
        ...prev,
        [editData.parentId]: updatedData.subrows,
      }));
      dispatch(Online());
      setModalEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubrow = async (parentId, subrowId) => {
    try {
      const response = await fetch(
        `https://disenosys-dkhj.onrender.com/ld/subrows/${parentId}/${subrowId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete subrow");

      const updatedData = await response.json();
      setSubRows((prev) => ({
        ...prev,
        [parentId]: updatedData.subrows, // Update state with new data
      }));
      dispatch(Online());
    } catch (error) {
      console.error(error);
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDelete = (id) => {
    const confirmSubmit = window.confirm("Do you want to delete?");
    if (confirmSubmit) {
      dispatch(removeOnline(id));
      dispatch(Online());
    }
  };

  const handleEditClick = (id, fname, cname, end, status) => {
    setEditStudent({ id, fname, cname, end, status });
    setShowEditPopup(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editOnline(editStudent.id, {
        fname: editStudent.fname,
        cname: editStudent.cname,
        end: editStudent.end,
        status: editStudent.status,
      })
    );
    dispatch(Online());
    setShowEditPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://disenosys-dkhj.onrender.com/ld/studentadd",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(add),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (data.success) {
        dispatch(Online());
      }
      alert("Student Added SuccsessFully!..");
    } catch (error) {
      console.error(error);
      alert("Student added data is failed");
    }
    setShowPopup(false);
  };

  return (
    <div>
      <h2 className="text-[#0d1039] font-medium text-4xl text-center font-garet mb-1 mt-5">
        Students Application Form
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
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          Add Students
        </button> */}
        <div className="">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 flex items-center gap-2 mt-4"
            onClick={() => {
              navigator.clipboard.writeText("https://www.disenosys.com/saf");
              alert("Link copied to clipboard!");
            }}
          >
            Copy Link <FaRegCopy className="w-5 h-5 text-white" />
          </button>
          <h5 className="text-red-500 w-52 text-sm">
            Quickly copy and share the student application form*
          </h5>
        </div>
      </div>
      <div className="px-12  font-garet ">
        {paginatedData?.length === 0 ? (
          <p className="text-lg text-red-500 text-center font-semibold">
            Not found the Student record for this name {search}!.
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
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Start Date
                  </th>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    End Date
                  </th>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Status
                  </th>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    Action
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
                        index % 2 !== 0 ? "bg-gray-300" : "bg-white"
                      }`}
                    >
                      <td className="py-2 px-2 text-start text-gray-600 font-medium">
                        {startIndex + index + 1}.
                        <>
                          {item.subrows?.length > 0 && (
                            <button
                              className="w-6 ml-2 ring-2 rounded-full bg-blue-500 p-1"
                              onClick={() => toggleRow(item._id)}
                            >
                              {expandedRows[item._id] ? (
                                <FaChevronUp className="text-white" />
                              ) : (
                                <FaChevronDown className="text-white" />
                              )}
                            </button>
                          )}
                        </>
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
                        {item.end === "Not Completed"
                          ? <span className="bg-[#FDD5D9] text-[#FF0000] rounded-full px-4 py-1 font-medium text-sm">Pending</span>
                          : new Date(item.end).toLocaleDateString()}
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
                      <div className="flex justify-start items-start">
                        <td
                          className="py-2 px-2 text-gray-600 font-medium hover:cursor-pointer"
                          onClick={() =>
                            handleEditClick(
                              item._id,
                              item.fname,
                              item.cname,
                              item.end,
                              item.status
                            )
                          }
                        >
                          <CiEdit className="text-gray-500 w-6 h-6" />
                        </td>
                        <td
                          className="py-2 px-2 text-gray-600 font-medium hover:cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        >
                          <RiDeleteBin5Line className="text-red-500 w-6 h-6" />
                        </td>
                        {/* <td>
                          {item.subrows?.length > 0 && (
                            <button
                              className="ml-2 mt-2 ring-2 rounded-full bg-blue-500 p-1"
                              onClick={() => toggleRow(item._id)}
                            >
                              {expandedRows[item._id] ? (
                                <FaChevronUp className="text-white" />
                              ) : (
                                <FaChevronDown className="text-white" />
                              )}
                            </button>
                          )}
                        </td> */}
                        <td>
                        {search && (
                      <div className="mt-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-md"
                          onClick={() => openModal(item._id)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                        </td>
                      </div>
                    </tr>
                   
                    {expandedRows[item._id] &&
                      item.subrows?.map((sub, subIndex) => (
                        <tr
                          key={subIndex}
                          className="bg-gray-100 border-b border-gray-300"
                        >
                          <td className="py-2 px-2 text-start text-gray-600 font-medium">
                            {/* Sub-{subIndex + 1}. */}
                            <BsArrowReturnRight className="text-blue-500 " />
                          </td>
                          <td className="py-2 px-2  text-start text-gray-600 font-medium">
                            {item.sid}
                          </td>
                          <td className="py-2 px-2 text-start">{item.fname}</td>
                          <td className="py-2 px-2 text-start">{sub.cname}</td>
                          <td className="py-2 px-2 text-start">
                            {new Date(sub.start).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-2 text-start">
                            {sub.end
                              ? new Date(sub.end).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="py-2 px-2 text-start text-gray-600 font-medium">
                            {sub.end !== "" ? (
                              <p className="flex items-center justify-center text-green-500 gap-2">
                                <IoCheckmarkDoneCircleOutline className="w-5 h-5 text-green-500" />{" "}
                                
                              </p>
                            ) : (
                              <p className="flex items-center justify-center text-red-500 gap-2">
                                <GrInProgress className="w-4 h-4 text-red-500" />{" "}
                                
                              </p>
                            )}
                          </td>
                          <td className="py-2 px-2 flex justify-start">
                            <button
                              onClick={() =>
                                handleEditSubrow(
                                  item._id,
                                  sub._id,
                                  sub.cname,
                                  sub.start,
                                  sub.end
                                )
                              }
                              className="text-blue-500"
                            >
                              {" "}
                              <CiEdit className="text-gray-500 w-6 h-6" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteSubrow(item._id, sub._id)
                              }
                              className="text-red-500 ml-5"
                            >
                              {" "}
                              <RiDeleteBin5Line className="text-red-500 w-6 h-6" />
                            </button>
                          </td>
                        </tr>
                      ))}
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
              Add Students
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

              <input
                type="number"
                name="phone"
                placeholder="Enter Number"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />

              <select
                name="course"
                value={add.course}
                onChange={handleChange}
                className="border p-2 w-full text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <input
                type="date"
                name="start"
                placeholder="Total Year of Experience"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />

              {/* <input
                      type="date"
                      name="end"
                      placeholder="Total Year of Experience"
                      required
                      className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                    /> */}

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
            <h2 className="text-xl font-bold mb-4">Edit Students</h2>
            <input
              type="text"
              name="fname"
              value={editStudent.fname}
              onChange={handleEditChange}
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              name="cname"
              value={editStudent.cname}
              onChange={handleEditChange}
              className="border p-2 w-full rounded"
            />
            <input
              type="date"
              name="end"
              value={editStudent.start}
              onChange={handleEditChange}
              className="border p-2 w-full rounded"
            />
            <span className="text-red-500 text-sm">
              Please enter course of End Date *
            </span>
            <input
              type="text"
              name="status"
              value={editStudent.status}
              onChange={handleEditChange}
              className="border p-2 w-full rounded"
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-red-500 rounded text-white px-4 py-2 mt-4"
                onClick={() => setShowEditPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 rounded text-white px-4 py-2 mt-4"
                onClick={handleUpdate}
              >
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
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ml-44">
          <div className="bg-white p-6 rounded-md w-[600px]">
            <h2 className="text-lg font-bold mb-3">Add Subrow</h2>
            <span className="text-sm text-red-500 font-garet font-medium">
              Course Name*
            </span>
            {/* <input
              type="text"
              placeholder="Course Name"
              className="border p-2 w-full my-2"
              id="cname"
            /> */}
            <select
              name="course"
              placeholder="Course Name"
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
              id="cname"
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
            <span className="text-sm text-red-500 font-garet font-medium">
              Course Start Date*
            </span>
            <input
              type="date"
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
              id="start"
            />
            <span className="text-sm text-red-500 font-garet font-medium ">
              Course End Date*
            </span>
            <input
              type="date"
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
              id="end"
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
                onClick={() =>
                  handleAddSubrow(
                    document.getElementById("cname").value,
                    document.getElementById("start").value,
                    document.getElementById("end").value
                  )
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ml-44">
          <div className="bg-white p-6 rounded-md w-[600px]">
            <h2 className="text-lg font-bold">Edit Subrow</h2>
            <span className="text-sm text-red-500 font-garet font-medium">
              Course Name*
            </span>
            {/* <input
              type="text"
              placeholder="Course Name"
              value={editData.cname}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, cname: e.target.value }))
              }
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
            /> */}
               <select
              placeholder="Course Name"
              value={editData.cname}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, cname: e.target.value }))
              }
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
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
            <span className="text-sm text-red-500 font-garet font-medium">
              Course StartDate*
            </span>
            <input
              type="date"
              value={editData.start}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, start: e.target.value }))
              }
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
            />
            <span className="text-sm text-red-500 font-garet font-medium">
              Course EndDate*
            </span>
            <input
              type="date"
              value={editData.end}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, end: e.target.value }))
              }
              className="border p-2 w-full my-2 bg-blue-100 focus:outline-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => setModalEditOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={handleUpdateSubrow}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
