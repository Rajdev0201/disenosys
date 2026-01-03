"use client";
import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js"
import "../home/Home.css";
import Image from "next/image";
import Signature from "../assests/profile/Signature.png";
import SingleCertificate from "./Single";
import logo from "../assests/profile/logo.jpg"
const Share = () => {
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
        const response = await axios.post("https://disenosys-7dm5.onrender.com/upload-xl-gpdx", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        console.log("Backend response:", response);
    
        if (response && response.data) {
          const updatedData = response.data.map((student) => {
  
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
    
    
    const generatePDF = async (id, name,awardedDate, email,score) => {
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
        formData.append("score", score);
        formData.append("awardedDate", awardedDate);
    
        await axios.post("https://disenosys-7dm5.onrender.com/send-gpdxcourse", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        console.log(`Certificate sent to ${email}`);
        alert("Certificates have been successfully sent!")
      } catch (error) {
        return alert("Error generating or sending certificate", error)
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
    
        await generatePDF(uniqueId, student.name, student.awardedDate, student.email,student.score);
      });
    
      await Promise.all(emailPromises);
    
      setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
        if(setIsSent){
          console.log("");
        }else{
          alert("certificate have not been sent!");
        }
       
      }, 2000);
   
    };

    const handleDownload = async () => {
      try {
  
        const response = await axios.get('https://disenosys-7dm5.onrender.com/api/student/demo-gpdx', {
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




    {studentsData?.length > 0 &&
      studentsData.map((student,index) => (
            <div key={index} id={`certificate-${index}`}  className={`flex justify-center items-center min-h-screen   ${showCertificate ? "" : "hidden"}`}>
      <div className="flex flex-col w-[1400px] rounded relative overflow-hidden h-[1000px] bg-center hover:cursor-pointer gpdx-bg px-16 ">
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
          {student.name}
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
            Score: <span className="font-bold">{student.score}</span>
          </p>
          <p className="text-xl font-light text-gray-800 mt-2">
            Date of Completion: <span className="font-bold">{student.awardedDate}</span>
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
      ))}

  </>
  );
};

export default Share;
