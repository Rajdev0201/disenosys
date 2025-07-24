"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBatchName } from "../Redux/action/batch";
import { getReports } from "../Redux/action/attendance";
import * as XLSX from "xlsx";

const Analytics = () => {
  const [selectBatch, setSelectBatch] = useState("");
  const { batchName } = useSelector((state) => state.batch);
  const { attendance, loading } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBatchName());
    dispatch(getReports(selectBatch));
  }, [dispatch, selectBatch]);

  const getDate = attendance?.reports?.map((date) =>
    date.students.map((date) => date.date)
  );

  const goToDetails = (batch,sid) => {
    window.open(`/attendance-analytics/details?batch=${batch}?sid=${sid}`, "_blank");
  };



const handleDownload = () => {
  try {
    const report = attendance?.reports || [];
    const getDates = getDate?.flat();

    console.log(getDates)
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



  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen font-garet">
      <h1 className="text-2xl font-medium mb-2">Attendance-Reports</h1>
      <h4 className="text-lg font-medium mb-5">
        View student attendance-reports across different batches
      </h4>
 
      <div className="flex gap-2 items-center mb-6">
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
      </div>


      {!loading ? (
        <>
          {attendance?.reports?.length > 0 && <div className=" flex justify-end mb-2"> 
            <button className="px-2 py-2 rounded-md shadow-inner bg-blue-500 hover:cursor-pointer text-white" onClick={handleDownload}>Download Report</button>
            </div>}
          <table className="min-w-full bg-white border-2 border-gray-300 shadow-md rounded-lg mb-4">
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
