"use client";

import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../home/Home.css";
import "../globals.css";
import Image from "next/image";
import Single from "./Single";
import Nsdca from "../assests/profile/NSDCA.png";
import Signature from "../assests/profile/Signature.png";

const CertificateComponent = () => {
  const [file, setFile] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const [showCertificate, setShowCertificate] = useState(false);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSingleStudent((prev) => ({ ...prev, [name]: value }));
  // };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please upload an Excel file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://disenosys-dkhj.onrender.com/upload-xl-course",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Backend response:", response);

      if (response && response.data) {
        const updatedData = response.data.map((student) => {
          if (student.date) {
            const fromDate = new Date(student.date);
            if (!isNaN(fromDate.getTime())) {
              // Valid date
              student.date = fromDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            } else {
              console.error(`Invalid 'from' date: ${student.date}`);
            }
          }

          return student;
        });
        setStudentsData(updatedData);
        setIsUploaded(true);
      } else {
        alert("No student data received.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const generatePDF = async (id, name, course, date, email, udin) => {
    setShowCertificate(true);
    try {
      const element = document.getElementById(id);

      const options = {
        margin: [0, 0, 0, 0],
        filename: `${name}_certificate.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2.5, useCORS: true },
        jsPDF: {
          unit: "px",
          format: [1080, 776],
          orientation: "landscape",
        },
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
      formData.append("date", date);
      formData.append("udin", udin);
      await axios.post(
        "https://disenosys-dkhj.onrender.com/send-certificate-course",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(`Certificate sent to ${email}`);
    } catch (error) {
      alert("Error generating or sending certificate", error);
      console.error("Error generating or sending certificate:", error);
    }
    setShowCertificate(false);
  };

  const sendCertificates = async () => {
    setIsSending(true);

    const emailPromises = studentsData.map(async (student, index) => {
      const uniqueId = `certificate-${index}`;

      console.log(
        "Sending certificate for:",
        student.name,
        "Course:",
        student.course,
        "Email:",
        student.email
      );

      if (!student.email) {
        console.error("No email found for student:", student);
        return;
      }

      await generatePDF(
        uniqueId,
        student.name,
        student.course,
        student.date,
        student.email,
        student.udin
      );
    });

    await Promise.all(emailPromises);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      if (setIsSent) {
        alert("Certificates have been successfully sent!");
      } else {
        alert("certificate have not been sent!");
      }
    }, 2000);
  };

  const handleDownload = async () => {
    try {

      const response = await axios.get('https://disenosys-dkhj.onrender.com/api/student/demo', {
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
          <h3 className="text-lg font-bold text-[#182073]">
            Send Certificate to Bulk Student
          </h3>
          <form
            onSubmit={handleUpload}
            className="border border-gray-300 shadow-lg rounded w-[478px] flex mt-2"
          >
            <input type="file" onChange={handleFileChange} className="p-2" />
            <button
              type="submit"
              className="bg-[#182073] text-white font-semibold 
              
              p-2 rounded"
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

        <Single />
      </div>

 

      {studentsData.length > 0 &&
        studentsData.map((student, index) => (
          <div
            key={index}
            id={`certificate-${index}`}
            className={`certificate-bg w-[1100px] h-full p-10 relative ${
              showCertificate ? "" : "hidden" //hidden
            }`}
          >
            <div className="text-center mt-32">
    <h2 className="text-5xl space-x-2 text-[#182073] font-semibold  font-josefin ">CERTIFICATE</h2>
    <p className="text-3xl font-light font-josefin mt-2">OF ACHIEVEMENT</p>
  </div>


            <div className=" flex flex-col items-center justify-center">
            <p className="text-xl mt-10 font-light font-nunito">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
              <h2 className="text-5xl font-bold mt-4 text-[#182073] font-montheavy">
                {student.name}
              </h2>
              <div className="w-[600px] border-2 border-gray-800 mb-0 mt-7"></div>
            </div>

            <div className="text-center mt-5">
              <p className="text-xl font-light font-nunito">
                for successfully completing the course on
              </p>
              <p className="text-3xl font-light font-lexend text-blue-500 mt-2">
                {student.course.toUpperCase()}
              </p>
            </div>

            <div className="flex justify-between items-center mt-16">
              <div className="flex items-center justify-center">
                <div className="mt-4">
                  <p className="text-sm font-light font-sans text-center text-gray-800">
                    Accredited by
                  </p>
                  <Image
                    src={Nsdca}
                    alt="Accreditation Logo"
                    className="object-cover w-28 h-28 w-auto"
                  />
                </div>

                <div className="mt-12 px-16">
                  <p className="text-sm font-light font-sans">
                    Certificate UDIN :{" "}
                    <span className="font-light">{student.udin}</span>
                  </p>
                  <p className="text-sm font-light font-sans">
                    Completion Date :{" "}
                    <span className="font-light">{student.date}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-end items-end mt-8 mr-16">
                <Image
                  src={Signature}
                  alt="signature"
                  className="text-blue-600 w-40 h-20"
                />
                <div className="border border-b-2 border-gray-900 w-40"></div>
                <p className="text-xl font-bold text-blue-900 -mt-2">
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
