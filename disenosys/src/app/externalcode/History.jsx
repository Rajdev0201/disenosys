"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExternalCode, externalCode } from "../Redux/action/auth.js";
import { Pagination } from "../component/Pagination.jsx";
import { FaWhatsappSquare } from "react-icons/fa";
import { MdAttachEmail, MdDelete } from "react-icons/md";
import Link from "next/link.js";
import axios from "axios";

const History = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.external);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(externalCode());
  }, [dispatch]);

  useEffect(() => {
    const filtered = student?.data?.filter((item) => {
      const codeMatch = item.code?.toLowerCase().includes(search.toLowerCase());
      const collegeMatch = item.college
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const dateMatch =
        item.createdAt &&
        new Date(item.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(search.toLowerCase());
      const expire =
        item.expiresAt &&
        new Date(item?.expiresAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(search.toLowerCase());
      return codeMatch || collegeMatch || dateMatch || expire;
    });
    setFilteredData(filtered);
  }, [search, student]);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleWhatsAppShare = (code) => {
    const message = `Check out this college code: ${code}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailShare = (code) => {
    const subject = "College Code Information";
    const body = `Here is the college code: ${code}`;
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");
  };

  
  const handleDelete = (id) => {
    const confirmSubmit = window.confirm("Do you want to delete the code?");
    if(confirmSubmit){
      dispatch(deleteExternalCode(id))
    }
   }

   const handleToggle = (id, isActive) => {
    fetch(`https://disenosys-1.onrender.com/api/admin/toggleCode/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(externalCode());
        }
      })
      .catch((err) => console.log(err));
  };


  
    const handleDownload = async () => {
      try {
        // Send a GET request to the backend to fetch the Excel file
        const response = await axios.get('http://localhost:8000/api/student/result', {
          responseType: 'blob', // Important to set the response type to blob
        });
  
        // Create a URL for the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
  
        // Set the download attribute with the filename
        link.setAttribute('download', 'results.xlsx');
  
        // Append the link to the document and click it to start the download
        document.body.appendChild(link);
        link.click();
  
        // Cleanup
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading the file:', error);
        alert('Failed to download the file',error);
      }
    };


  return (
    <div className="p-6 flex flex-col  w-full mt-12">
      <h2 className="text-[#182073] font-bold font-josefin text-2xl md:text-3xl lg:text-4xl text-center mb-1">
        External Code
      </h2>
    
      <div className="flex flex-col md:flex-row justify-between items-center p-5">
        <div className=" p-2 flex-grow">
          <div className="flex items-center">
            <div className="flex items-center bg-[#182073] justify-center w-10  rounded-tl-lg rounded-bl-lg border-r border-gray-200 p-3">
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
              className=" bg-white pl-2 text-base font-semibold outline-0 p-2"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="ml-0  gap-2 flex mt-1">
  <button 
    className="bg-[#182073] text-white rounded-sm font-bold px-4 py-0  text-center" 
    onClick={handleDownload}
  >
    Download Report
  </button>
  <Link 
    href="/external" 
    className="bg-[#182073] text-white rounded-sm font-bold px-4 py-2  text-center flex justify-center items-center"
  >
    Create Code
  </Link>
</div>

      </div>

      {/* <div className="w-full max-w-[800px] border-b-4 border-[#182073] mb-6"></div> */}
      {paginatedData?.length === 0 ? (
        <p className="text-lg text-red-400 text-center">
          No External data Match.
        </p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-slate-200 border-b border-gray-300 text-[#182073]">
              <tr>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  S.No
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Month/Year
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Code
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Created Date
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Expired Date
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Action
                </th>
                <th className="py-3 px-4 text-center text-[#182073]">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((item, index) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center text-gray-400">
                    {startIndex + index + 1}.
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.createdAt
                      ? `${new Date(item.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "long" }
                        )} / ${new Date(item.createdAt).getFullYear()}`
                      : "N/A"}
                  </td>

                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.code}
                  </td>

                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.expiresAt
                      ? new Date(item?.expiresAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                
                  <td className="text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="group relative">
                        <FaWhatsappSquare
                          data-tip="WhatsApp"
                          color="green"
                          size={24}
                          className="cursor-pointer"
                          onClick={() =>
                            handleWhatsAppShare(item.code, item.college)
                          }
                        />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-6">
                          Share on WhatsApp
                        </div>
                      </div>
                      <div className="group relative">
                        <MdAttachEmail
                          data-tip="Email"
                          color="blue"
                          size={24}
                          className="cursor-pointer"
                          onClick={() =>
                            handleEmailShare(item.code, item.college)
                          }
                        />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-6">
                          Share via Email
                        </div>
                      </div>
                      <div className="group relative">
                        <MdDelete
                          data-tip="delete"
                          size={24}
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-6">
                          Delete the code
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className={`relative inline-flex items-center h-6 w-11 rounded-full ${
                        item.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                      onClick={() => handleToggle(item._id, item.isActive)}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                          item.isActive ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
