"use client";
import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../home/Home.css";
import "../globals.css";
import Nsdca from "../assests/profile/NSDCA.png";
import Signature from "../assests/profile/Signature.png";
import Image from "next/image";

const CertificateSingle = () => {
  const [singleStudent, setSingleStudent] = useState({
    name: "",
    course: "",
    date:"",
    udin:"",
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

  const generateSinglePDF = async (id, name, course, email,udin,date) => { 
   
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
            format: [1080, 776], 
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
      formData.append("date", date);
      formData.append("udin", udin);
      
    

     
      await axios.post("https://disenosys-dkhj.onrender.com/send-single-certificate-course", formData, {
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
    const { name, course, email,udin,date } = singleStudent;
    if (!email || !name || !course || !course ||!udin ||!date) {
      alert("Please fill all the fields.");
      return;
    }

    // setShowSendCertificateButton(true);
    const uniqueId = `certificate-single`;
    generateSinglePDF(uniqueId, name, course, email,udin,date);
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
    <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">Name of Course:</span>
    <input
      type="text"
      name="course"
      value={singleStudent.course}
      onChange={handleInputChange}
      placeholder="Course Name"
      required
      className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
    />
  </div>

  <div className="flex items-center mt-2 space-x-6">
    <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">UDIN NO:</span>
    <input
      type="text"
      name="udin"
      value={singleStudent.udin}
      onChange={handleInputChange}
      placeholder="UDIN no"
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
      <div  
        id="certificate-single"
       className={`certificate-bg w-[1100px] h-full p-10 relative ${showCertificate ? "" : "hidden"}`}
       >
  <div className="text-center mt-32">
    <h2 className="text-5xl space-x-2 text-[#182073] font-semibold  font-josefin ">CERTIFICATE</h2>
    <p className="text-3xl font-light font-josefin mt-2">OF ACHIEVEMENT</p>
  </div>

  <div className=" flex flex-col items-center justify-center">
    <p className="text-xl mt-10 font-light font-nunito">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
    <h2 className="text-5xl font-bold mt-4 text-[#182073] font-montheavy">{singleStudent.name}</h2>
    <div className="w-[600px] border-2 border-gray-800 mb-0 mt-7"></div>
  </div>

  <div className="text-center mt-5">
    <p className="text-xl font-light font-nunito">
      for successfully completing the course on
    </p>
    <p className="text-3xl font-light font-lexend text-blue-500 mt-2">
      {singleStudent.course.toUpperCase()}
    </p>
  </div>

  <div className="flex justify-between items-center mt-16">
    <div className="flex items-center justify-center">
      <div className="mt-4">
      <p className="text-sm font-light text-center text-gray-800 font-sans">Accredited by</p>
        <Image
          src={Nsdca}
          alt="Accreditation Logo"
          className="object-cover w-28 h-28 w-auto"
        />
      </div>

    <div className="mt-12 px-16">
      <p className="text-sm font-light font-sans">Certificate UDIN : <span className="font-light">{singleStudent.udin}</span></p>
      <p className="text-sm font-light font-sans">Completion Date : <span className="font-light">{formattedDate}</span></p>
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

    
    </>
  );
};

export default CertificateSingle;
