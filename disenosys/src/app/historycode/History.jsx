"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentCode } from "../Redux/action/auth.js";
import { Pagination } from "../component/Pagination.jsx";
import { FaWhatsappSquare } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import Link from "next/link.js";

const History = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.code);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(studentCode());
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
      return codeMatch || collegeMatch || dateMatch;
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

  const handleWhatsAppShare = (code,college) => {
    const examLink = "https://www.disenosys.com/exam";
    const whatsappMessage = `Dear Student,\n\n${college}, has been assigned the following code for the upcoming online exam:\n\nCode: ${code}\nExam Link: ${examLink}\n\nPlease use this code during registration. If you need any assistance, feel free to contact us.\n\nGood luck with your exam!\nDisenosys\nIndia's leading Automotive Design Training & Hiring Partners`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailShare = (code,college) => {
    const subject = "College Code Information";
    const examLink = "https://www.disenosys.com/exam";
    const body = `Dear Student,\n\n${college}, has been assigned the following code for the upcoming online exam:\n\nCode: ${code}\nExam Link: ${examLink}\n\nPlease use this code during registration. If you need any assistance, feel free to contact us.\n\nGood luck with your exam!\nDisenosys\nIndia's leading Automotive Design Training & Hiring Partners`;
  
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div className="p-6 flex flex-col w-full mt-12">
      <h2 className="text-[#182073] font-bold font-josefin text-2xl md:text-3xl lg:text-4xl text-center mb-1">
      University Code
      </h2>

      <div className="flex justify-between items-center p-5">
        <div className="box-shadow p-2 flex-grow">
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
        <div className="ml-4">
          <Link href="/adminroute" className="bg-[#182073] text-white rounded-sm font-bold px-4 py-2">
            Create Code
          </Link>
        </div>
      </div>

      {paginatedData?.length === 0 ? (
        <p className="text-lg text-red-400 text-center">
          No Student data Match.
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
                  College
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Code
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Created Date
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Share
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((item, index) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center text-gray-400">
                    {startIndex + index + 1}.
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.college}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.code}
                  </td>

                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
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
                          onClick={() => handleWhatsAppShare(item.code,item.college)}
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
                          onClick={() => handleEmailShare(item.code,item.college)}
                        />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-6">
                          Share via Email
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-1 px-4 text-center text-gray-400">
                    <button className="text-white bg-red-600 text-center w-20 h-8 rounded-sm shadow-xl hover:bg-red-400">
                      Delete
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
