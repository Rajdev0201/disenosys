"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, updateLead } from "../Redux/action/leads";
import * as XLSX from "xlsx";
const statusOptions = ["Pending", "Spoke", "Enrolled"];

const SalesTracking = () => {
  //   const [students, setStudents] = useState([
  //     {
  //       _id: "1",
  //       name: "Arjun Kumar",
  //       email: "arjun.kumar@example.com",
  //       phone: "9876543210",
  //       enquiry: "Interested in MERN Stack course",
  //       wpResponse: "Interested",
  //       status: "Pending",
  //     },
  //     {
  //       _id: "2",
  //       name: "Sneha Raj",
  //       email: "sneha.raj@example.com",
  //       phone: "9123456789",
  //       enquiry: "Wants details about Data Science internship",
  //       wpResponse: "Interested",
  //       status: "Spoke",
  //     },
  //     {
  //       _id: "3",
  //       name: "Rahul Dev",
  //       email: "rahul.dev@example.com",
  //       phone: "9012345678",
  //       enquiry: "Asked for Backend Developer training",
  //       wpResponse: "Interested",
  //       status: "Interested",
  //     },
  //     {
  //       _id: "4",
  //       name: "Divya Sharma",
  //       email: "divya.sharma@example.com",
  //       phone: "9988776655",
  //       enquiry: "Enquired about full stack program duration",
  //       wpResponse: "Not Interested",
  //       status: "Not Interested",
  //     },
  //     {
  //       _id: "5",
  //       name: "Vikram Reddy",
  //       email: "vikram.reddy@example.com",
  //       phone: "9900112233",
  //       enquiry: "Requested placement support info",
  //       wpResponse: "Interested",
  //       status: "Enrolled",
  //     },
  //   ]);

  const { leads, loading } = useSelector((state) => state.leads);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterData,setFilterData] = useState([]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateLead(id, newStatus));
  };

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  useEffect(() => {
  const filter = leads?.data?.filter((std) => {
    const name = std?.fullName?.toUpperCase().includes(search.toLowerCase());
    const email = std.email?.toLowerCase().includes(search.toLowerCase());
    return name || email
  })
  setFilterData(filter)
  },[leads,search])

  
const handleDownload = () => {
  try {

    const excelData = [];
    leads?.data?.map((std) => {
        const row = {
          Name: std.fullName,
          Email:std.email,
          CurrentLocation:std.CurrentLocation,
          Phone:std.phone,
          Whatsapp:std.wp
        };
        excelData.push(row);
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
    <div className="p-6 bg-gray-100 min-h-screen font-garet">
      {!loading ? (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-500 text-center">
            Sales Tracking Dashboard
          </h1>
          <div className="flex justify-between">
          <div class="form relative mb-2">
            <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1">
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                class="w-5 h-5 text-gray-700"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <input
              class="input rounded-full px-8 py-2 border-2 bg-gray-200 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
              placeholder="Search..."
              required=""
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
          </div>
          <button className="bg-green-400 px-2 py-1 rounded-md shadow-inner text-sm text-white mb-2">Download Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border text-left text-sm">
              <thead className="bg-gray-200 text-gray-600 uppercase">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Enquiry</th>
                  <th className="px-4 py-3">Whatsapp-Response</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {filterData?.map((student, index) => (
                  <tr
                    key={student._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{student.fullName}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.phone}</td>
                    {/* <td className="px-4 py-2">{student.enquiry}</td> */}
                    <td className="px-4 py-2">{student.engagementType}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-sm rounded font-medium
      ${
        student.status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : student.status === "Interested"
          ? "bg-green-100 text-green-800"
          : student.status === "Not Interested"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800"
      }
    `}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        className="border px-2 py-1 rounded "
                        value={student.updatedStatus}
                        onChange={(e) =>
                          handleStatusChange(student._id, e.target.value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={`https://wa.me/${student.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-medium hover:underline"
                      >
                        Message
                      </a>
                    </td>
                  </tr>
                ))}

                {leads?.data?.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No student enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <span className="text-center text-green-500">Loading.....</span>
      )}
    </div>
  );
};

export default SalesTracking;
