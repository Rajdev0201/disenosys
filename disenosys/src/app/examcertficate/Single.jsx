"use client";
import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../home/Home.css";
import "../globals.css";

const CertificateSingle = () => {
  const [singleStudent, setSingleStudent] = useState({
    name: "",
    course: "",
    score:"",
    email: "",
  });



const [showCertificate, setShowCertificate] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSingleStudent((prev) => ({ ...prev, [name]: value }));
  };



  const generateSinglePDF = async (id, name, course, email,score) => {
   
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
            format: [980, 739], 
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
    

     //https://disenosys-dkhj.onrender.com
      await axios.post("https://disenosys-7dm5.onrender.com/send-single-certificate-exam", formData, {
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
    const { name, course, email,score } = singleStudent;
    if (!email || !name || !course || !score) {
      alert("Please fill all the fields.");
      return;
    }

    // setShowSendCertificateButton(true);
    const uniqueId = `certificate-single`;
    generateSinglePDF(uniqueId, name, course, email,score);
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
    <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">Course of exam:</span>
    <input
      type="text"
      name="course"
      value={singleStudent.course}
      onChange={handleInputChange}
      placeholder="Course"
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
      placeholder="Score"
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


  <button type="submit" className="bg-[#182073] w-36 p-2 font-semibold text-white mt-4 rounded">
    
    {showCertificate ? "Loading..." : "Send Certificate"}
  </button>
    {/* {showCertificate && <p className="mt-4 text-green-500">su...</p>}  */}
    
    {showCertificate ? <p className="text-blue-500 text-sm font-bold font-poppins">Please wait Your certificate is sending...</p> :" "}
</form>

        {/* {showSendCertificateButton && <p className="mt-4 text-green-500">Sending certificate...</p>} */}
          </div>

      {/* {showCertificate && ( */}
      <div id="certificate-single" className={`flex justify-center items-center min-h-screen certificate-container c2 ${showCertificate ? "" : "hidden"}`}>
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
                    {singleStudent.name}
                  </h2>
                  <div className="w-full border-2 border-gray-800 mb-0 mt-5"></div>
                  <p className="text-xl font-semibold text-gray-800 mt-8 max-w-[800px]">
                    got for participating in {singleStudent.course} exam and has scored{" "}
                    <span className="font-bold text-gray-800 underline">
                      {singleStudent.score}
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

export default CertificateSingle;
