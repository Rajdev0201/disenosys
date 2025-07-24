"use client";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEditNote } from "react-icons/md";
// import { PiStudentFill } from "react-icons/pi";
// import { IoIosCheckboxOutline } from "react-icons/io";
// import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBatch, getBatchName } from "../Redux/action/batch";
// import { student } from "../Redux/features/studentSlice";
import axios from "axios";
import { GiCancel } from "react-icons/gi";
import { courseld } from "../Redux/action/Course";

const Attendance = () => {
  const { batch, loading, batchName } = useSelector((state) => state.batch);
  const { course } = useSelector((state) => state.courseLD);
  const dispatch = useDispatch();
  const [selectBatch, setSelectBatch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [updateBatch, setUpdateBatch] = useState({
    status: false,
  });
  //     {
  //       id: "01",
  //       text: "Total Students",
  //       icon: <PiStudentFill size={40} />,
  //       count: "25",
  //     },
  //     {
  //       id: "02",
  //       text: "Present Students",
  //       icon: <IoIosCheckboxOutline size={40}/>,
  //       count: "15",
  //     },
  //     {
  //       id: "03",
  //       text: "Absent Students",
  //       icon: <AiOutlineCloseCircle size={40} />,
  //       count: "10",
  //     },
  //   ];

  const filtered = batchName?.data?.filter((item) =>
    item.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getBatch(selectBatch));
    dispatch(getBatchName());
    dispatch(courseld());
  }, [dispatch, selectBatch]);


  useEffect(() => {
  const initialBatch = {};
  batch?.data?.forEach((item) => {
    item?.students?.forEach((std) => {
      initialBatch[std.sid] = {
        name: std.name,
        topic: item.topic || "",
        status: false, 
        date:selectedDate
      };
    });
  });
  setUpdateBatch(initialBatch);
}, [batch,selectedDate]);


  const handleChange = (sid, field, value, name,topic) => {
    setUpdateBatch((prev) => ({
      ...prev,
      [sid]: {
        ...(prev[sid] || {}),
        [field]: value,
        name: name,
        topic:topic,
      },
    }));
  };

  // const handleSubmit = async (name, sid, topic) => {
  //   console.log(name, sid);
  //   const studentUpdate = updateBatch[sid];
  //   const payload = {
  //     batch: selectBatch,
  //     student: {
  //       name,
  //       sid,
  //       topic,
  //       status: studentUpdate?.status || false,
  //       date: studentUpdate?.date || "",
  //     },
  //   };

  //   console.log("Submit Payload", payload);

  //   // TODO: Call API here to update backend
  // };

  const handleSubmitAll = async (date) => {
    const cleanedStudents = Object.entries(updateBatch)
      .filter(([sid]) => sid.startsWith("DSST"))
      .map(([sid, data]) => ({
        sid,
        name: data.name,
        topic:data.topic,
        status:data.status,
        date:selectedDate,
      }));

    const payload = {
      batch: selectBatch,
      startedDate:date,
      updateAttendanceDate:selectedDate,
      students: cleanedStudents,
    };
      try{
           const res = await axios.post("http://localhost:8000/crate-attendance",payload) //https://disenosys-dkhj.onrender.com
           alert(res.data.message);
         }catch(err){
          alert(err?.response?.data?.error)
         }
           setSelectedDate("");
           setUpdateBatch({
            status:false,
           });
  };

  const handleClear = () => {
    setShowOptions(false);
    setSelectBatch("");
    setSearchTerm("");
  }

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen font-garet">
      <h1 className="text-2xl font-medium mb-2">Attendance Tracker</h1>
      <h4 className="text-lg font-medium mb-5">
        Track and manage student attendance across different batches
      </h4>

      {/* <div className="flex gap-2 items-center mb-6">
        <label
          className="block mb-2 text-md font-medium text-gray-700"
          htmlFor="batch"
        >
          Select Batch:
        </label>
        <select
          id="batch"
          value={selectBatch}
          onChange={(e) => setSelectBatch(e.target.value)}
          className="bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-blue-500 focus:border-blue-500 block w-[220px] p-2.5"
          defaultValue=""
        >
          <option value="" disabled>
            Select a batch
          </option>
          {batchName?.data?.map((item) => (
            <option key={item._id} value={item.batch}>
              {item.batch}
            </option>
          ))}
        </select>
      </div> */}

           <div className=" mb-1">
              <span className="text-sm text-red-500 font-garet font-medium">
                Click the topic name and find the Your batch
              </span>
              <select
                name="topic"
                // value={add.topic}
                // onChange={handleBatchCreate}
                className="flex items-center w-1/4 bg-white justify-center rounded-md border-2 border-blue-500 p-2 outline-none text-black"
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
              </div>

    <div className="mb-6">
      <div className="flex justify-between items-center gap-2 w-[220px] relative">
     <input
        type="text"
        placeholder="Select a batch"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowOptions(true)}
        className="p-2 border-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
      />
      {showOptions && 
      <button onClick={handleClear}><GiCancel className="text-red-500 absolute right-3 top-3" size={20}/></button>
      }
      </div>
      {showOptions && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-[220px] max-h-60 overflow-y-auto rounded-md shadow-md">
          {filtered?.length > 0 ? (
            filtered.map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  setSelectBatch(item.batch);
                  setSearchTerm(item.batch);
                  setShowOptions(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {item.batch}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results</li>
          )}
        </ul>
      )}
      </div>

      {/* <div className="flex gap-10 mb-10">
        {data.map((std) => (
          <div className="flex justify-between border gap-16 items-center bg-white border-gray-400 rounded-lg shadow-inner px-3 py-2">
            <div className="flex flex-col">
              <h4 className="text-sm text-gray-500">{std.text}</h4>
              <p className="font-bold text-2xl ">{std.count}</p>
            </div>
            <div>
              <span>{std.icon}</span>
            </div>
          </div>
        ))}
        <div className="flex flex-col border-2 border-blue-500 bg-white rounded-md p-2 shadow-inner">
          <p className="font-medium text-lg">Batch 1 - Web Development</p>
          <p className="font-medium text-sm">Started Date - 16.07.2025</p>
        </div>
      </div> */}

      {/* <div className="flex justify-end mb-2">
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
          // value={filters.name}
          // onChange={handleFilterChange}
        />
      </div> */}

      {!loading ? (
        batch?.data?.map((batch) => (
          <>
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm px-4 py-2 bg-blue-500 rounded-2xl text-white border border-white shadow-inner">Started Date : {new Date(batch.date).toLocaleDateString()}</span>
            <div className="flex justify-end items-center gap-4 mb-4">
              <p className="border-2 border-blue-300 bg-white p-2 text-sm rounded-lg">
                {batch.topic}
              </p>
              <input
               type="date"
               value={selectedDate}
               onChange={(e) => setSelectedDate(e.target.value)}
               className="bg-gray-400 text-black rounded-md p-2 shadow-inner"
               />
            </div>
           </div> 
            <table className="min-w-full bg-white border-2 border-gray-300 shadow-md rounded-lg mb-4">
              <thead className="bg-blue-500 text-white font-sans">
                <tr>
                  <th className="py-2 px-2 text-start border-r border-gray-300">
                    STUDENT NAME
                  </th>
                  <th className="py-2 px-2 text-center border-r border-gray-300">
                    ROLL NO
                  </th>
                  <th className="py-2 px-2 text-center border-r border-gray-300">
                    Attendance
                  </th>
                  {/* <th className="py-2 px-2 text-centers border-r border-gray-300">
                    Date
                  </th> */}
                </tr>
              </thead>
              {batch.students.map((std) => (
                <tbody key={std.sid}>
                  <>
                    <tr>
                      <td className="py-2 px-2 text-start text-gray-600 font-medium gap-3">
                        {std.name}
                      </td>
                      <td className="py-2 px-2  text-gray-600 font-medium gap-3 text-center">
                        {std.sid}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${
                            updateBatch[std.sid]?.status
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          onClick={() =>
                            handleChange(
                              std.sid,
                              "status",
                              !updateBatch[std.sid]?.status,
                              std.name,batch.topic
                            )
                          }
                        >
                          <span
                            className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${
                              updateBatch[std.sid]?.status
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>

                      {/* <td className="p-1 text-gray-600 font-medium gap-3 text-center">
                        <input
                          type="date"
                          value={updateBatch[std.sid]?.date || ""}
                          onChange={(e) =>
                            handleChange(std.sid, "date", e.target.value,std.name)
                          }
                          className="bg-gray-400 text-black rounded-md p-2 shadow-inner"
                        />
                      </td> */}

                      {/* <td className="flex justify-center">
                        <button
                          className="bg-blue-500 text-center px-6 py-2 rounded-md shadow-inner text-white"
                          onClick={() =>
                            handleSubmit(std.name, std.sid, batch.topic)
                          }
                        >
                          Submit
                        </button>
                      </td> */}
                    </tr>
                  </>
                </tbody>
              ))}
            </table>
            <div className="text-center mt-4">
              <button
                onClick={() => handleSubmitAll(batch?.date)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </>
        ))
      ) : (
          <p className="min-h-screen mx-auto text-center text-green-500 font-bold text-xl">
          Loading ...
        </p>
      )}
    </div>
  );
};

export default Attendance;
