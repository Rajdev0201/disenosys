"use client";

import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../../home/Home.css";
import Image from "next/image";
import logo from "../../assests/profile/l.jpg";
import "../../globals.css";
import SingleCertificate from "./SingleStudent.jsx"

const CertificateComponent = () => {
  const [file, setFile] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const [showCertificate, setShowCertificate] = useState(false);






  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSingleStudent((prev) => ({ ...prev, [name]: value }));
  };


  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!file) return alert("Please upload an Excel file");
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("https://disenosys-dkhj.onrender.com/upload-xl", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Backend response:", response);
  
      if (response && response.data) {
        const updatedData = response.data.map((student) => {
          
          if (student.from) {
            const fromDate = new Date(student.from);
            if (!isNaN(fromDate.getTime())) { // Valid date
              student.from = fromDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            } else {
              console.error(`Invalid 'from' date: ${student.from}`);
            }
          }
  
        
          if (student.to) {
            const toDate = new Date(student.to);
            if (!isNaN(toDate.getTime())) { 
              student.to = toDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            } else {
              console.error(`Invalid 'to' date: ${student.to}`);
            }
          }

          if (student.awardedDate) {
            const toDate = new Date(student.awardedDate);
            if (!isNaN(toDate.getTime())) { // Valid date
              student.awardedDate = toDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            } else {
              console.error(`Invalid 'to' date: ${student.award}`);
            }
          }
  
          return student;
        });
  
        setStudentsData(updatedData);
        setIsUploaded(true);
        setFile(null);
        document.getElementById("fileInput").value = "";                 
      } else {
        alert("No student data received.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };
  
  
  const generatePDF = async (id, name, course, from, to,awardedDate, email) => {
    setShowCertificate(true)
    try {
      const element = document.getElementById(id);
  
      const options = {
        margin: 0,
        filename: `${name}_certificate.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2.5 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
  
      const pdfDataUrl = await html2pdf()
        .from(element)
        .set(options)
        .outputPdf("datauristring");
  
      const formData = new FormData();
      formData.append("pdfDataUrl", pdfDataUrl);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("course", course);
     //https://disenosys-dkhj.onrender.com
     
      await axios.post("https://disenosys-dkhj.onrender.com/send-certificate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log(`Certificate sent to ${email}`);
    } catch (error) {
      alert("Error generating or sending certificate", error)
      console.error("Error generating or sending certificate:", error);
    }
    setShowCertificate(false)
  };


  

  const sendCertificates = async () => {
    setIsSending(true);
  
    const emailPromises = studentsData.map(async (student, index) => {
      const uniqueId = `certificate-${index}`; 
  
      console.log("Sending certificate for:", student.name, "Course:", student.course, "Email:", student.email);
  
      if (!student.email) {
        console.error("No email found for student:", student);
        return;
      }
  
      await generatePDF(uniqueId, student.name, student.course, student.from, student.to, student.awardedDate, student.email);
    });
  
    await Promise.all(emailPromises);
  
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      if(setIsSent){
        alert("Certificates have been successfully sent!");
      }else{
        alert("certificate have not been sent!");
      }
     
    }, 2000);
 
  };
  
  const handleDownload = async () => {
    try {

      const response = await axios.get('https://disenosys-dkhj.onrender.com/api/student/demo-intern', {
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
    <>
      <div className="px-24 mt-6">
        <div className="p-6 border rounded shadow-lg flex justify-between items-center">
          <div className="flex flex-col">
        <h3 className="text-lg font-bold text-[#182073]">Send Certificate to Bulk Student</h3>
        <form onSubmit={handleUpload} className="border border-gray-300 shadow-lg rounded w-[478px] flex mt-2">
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="p-2"
          />
          <button
            type="submit"
            className="bg-[#182073] text-white p-2 rounded"
          >
            Upload Excel
          </button>
        </form>

        <div className="mt-4">
          {isUploaded ? (
            <div>
              <p className="text-green-500">
                Now you can send the certificates to students.
              </p>
              <button
                onClick={sendCertificates}
                disabled={isSending}
                className={`bg-green-500 text-white p-2 rounded mt-2 ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSending ? "Sending Certificates..." : "Send Certificates"}
              </button>
            </div>
          ) : (
            <p className="text-gray-700">
              Please upload the certificates before sending.
            </p>
          )}
        </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button
              type="submit"
              className="bg-[#182073] w-44 h-12 text-white font-semibold 
              p-2 rounded"
              onClick={handleDownload}
            >
              Sample_sheet.xlsx
            </button>
            <span className="text-sm text-green-500 font-bold ">Here,You can download sample xl_sheet *</span>
            </div>
        </div>

        <SingleCertificate/>
      </div>




      {studentsData.length > 0 &&
        studentsData.map((student,index) => (
          <div
          key={index} id={`certificate-${index}`} 
            className={`flex justify-center items-center min-h-screen ${showCertificate ? "" : "hidden"}`}
          >
            <div className="w-[1000px] rounded relative overflow-hidden h-[1123px] bg-center hover:cursor-pointer c">
              <div className="ml-8 text-center flex flex-col items-center">
                <div className="w-64 h-24 mr-12 mb-8">
                  <Image src={logo} alt="logo" className="text-blue-600" />
                </div>
                <h2 className="text-[#cc1919] font-medium text-8xl font-berlin ml-36">
                  Certificate
                </h2>
                <p className="text-6xl font-medium font-berlin text-gray-700 mr-2 ml-16">
                  of Internship
                </p>
              </div>
{/* 
              <div className="mt-8 ml-8 flex flex-col items-center ">
                <p className="text-3xl font-berlin font-light text-gray-800 mr-16 mb-4 text-center">
                  This certifies that
                </p>
                <h3 className="text-[#cc1919] font-medium text-7xl font-sans ml-24 mb-4 text-center font-brush cname">
                  {student.name}
                </h3>
              </div> */}

              <div className="mt-2 ml-10 flex flex-col items-center">
              <p className="text-3xl mt-8  font-berlin font-light text-gray-800 ml-52 w-[480px]">
                  This certifies that
                </p>
                <p className={`text-[#cc1919] font-medium ml-52 w-[480px] font-brush cname mb-6 ${
                student?.name?.length > 15 ? "text-4xl" : "text-5xl"
              }`}>
                  {student.name}
                </p>

                <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">has completed the<span className="font-semibold"> {student.course}</span> at Diseñosys from<span className="font-semibold"> {student.from} </span> to <span className="font-semibold">{student.to}</span>.
                </p>
                <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">
                  We found him/her sincere, hardworking, dedicated, and
                  result-oriented. He/She worked well as part of the team during
                  his/her tenure.
                </p>
                <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">
                  We take this opportunity to thank and wish him/her all the
                  best for his/her future.
                </p>
                <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">
                  Awarded on{" "}
                  <span className="font-semibold">{student.awardedDate}</span>
                </p>
              </div>
              <div className="absolute bottom-[264px] right-16 flex flex-col items-end">
                {/* <Image
                  src={s}
                  alt="signature"
                  className="text-blue-600 w-40 h-20"
                /> */}
                {/* <div className="border border-b-2 border-gray-900 w-40"></div> */}
                <p className="text-lg font-bold text-blue-900">
                  PRAVEEN KUMAR S
                </p>
                <p className="text-gray-700 text-center mr-5">CEO, Disenosys</p>
              </div>
            </div>
          </div>
        ))}


    </>
  );
};

export default CertificateComponent;
