"use client"
// import Image from 'next/image';
import React from 'react'
// import logo from "../assests/profile/logo.jpg"
import { FaCheckCircle } from 'react-icons/fa';
import "../home/Home.css"




 const  StudentApplicationForm = ({ data,isPdf, openModalPdf,closeModalPdf }) => {
    return (
        <>
        <div className=' border-gray-200 shadow-md p-4 gap-x-4 gap-y-3 rounded-md mt-6 w-1/4 flex flex-col justify-center'>
        <h1 className='text-2xl font-garet font-bold text-gray-800 text-center'>SAF FORM:</h1>
          <button
        onClick={openModalPdf}
        className="bg-blue-600 mt-5 text-white px-4 py-2 rounded-md font-garet"
      >
        View PDF
      </button>
      </div>
      {isPdf && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 w-3/4 rounded-md shadow-lg overflow-y-auto max-h-[95vh] relative">
            <button
              onClick={closeModalPdf}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Close
            </button>
        <h2 className="text-center text-2xl font-medium mb-12 mt-4">Student Application Form (SAF)</h2>

        <div className="grid grid-cols-2 gap-4 mb-4 px-8">
          <div>
            <p>First Name : {data.fname} </p>
            <p>Date of Birth : {data.dob}</p>
          </div>
          <div className='flex gap-'>
            <div>
            <p>Last Name : {data.lname}</p>
            <p>Gender : {data.gender}</p>
            </div>
            <div className="w-24 h-24 border border-gray-400 rounded-md mx-auto -mt-10">
                <img src={data.profile} alt='profile'/>
            </div>
          </div>
  
        </div>
  
      
        <div className="pdf-page">
        <h3 className="font-semibold mt-10 mb-2">Address Details</h3>
        <table className="w-full border-2 border-gray-500">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Permanent Address</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.permanent}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Communication Address</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.communication}</td>
            </tr>
          </tbody>
        </table>
  

        <h3 className="font-semibold mt-6 mb-2">Contact Details</h3>
        <table className="w-full border-2 border-gray-500">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Personal Mobile No 1</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.no1}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Personal Mobile No 2</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.no2}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Emergency Contact No</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.emg}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Personal Mail ID</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.email}</td>
            </tr>
          </tbody>
        </table>
  

        <h3 className="font-semibold mt-6 mb-2">Personal Details</h3>
        <table className="w-full border-2 border-gray-500 mb-3">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">PAN No</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.panno}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Aadhar No</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.aadharno}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Blood Group</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.blood}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Father Name</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.father}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Mother Name</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.mother}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Marital Status</td>
              <td className="p-2 w-1/2 border">{data.marital}</td>
            </tr>
          </tbody>
        </table>
         <div className='text-sm text-center text-gray-400'>page-1</div>
          </div>
 

          <div className="pdf-page">
        <h3 className="font-semibold mt-8 mb-2">Nominee Details</h3>
        <table className="w-full border-2 border-gray-500">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Nominee Name</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.n1}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Nominee DOB</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.ndob}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Nominee Relationship</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.nrealtion}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Nominee Address</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.naddress}</td>
            </tr>
          </tbody>
        </table>
  

        <h3 className="font-semibold mt-6 mb-2">Personal Bank Account Details</h3>
        <table className="w-full border-2 border-gray-500">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Bank Name</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.bank}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Branch</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.branch}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">A/c No</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.Ac}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">IFSC Code</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.IFSC}</td>
            </tr>
          </tbody>
        </table>
  

        <h3 className="font-semibold mt-6 mb-2">Academic Details</h3>
        <table className="w-full border-2 border-gray-500 mb-3">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Highest Qualification</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.Edu}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Passed Out Year</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.Passed}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Academy Name</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.Academy}</td>
            </tr>
          </tbody>
        </table>
        <div className='text-sm text-center text-gray-400'>page-2</div>
      </div>

      <div className="pdf-image">
        <h3 className="font-semibold mt-8 mb-2">Documents to be submit</h3>
        {data.isIndia === "yes" ? (
        <table className="w-full border-2 border-gray-500">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">➢ Academic Proof (10th, 12th, UG, PG)
              </td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.ug || data.pg ? <FaCheckCircle className='w-6 h-6 text-green-600'/> : "NA"}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">➢ 1 Passport Size Photo
              </td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.profile ? <FaCheckCircle className='w-6 h-6 text-green-600'/> : "NA"}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">➢ Updated Resume</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.file ? <FaCheckCircle className='w-6 h-6 text-green-600'/> : "NA"}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">➢ Aadhar, Voter ID and Pan Card</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.afile || data.pan ? <FaCheckCircle className='w-6 h-6 text-green-600'/> : "NA"}</td>
            </tr>
          </tbody>
        </table>
        ) : (
            <table className="w-full border-2 border-gray-500">
            <tbody>
              <tr className="border-2 border-gray-500">
                <td className="p-2 w-1/2 font-medium border-2 border-gray-500">➢ ID Proof
                </td>
                <td className="p-2 w-1/2 border-2 border-gray-500">{data.idProof ? 
                    <FaCheckCircle className='w-6 h-6 text-green-600'/> : "NA"
                }</td>
              </tr>
              <tr className="border-2 border-gray-500">
                <td className="p-2 w-1/2 font-medium border-2 border-gray-500">➢ Passport Size Photo
                </td>
                <td className="p-2 w-1/2 border-2 border-gray-500">{data.profile ? <FaCheckCircle className='w-6 h-6 text-green-600'/> : "NA"}</td>
              </tr>
            </tbody>
          </table> 
        )
    }
        <h3 className="font-semibold mt-6 mb-2">Course Details</h3>
        <table className="w-full border-2 border-gray-500 mb-3">
          <tbody>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Student ID</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.sid}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Registration Date</td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.rdate}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Course Name
              </td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.cdate}</td>
            </tr>
            <tr className="border-2 border-gray-500">
              <td className="p-2 w-1/2 font-medium border-2 border-gray-500">Course Mode
              </td>
              <td className="p-2 w-1/2 border-2 border-gray-500">{data.mode}</td>
            </tr>
          </tbody>
        </table>
        <div className='text-sm text-center text-gray-400'>page-3</div>
      </div>
      </div>
      </div>
      )}
      </>
    );
  }
  

  export default StudentApplicationForm;