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
  const [selectedCourse, setSelectedCourse] = useState("");
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
    dispatch(getBatchName(selectedCourse));
    dispatch(courseld());
  }, [dispatch, selectBatch, selectedCourse]);

  useEffect(() => {
    const initialBatch = {};
    batch?.data?.forEach((item) => {
      item?.students?.forEach((std) => {
        initialBatch[std.sid] = {
          name: std.name,
          topic: item.topic || "",
          status: false,
          date: selectedDate,
        };
      });
    });
    setUpdateBatch(initialBatch);
  }, [batch, selectedDate]);

  const handleChange = (sid, field, value, name, topic) => {
    setUpdateBatch((prev) => ({
      ...prev,
      [sid]: {
        ...(prev[sid] || {}),
        [field]: value,
        name: name,
        topic: topic,
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
        topic: data.topic,
        status: data.status,
        date: selectedDate,
      }));

    const payload = {
      batch: selectBatch,
      startedDate: date,
      updateAttendanceDate: selectedDate,
      students: cleanedStudents,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/crate-attendance",
        payload
      ); //https://disenosys-dkhj.onrender.com
      alert(res.data.message);
    } catch (err) {
      alert(err?.response?.data?.error);
    }
    setSelectedDate("");
    setUpdateBatch({
      status: false,
    });
  };

  const handleClear = () => {
    setShowOptions(false);
    setSelectBatch("");
    setSearchTerm("");
  };


const handleClickCourse = (e) => {
   setSelectedCourse(e.target.value);
   setSelectBatch("");
   setSearchTerm("");
}

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen font-garet">
      <h1 className="text-2xl font-medium mb-2">Attendance Tracker</h1>
      <h4 className="text-lg font-medium mb-5">
        Track and manage student attendance across different batches
      </h4>
      <span className="text-sm text-red-500 font-garet font-medium">
        Click the topic name and find Your batch *
      </span>
      <div className="mb-1 flex justify-start items-center gap-2">
        <select
          name="topic"
          value={selectedCourse}
          onChange={handleClickCourse}
          className="flex items-center w-96 bg-white justify-center rounded-md border-2 border-blue-500 p-2 outline-none text-black"
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
      <span className="text-sm text-red-500 font-garet  font-medium">
        Click the Batch name and find Your Batch of Students*
      </span>
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
          {showOptions && (
            <button onClick={handleClear}>
              <GiCancel
                className="text-red-500 absolute right-3 top-3"
                size={20}
              />
            </button>
          )}
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

      {!loading ? (
        batch?.data?.map((batch) => (
          <>
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm px-4 py-2 bg-blue-500 rounded-2xl text-white border border-white shadow-inner">
                Started Date : {new Date(batch.date).toLocaleDateString()}
              </span>
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
                              std.name,
                              batch.topic
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
