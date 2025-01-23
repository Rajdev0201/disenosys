"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { companyCode } from "../Redux/action/auth.js";
import { Pagination } from "../component/Pagination.jsx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCloudDownload } from "react-icons/io";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import axios from "axios";

const History = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchExamName, setSearchExamName] = useState("");
  const [searchCreatedBy, setSearchCreatedBy] = useState("");
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [examNameError, setExamNameError] = useState("");
 
  const handleExamNameChange = (e) => {
    const value = e.target.value;
    setSearchExamName(value);
  
    // Check if the exam name already exists in the database
    const isDuplicate = questions.some((q) => q.examname.toLowerCase() === value.toLowerCase());
    if (isDuplicate) {
      setExamNameError("This exam name already exists. Please choose a different name.");
    } else {
      setExamNameError(""); // Clear the error if the name is unique
    }
  };
  

  useEffect(() => {
    dispatch(companyCode());
  }, [dispatch]);

  const totalPages = Math.ceil(groupedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = groupedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  useEffect(() => {
    axios
      .get("https://disenosys-dkhj.onrender.com/api/questions/all")
      .then((response) => {
        setQuestions(response.data);

        // Group the data by examname and createdBy
        const grouped = response.data.reduce((acc, item) => {
          const key = `${item.examname}-${item.createdBy}`;
          if (!acc[key]) {
            acc[key] = {
              examname: item.examname,
              createdBy: item.createdBy,
              createdAt: item.createdAt,
              count: 0,
            };
          }
          acc[key].count += 1;
          return acc;
        }, {});

        // Convert grouped data into an array
        setGroupedData(Object.values(grouped));
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [paginatedData]);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  
  const handleSubmit = async () => {
    if (!searchExamName || !searchCreatedBy || !file) {
      alert("Please fill all fields and upload a file!");
      return;
    }
   
    if (examNameError) {
      alert("Please resolve the error in the exam name field before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("examname", searchExamName);
    formData.append("createdBy", searchCreatedBy);

    try {
      const response = await fetch("https://disenosys-dkhj.onrender.com/biw", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Questions uploaded successfully!");
      } else {
        const error = await response.json();
        console.error("Error uploading questions:", error);
        alert("Failed to upload questions.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while uploading the questions.");
    }
  };

  const handleDownload = async () => {
    try {

      const response = await axios.get('https://disenosys-dkhj.onrender.com/api/student/demo-exam', {
        responseType: 'blob', // Important to set the response type to blob
      });

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Set the download attribute with the filename
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}`;
      
      // Set the download attribute with the dynamic filename
      link.setAttribute('download', `dummydata_${formattedDate}.xlsx`);

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
    <div className="p-6 flex flex-col w-full mt-12">
      <h2 className="text-[#182073] font-bold text-2xl text-center mb-1">
        Upload Question
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center p-5">
        <div className="py-2 flex-grow">
          <div className="flex items-center gap-3">

            <input
              type="text"
              className="bg-[#182073] text-white pl-2 text-base font-semibold rounded-sm outline-0 p-2"
              placeholder="Exam Name..."
              value={searchExamName}
              onChange={(e) => handleExamNameChange(e)}
            />

            <input
              type="text"
              className="bg-[#182073] text-white pl-2 text-base font-semibold rounded-sm outline-0 p-2"
              placeholder="Created By..."
              value={searchCreatedBy}
              onChange={(e) => setSearchCreatedBy(e.target.value)}
            />
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="bg-[#182073] text-white flex items-center gap-2 cursor-pointer rounded-sm font-bold p-2 text-center"
            >
              Upload Question{" "}
              <FaCloudUploadAlt size={20} className="text-green-300" />
            </label>
            <button
              className="bg-[#182073] text-white flex items-center gap-2 rounded-sm font-bold px-4 py-2 text-center"
              onClick={handleSubmit}
            >
              Submit{" "}
              <IoCheckmarkDoneCircle size={20} className="text-green-300" />
            </button>
          </div>
        </div>
        
        <div className="ml-0  gap-2 flex mt-1">
          <button
            className="bg-[#182073] text-white flex items-center gap-2  rounded-sm font-bold p-2  text-center"
            onClick={handleDownload}
          >
            Sample CSV{" "}
            <IoIosCloudDownload size={20} className="text-green-300" />
          </button>
        </div>
      </div>
      {examNameError && <p className="text-red-500 text-sm -mt-6 w-64 px-4">{examNameError}</p>}
      {groupedData.length === 0 ? (
        <p className="text-lg text-red-400 text-center">
          No exam questions uploaded.
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
                  Exam Name
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Exam Link
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Created By
                </th>
                <th className="py-3 px-4 text-center text-[#182073] border-r border-[#182073]">
                  Questions Count
                </th>
                <th className="py-3 px-4 text-center text-[#182073]">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center text-gray-400">
                    {startIndex + index + 1}.
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.examname}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    <a href="https://www.disenosys.com/examall" className="text-blue-600 underline">https://www.disenosys.com/examall</a>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.createdBy}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.count}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {groupedData.length > 0 && (
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
