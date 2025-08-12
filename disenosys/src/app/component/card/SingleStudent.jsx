"use client";
import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../../home/Home.css";
import Image from "next/image";
import logo from "../../assests/profile/l.jpg";
// import s from "../../assests/profile/Signature.png";
import "../../globals.css";

const CertificateSingle = () => {
  const [singleStudent, setSingleStudent] = useState({
    name: "",
    course: "",
    from: "",
    to: "",
    email: "",
    award: "",
  });

  //   const [isSending, setIsSending] = useState(false);
  //   const [showCertificate, setShowCertificate] = useState(false);
  //   const [showSendCertificateButton, setShowSendCertificateButton] = useState(false);

  const [showCertificate, setShowCertificate] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSingleStudent((prev) => ({ ...prev, [name]: value }));
  };

  function formatDate(dateString) {
    const date = new Date(dateString); // Convert the string to a Date object
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const formattedFromDate = formatDate(singleStudent.from);
  const formattedToDate = formatDate(singleStudent.to);
  const formattedAward = formatDate(singleStudent.award);

  const generateSinglePDF = async (
    id,
    name,
    course,
    from,
    to,
    award,
    email
  ) => {
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
      formData.append("course", course);

      await axios.post(
        "https://disenosys-dkhj.onrender.com/send-single-certificate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(`Certificate sent to ${email}`);
    } catch (error) {
      alert("Error generating or sending certificate");
      console.error("Error generating or sending certificate:", error);
    }
    setShowCertificate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, course, from, to, award, email } = singleStudent;
    if (!email || !name || !course || !from || !to || !award) {
      alert("Please fill all the fields.");
      return;
    }

    // setShowSendCertificateButton(true);
    const uniqueId = `certificate-single`;
    generateSinglePDF(uniqueId, name, course, from, to, award, email);
  };

  return (
    <>
      <div className="mt-10 p-6 border rounded shadow-lg">
        <h3 className="text-lg font-bold text-[#182073]">
          Send Certificate to Single Student
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-blue-50 p-6 rounded"
        >
          <div className="flex items-center mt-2 space-x-6">
            <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">
              Student Name:
            </span>
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
            <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">
              Course Name:
            </span>
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
            <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">
              From:
            </span>
            <input
              type="date"
              name="from"
              value={singleStudent.from}
              onChange={handleInputChange}
              placeholder="From"
              required
              className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
            />
          </div>

          <div className="flex items-center mt-2 space-x-6">
            <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">
              To:
            </span>
            <input
              type="date"
              name="to"
              value={singleStudent.to}
              onChange={handleInputChange}
              placeholder="To"
              required
              className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
            />
          </div>

          <div className="flex items-center mt-2 space-x-6">
            <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">
              Student Email:
            </span>
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
            <span className="w-[400px] text-lg font-bold font-poppins text-[#182073]">
              Awarded Date:
            </span>
            <input
              type="date"
              name="award"
              value={singleStudent.award}
              onChange={handleInputChange}
              placeholder="Award Date"
              required
              className="border p-2 w-[800px] bg-blue-50 shadow-sm rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-[#182073] w-36 p-2 text-white mt-4 rounded"
          >
            {showCertificate ? "Loading..." : "Send Certificate"}
          </button>
          {/* {showCertificate && <p className="mt-4 text-green-500">su...</p>}  */}

          {showCertificate ? (
            <p className="text-blue-500 text-sm font-bold font-poppins">
              Please wait Your certificate is sending...
            </p>
          ) : (
            " "
          )}
        </form>

        {/* {showSendCertificateButton && <p className="mt-4 text-green-500">Sending certificate...</p>} */}
      </div>

      {/* {showCertificate && ( */}
      <div
        id="certificate-single"
        className={`flex justify-center items-center min-h-screen ${
          showCertificate ? "" : "hidden"
        }`}
      >
        <div className="w-[1000px] rounded relative overflow-hidden h-[1123px] bg-center hover:cursor-pointer c">
          <div className="ml-8 text-center flex flex-col items-center">
            <div className="w-64 h-24 mr-12 mb-8">
              <Image src={logo} alt="logo" className="text-blue-600" />
            </div>
            <h2 className="text-[#cc1919] font-medium text-7xl font-vanquish  ml-20">
              Certificate
            </h2>
            <p className="text-5xl font-medium font-today-sans-serif text-gray-700 mr-2 ml-4">
              of Internship
            </p>
          </div>

          {/* <div className="mt-8 ml-8 flex flex-col items-center ">
                <p className="text-3xl font-berlin font-light text-gray-800 mr-16 mb-4 ">
                  This certifies that
                </p>
                <p className="text-[#cc1919] font-medium text-7xl font-sans ml-24 mb-4">
                  {singleStudent.name}
                </p> Saim Wajid Quereshi
              </div> */}

          <div className="mt-2 ml-10 flex flex-col items-center">
            <p className="text-3xl mt-8  font-berlin font-light text-gray-800 ml-52 w-[480px]">
              This certifies that
            </p>
            <p
              className='text-[#cc1919] font-medium ml-52 w-[480px] font-brush cname mb-6 text-6xl'
            >
              {singleStudent.name}
            </p>
            <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">
              has completed the
              <span className="font-semibold"> {singleStudent.course}</span> at
              Diseñosys from
              <span className="font-semibold"> {formattedFromDate} </span> to{" "}
              <span className="font-semibold">{formattedToDate}</span>.
            </p>
            <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">
              We found him/her sincere, hardworking, dedicated, and
              result-oriented. He/She worked well as part of the team during
              his/her tenure.
            </p>
            <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">
              We take this opportunity to thank and wish him/her all the best
              for his/her future.
            </p>
            <p className="text-md mt-4 text-gray-700 ml-52 w-[480px]">
              Awarded on <span className="font-semibold">{formattedAward}</span>
            </p>
          </div>

          <div className="absolute bottom-[264px] right-16 flex flex-col items-end">
            {/* <Image src={s} alt="signature" className="text-blue-600 w-40 h-20" /> */}
            {/* <div className="border border-b-2 border-gray-900 w-40"></div> */}
            <p className="text-lg font-bold text-blue-900">
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
