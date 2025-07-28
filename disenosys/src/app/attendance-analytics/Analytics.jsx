"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBatchName } from "../Redux/action/batch";
import { getReports } from "../Redux/action/attendance";
import * as XLSX from "xlsx";
import { courseld } from "../Redux/action/Course";
import { GiCancel } from "react-icons/gi";

const Analytics = () => {
  const [selectBatch, setSelectBatch] = useState("");
  const { course } = useSelector((state) => state.courseLD);
  const { batchName } = useSelector((state) => state.batch);
  const [selectedCourse, setSelectedCourse] = useState("");
  const { attendance, loading } = useSelector((state) => state.attendance);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBatchName(selectedCourse));
    dispatch(getReports(selectBatch));
    dispatch(courseld());
  }, [dispatch, selectBatch,selectedCourse]);

  const getDate = attendance?.reports?.map((date) =>
    date.students.map((date) => date.date)
  );

    const filtered = batchName?.data?.filter((item) =>
    item.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToDetails = (batch,sid) => {
    window.open(`/attendance-analytics/details?batch=${batch}?sid=${sid}`, "_blank");
  };



const handleDownload = () => {
  try {
    const report = attendance?.reports || [];
    const getDates = getDate?.flat();

    const excelData = [];
    report?.forEach((batch) => {
      batch?.students?.forEach((std) => {
        const row = {
          Name: std.name,
        };

        std?.status?.forEach((val, index) => {
          const date = new Date(getDates[0][index]);
          console.log(date)
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          row[formattedDate] = val ? "Present" : "Absent";
        });
     
        const total = std.status.length;
        const present = std.status.filter((s) => s === true).length;
        const Percentage = total > 0 ? ((present / total) * 100).toFixed(2)+ "%":"0.00 %";
        row["Percentage"] = Percentage;
        excelData.push(row);
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create Blob and trigger download
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    const link = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    link.href = url;

    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${currentDate.getFullYear()}`;

    link.setAttribute("download", `Attendance_Report_${formattedDate}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting data:", error);
    alert("Failed to export data. Please try again.");
  }
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
      <h1 className="text-2xl font-medium mb-2">Attendance-Reports</h1>
      <h4 className="text-lg font-medium mb-5">
        View student attendance-reports across different batches
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


      {!loading ? (
        <>
          {attendance?.reports?.length > 0 && <div className=" flex justify-between mb-2"> 
                <p className="border-2 border-blue-500 bg-white p-2 text-sm rounded-lg">
                  {selectedCourse}
                </p>
            <button className="px-2 py-2 rounded-md shadow-inner bg-blue-500 hover:cursor-pointer text-white" onClick={handleDownload}>Download Report</button>
            </div>
            }
          <table className="min-w-full bg-white border-2 border-gray-300 shadow-md rounded-lg mb-4 border-collapse">
            {attendance?.reports?.map((batch) => (
              <>
                <thead className="bg-blue-500 text-white font-sans">
                  <tr>
                    <th className="py-2 px-2 text-start border-r border-gray-300">
                      STUDENT NAME
                    </th>
                    {/* <th className="py-2 px-2 text-center border-r border-gray-300">
                    ROLL NO
                  </th> */}
                    {getDate?.map((i) =>
                      i[0].map((i) => (
                        <th key={i} className="py-2 px-2 text-center border-r border-gray-300">
                          {new Date(i).getDate()}-{new Date(i).getMonth() + 1}-
                          {new Date(i).getFullYear()}
                        </th>
                      ))
                    )}
                    {/* <th className="py-2 px-2 text-center border-r border-gray-300">
                    Attendance
                  </th> */}
                  <th className="py-2 px-2 text-center border-r border-gray-300">
                    Percentage
                   </th>
                  </tr>
                </thead>
                {batch?.students?.map((std) => (
                  <tbody key={std.sid}>
                    <>
                      <tr>
                        <td
                          className="py-2 px-2 text-start text-gray-600 font-medium gap-3 hover:cursor-pointer"
                          onClick={() => goToDetails(batch.batch,std.sid)}
                        >
                          {std.name}
                        </td>
                        {/* <td className="py-2 px-2  text-gray-600 font-medium gap-3 text-center">
                        {std.sid}
                      </td> */}
                        {/* <td className="py-2 px-2  text-gray-600 font-medium gap-3 text-center">
                        {batch.date}
                      </td> */}
                        {std?.status?.map((s) => (
                          <td key={s} className="text-center">
                            {s === true ? (
                              <span className="bg-green-500 rounded-md px-2 py-0.5 text-white shadow-inner">
                                present
                              </span>
                            ) : (
                              <span className="bg-red-500 rounded-md px-2 py-0.5 text-white shadow-inner">
                                absent
                              </span>
                            )}
                          </td>
                        ))}
                        
                        <td className="py-2 px-2  text-gray-600 font-medium gap-3 text-center">
                           {(() => {
                                const total  =  std.status.length || 0;
                                const present =  std.status.filter((s) => s === true).length;
                                const Percentage = total > 0? ((present / total) * 100).toFixed(2) : "0.00%"
                                return `${Percentage}%`;
                             })()}
                      </td>

                      </tr>
                    </>
                  </tbody>
                ))}
              </>
            ))}
          </table>
        </>
      ) : (
        <p className="min-h-screen mx-auto text-center text-green-500 font-bold text-xl">
          Loading ...
        </p>
      )}
    </div>
  );
};

export default Analytics;
