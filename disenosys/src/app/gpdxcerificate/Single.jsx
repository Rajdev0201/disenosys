"use client";
import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../home/Home.css";
import "../globals.css";
import Signature from "../assests/profile/Signature.png";
import Image from "next/image";
import logo from "../assests/profile/logo.jpg"

const CertificateSingle = () => {
  const [singleStudent, setSingleStudent] = useState({
    name: "",
    score: "",
    date:"",
    email: "",
  });



const [showCertificate, setShowCertificate] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSingleStudent((prev) => ({ ...prev, [name]: value }));
  };

 
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  const formattedDate = formatDate(singleStudent.date);

  const generateSinglePDF = async (id, name, email,score,date) => { 
   
    setShowCertificate(true);
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
      formData.append("score", score);
      formData.append("date", date);
 
    
      await axios.post("https://disenosys-dkhj.onrender.com/send-single-gpdx", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`Certificate sent to ${email}`);
    } catch (error) {
      alert("Error generating or sending certificate")
      console.error("Error generating or sending certificate:", error);
    }
    setShowCertificate(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email,score,date } = singleStudent;
    if (!email || !name  ||!score ||!date) {
      alert("Please fill all the fields.");
      return;
    }

    // setShowSendCertificateButton(true);
    const uniqueId = `certificate-single`;
    generateSinglePDF(uniqueId, name, email,score,date);
  };

  return (
    <>
       <div className="mt-10 p-6 border rounded shadow-lg">
        <h3 className="text-lg font-bold text-[#182073]">Send Certificate to Single Student</h3>
        <form onSubmit={handleSubmit} className="flex flex-col bg-blue-50 p-6 rounded">
  <div className="flex items-center mt-2 space-x-6">
    <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">Student Name:</span>
    <input
      type="text"
      name="name"
      value={singleStudent.name}
      onChange={handleInputChange}
      placeholder="Name"
      required
      className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
    />
  </div>

  <div className="flex items-center mt-2 space-x-6">
    <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">Student Email:</span>
    <input
      type="email"
      name="email"
      value={singleStudent.email}
      onChange={handleInputChange}
      placeholder="Email"
      required
      className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
    />
  </div>

  <div className="flex items-center mt-2 space-x-6">
    <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">Score:</span>
    <input
      type="text"
      name="score"
      value={singleStudent.score}
      onChange={handleInputChange}
      placeholder="Course Name"
      required
      className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
    />
  </div>



  <div className="flex items-center mt-2 space-x-6">
    <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">Completion Date:</span>
    <input
      type="date"
      name="date"
      value={singleStudent.date}
      onChange={handleInputChange}
      placeholder="Completion date"
      required
      className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
    />
  </div>

  


  <button type="submit" className="bg-[#182073] w-36 p-2 font-semibold text-white mt-4 rounded">
    
    {showCertificate ? "Loading..." : "Send Certificate"}
  </button>
    {/* {showCertificate && <p className="mt-4 text-green-500">su...</p>}  */}
    
    {showCertificate ? <p className="text-blue-500 text-sm font-bold font-poppins">Please wait Your certificate is sending...</p> :" "}
</form>

        {/* {showSendCertificateButton && <p className="mt-4 text-green-500">Sending certificate...</p>} */}
          </div>

      {/* {showCertificate && ( */}
     
      <div id="certificate-single" className={`flex justify-center items-center min-h-screen ${showCertificate ? "" : "hidden"}`}>
      <div className="flex flex-col w-[1400px] rounded relative overflow-hidden h-[1000px] bg-center hover:cursor-pointer gpdx-bg px-16">
      <div className="">
           <Image src={logo} className="object-cover w-[300px] h-[300px] -mt-16"/>
        </div>
        <div className="flex flex-col items-start justify-start text-center -mt-36">
          <h2 className="text-8xl text-gray-700 font-semibold font-josefin">
            CERTIFICATE
          </h2>
          <p className="text-5xl font-light font-josefin mt-4 mx-1">
            OF ACHIEVEMENT
          </p>
        </div>

        <div className="flex flex-col items-start justify-start mt-9 mx-2">
          <p className="text-2xl font-medium text-gray-600 font-poppins mx-1">
            Presented to
          </p>
          <h3 className="text-5xl font-bold text-gray-800 font-josefin mt-2">
          {singleStudent.name}
          </h3>
        </div>

        <div className="mt-9 flex flex-col items-start justify-start mx-2">
          <p className="text-2xl font-medium text-gray-600 font-poppins mx-1">
            For successfully completing the
          </p>
          <h4 className="text-3xl font-semibold text-gray-800 mt-4">
            GPDX Certification Exam
          </h4>
          <p className="text-xl font-light text-gray-800 mt-6">
            Score: <span className="font-bold">{singleStudent.score}</span>
          </p>
          <p className="text-xl font-light text-gray-800 mt-2">
            Date of Completion: <span className="font-bold">{formattedDate}</span>
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-start mx-2 w-3/4">
          <p className="text-xl font-medium text-gray-800 leading-relaxed">
            This certificate is awarded in recognition of your skills,
            knowledge, and commitment to excellence.
          </p>
        </div>
        <div className="flex flex-col items-end justify-end mt-24">
          {/* <p className="text-2xl font-light text-gray-600">Authorized by:</p>
          <Image
                  src={Signature}
                  alt="signature"
                  className="text-blue-600 w-64 mt-2"
                /> */}
                <p className="text-xl font-bold text-blue-900 mt-24">
                  PRAVEEN KUMAR S
                </p>
                <p className="text-gray-700 text-center mr-5">CEO, Disenosys</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CertificateSingle;
