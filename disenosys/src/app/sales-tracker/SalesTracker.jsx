"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, getLeadSDownload, updateLead } from "../Redux/action/leads";
import * as XLSX from "xlsx";
const statusOptions = ["Pending","Follow-up","Enrolled","Not Interested"];

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

  const { leads, loading,leadXl } = useSelector((state) => state.leads);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterData,setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = leads?.pages;
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");    
  const limit = 15;

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateLead(id, newStatus));
  };

 useEffect(() => {
  const delayDebounce = setTimeout(() => {
  dispatch(getLeads(page, limit, search, startDate, endDate));
  dispatch(getLeadSDownload());
      }, 800); // debounce search

    return () => clearTimeout(delayDebounce);
}, [page, limit, search, startDate, endDate]);

  
  const handlePageClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

//   useEffect(() => {
//    const filter = leads?.data?.filter((std) => {
//   const nameMatch = std?.fullName?.toLowerCase().includes(search.toLowerCase());
//   const emailMatch = std.email?.toLowerCase().includes(search.toLowerCase());

//   const formatDateOnly = (dateStr) => new Date(dateStr).toISOString().split('T')[0];
//   const created = formatDateOnly(std.createdAt);

//   const start = startDate ? formatDateOnly(startDate) : null;
//   const end = endDate ? formatDateOnly(endDate) : null;

//   const isWithinDateRange =
//     (!start || created >= start) &&
//     (!end || created <= end);

//   // Apply both search and date filters
//   const searchMatch = search ? (nameMatch || emailMatch) : true;

//   return searchMatch && isWithinDateRange;
// });

//   setFilterData(filter)
//   setPage(1);
//   },[leads,search,startDate,endDate])

  useEffect(() => {
  setPage(1); // Reset to page 1 when filters/search changes
}, [search, startDate, endDate]);

const handleDownload = () => {
  try {

    const excelData = [];
    leadXl?.data?.map((std) => {
        const row = {
          Name: std.fullName,
          Email:std.email,    
          Phone:std.phone,
          Whatsapp:std?.wp,
          Linkedin:std.linkedin,
          Resume:std.resume,
          TotalExperience:std.experience,
          relevantExperience:std.relevant,
          CurrentCompany:std.currentCompany,
          CurrentDesignation:std.currentDesignation,
          currentCtc:std?.currentCTC,
          expectedCtc:std?.expectedCTC, 
          noticePeriod:std?.noticePeriod,
          noticeNegotiable:std?.noticeNegotiable,
          CurrentCountry:std.currentCountry.name,
          CurrentState:std.currentState.name,
          CurrentCity:std.currentCity.name,
          EngagementType:std.engagementType,
          Urgency:std.urgency,
          Message:std.message,
          Status:std.status,
          UpdatedStatus:std.updatedStatus,
        };
          excelData.push(row);
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales_Report");

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

    link.setAttribute("download", `Sales_Report_${formattedDate}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
   alert("xl sheet downloaded!!")
  } catch (error) {
    console.error("Error exporting data:", error);
    alert("Failed to export data. Please try again.");
  }
};

const handleReset = () => {
   setSearch("");
   setStartDate("");
   setEndDate("");
   setFilterData(leads?.data || []);
}
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-garet">
      {!loading ? (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-500 text-center">
            Sales Tracking Dashboard
          </h1>
          <div className="flex justify-end items-center gap-2 mb-2">
          <p className="text-sm">Total Data : <span className="text-red-500 font-bold">{leads?.data?.length}</span> </p>
          <p className="text-sm">Current Page : <span className="text-red-500 font-bold">{leads?.page}</span></p>
          </div>
          <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-0">
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
          <div className="relative group">
           <input type="date" value={startDate} className= "input rounded-full px-8 py-2 border-2 bg-gray-200 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md mb-2" onChange={(e) => setStartDate(e.target.value)} />
                  <div className="absolute bottom-full mb-1 left-0 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Start Date
                   </div>
           </div>
           <div className="relative group">
           <input type="date" value={endDate} className = "input rounded-full px-8 py-2 border-2 bg-gray-200 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md mb-2 " onChange={(e) => setEndDate(e.target.value)} />
            <div className="absolute bottom-full mb-1 left-0 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    End Date
             </div>
          </div>
          <>
            <button className="bg-blue-500 px-4 py-2 rounded-md text-white shadow-md hover:bg-blue-600 transition-colors" onClick={handleReset}>
            Reset
          </button>
          </>
           </div>
           
          <button className="bg-green-400 px-2 py-1 rounded-md shadow-inner text-sm text-white mb-2" onClick={handleDownload}>Download Report</button>
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
                {leads?.data?.map((student, index) => (
                  <tr
                    key={student._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{(page - 1) * limit + index + 1}</td>
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
                    <td colSpan="7" className="text-center py-6 text-red-500">
                      No student enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
                <div className="flex justify-center mt-8 mb-4">
        {leads?.data?.length &&(
        <ul className="flex items-center gap-2 text-sm">
          <li
            onClick={() => handlePageClick(page - 1)}
            className="cursor-pointer text-gray-400 hover:text-black"
          >
            &lt;
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => ( 
            //Create one object: { length: 3 } 
            //That tells JavaScript: “Make an array with 3 empty slots.”
            //{ length: totalPages } → creates an empty array of that size
            //(_, i) => i + 1 → fills it with numbers starting from 1
            //The map function iterates over the array and returns a new array with the page numbers.
            <li
              key={num}
              onClick={() => handlePageClick(num)}
              className={`px-3 py-1 rounded-full cursor-pointer ${ 
                num === page ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {num < 10 ? `0${num}` : num} 
            </li>
          ))}
          <li
            onClick={() => handlePageClick(page + 1)}
            className="cursor-pointer text-gray-400 hover:text-black"
          >
            &gt;
          </li>
        </ul>
        )}
      </div>
        </div>
      ) : (
        <span className="text-center text-green-500">Loading.....</span>
      )}
    </div>
  );
};

export default SalesTracking;
