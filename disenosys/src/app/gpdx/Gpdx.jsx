"use client"
import axios from "axios";
import React from "react";
import { MdOutlineDownloadForOffline } from "react-icons/md";

const Gpdx = () => {
    const handleDownload = async () => {
        try {
          const response = await axios.get('https://disenosys-1.onrender.com/exam/result', {
            responseType: 'blob', 
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}`;
          link.setAttribute('download', `GPDX_results_${formattedDate}.xlsx`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading the file:', error);
          alert('Failed to download the file',error);
        }
      };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#182073] w-96 h-64 rounded shadow-xl text-white">
        <div className="border-b-4 border-b-white">
          <h1 className="p-3 text-lg font-bold font-poopins text-center">
            Download Report
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-12">
           <button class="cursor-pointer bg-white px-3 py-2 rounded-md text-[#182073] tracking-wider shadow-xl animate-bounce hover:animate-none">
            <svg
              class="w-5 h-5"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </button>
           
           <button className="bg-[#057FE3] rounded text-white text-lg font-semibold ring-2 ring-white px-4 py-3 gap-2 flex items-center mt-5" onClick={handleDownload}>Download<MdOutlineDownloadForOffline className="w-6 h-6" /></button>
        </div>
      </div>
    </div>
  );
};

export default Gpdx;
