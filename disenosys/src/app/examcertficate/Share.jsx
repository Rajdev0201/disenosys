"use client";

import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../home/Home.css";
import "../globals.css";
import Single from "./Single"


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
        "https://disenosys-dkhj.onrender.com/upload-xl-exam",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Backend response:", response);

      if (response && response.data) {
        const updatedData = response.data.map((student) => {
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

  const generatePDF = async (id, name, course, score, email) => {
    setShowCertificate(true);
    try {
      const element = document.getElementById(id);

      const options = {
        margin: [0, 0, 0, 0],
        filename: `${name}_certificate.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2.5,useCORS: true  }, 
        jsPDF: { 
            unit: 'px', 
            format: [980, 724], 
            orientation: 'landscape' 
        }
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
      formData.append("score", score);
      await axios.post(
        "https://disenosys-dkhj.onrender.com/send-certificate-exam",
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
        student.score,
        student.email
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

  return (
    <>
      <div className="px-24 mt-6">
        <div className="p-6 border rounded shadow-lg">
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

        {/* <Single/> */}
      </div>

      {studentsData.length > 0 &&
        studentsData.map((student, index) => (
          <div
            key={index}
            id={`certificate-${index}`}
            className={`flex justify-center items-center min-h-screen certificate-container rounded c2 ${showCertificate ? "" : "hidden"}`}
          >
            <div className="w-[980px] h-[700px]">
            <div className="relative flex flex-col w-full h-full">
              <div className="absolute top-12 w-full text-center">
                <h1 className="text-8xl font-normal text-blue-900">
                  CERTIFICATE
                </h1>
                <p className="text-3xl font-bold text-gray-700 mt-6">
                  OF PARTICIPATION
                </p>
              </div>
              <div className="flex flex-col justify-center items-center h-full mt-20 text-center px-8">
                <p className="text-3xl font-normal text-gray-800">
                  This certificate is presented to:
                </p>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-8xl font-medium text-blue-900 mt-0 mb-6">
                    {student.name}
                  </h2>
                  <div className="w-full border-2 border-gray-800 mb-0 mt-5"></div>
                  <p className="text-xl font-semibold text-gray-800 mt-8 max-w-[800px]">
                    got for participating in CATIA exam and has scored{" "}
                    <span className="font-bold text-gray-800 underline">
                      {student.score}
                    </span>
                    %
                  </p>
                  <p className="text-xl font-semibold text-gray-800 max-w-[800px]">
                    {" "}
                    We wish them the best for future endeavors.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-20 w-full flex justify-center items-center px-20">
                <div className="text-center">
                  <p className="text-2xl font-medium text-gray-800">
                    Praveen Kumar
                  </p>
                  <p className="text-xl text-blue-800 font-medium">
                    CEO & Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
         ))} 

           <div
            
         
            className={`flex justify-center items-center min-h-screen certificate-container rounded c2 `}
          >
            <div className="w-[980px] h-[700px]">
            <div className="relative flex flex-col w-full h-full">
              <div className="absolute top-12 w-full text-center">
                <h1 className="text-8xl font-normal font-montster text-blue-900">
                  CERTIFICATE
                </h1>
                <p className="text-3xl font-bold text-gray-700 mt-6">
                  OF PARTICIPATION
                </p>
              </div>
              <div className="flex flex-col justify-center items-center h-full mt-20 text-center px-8">
                <p className="text-3xl font-normal text-gray-800">
                  This certificate is presented to:
                </p>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-6xl font-montster font-bold text-blue-900  mt-0 mb-6">
                   Rajkumar developer ssm
                  </h2>
                  <div className="w-full border-2 border-gray-800 mb-0 mt-5"></div>
                  <p className="text-xl font-semibold text-gray-800 mt-8 max-w-[800px]">
                    got for participating in CATIA exam and has scored{" "}
                    <span className="font-bold text-gray-800 underline">
                    90
                    </span>
                    %
                  </p>
                  <p className="text-xl font-semibold text-gray-800 max-w-[800px]">
                    {" "}
                    We wish them the best for future endeavors.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-20 w-full flex justify-center items-center px-20">
                <div className="text-center">
                  <p className="text-2xl font-medium text-gray-800">
                    Praveen Kumar
                  </p>
                  <p className="text-xl text-blue-800 font-medium">
                    CEO & Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
    </>
  );
};

export default CertificateComponent;
