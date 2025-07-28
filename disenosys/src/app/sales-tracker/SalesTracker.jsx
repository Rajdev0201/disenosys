"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, updateLead } from "../Redux/action/leads";
const statusOptions = ["Pending", "Spoke", "Enrolled"];

const SalesTracking = () => {
  //   const [students, setStudents] = useState([
  //     {
  //       _id: "1",
  //       name: "Arjun Kumar",
  //       email: "arjun.kumar@example.com",
  //       phone: "9876543210",
  //       enquiry: "Interested in MERN Stack course",
  //       wpResponse: "Interested",
  //       status: "Pending",
  //     },
  //     {
  //       _id: "2",
  //       name: "Sneha Raj",
  //       email: "sneha.raj@example.com",
  //       phone: "9123456789",
  //       enquiry: "Wants details about Data Science internship",
  //       wpResponse: "Interested",
  //       status: "Spoke",
  //     },
  //     {
  //       _id: "3",
  //       name: "Rahul Dev",
  //       email: "rahul.dev@example.com",
  //       phone: "9012345678",
  //       enquiry: "Asked for Backend Developer training",
  //       wpResponse: "Interested",
  //       status: "Interested",
  //     },
  //     {
  //       _id: "4",
  //       name: "Divya Sharma",
  //       email: "divya.sharma@example.com",
  //       phone: "9988776655",
  //       enquiry: "Enquired about full stack program duration",
  //       wpResponse: "Not Interested",
  //       status: "Not Interested",
  //     },
  //     {
  //       _id: "5",
  //       name: "Vikram Reddy",
  //       email: "vikram.reddy@example.com",
  //       phone: "9900112233",
  //       enquiry: "Requested placement support info",
  //       wpResponse: "Interested",
  //       status: "Enrolled",
  //     },
  //   ]);
  
  const { leads, loading } = useSelector((state) => state.leads);
  const dispatch = useDispatch();


  const handleStatusChange = (id, newStatus) => {
    dispatch(updateLead(id, newStatus));
  };

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-garet">
        {!loading ? (
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-500 text-center">
          Sales Tracking Dashboard
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border text-left text-sm">
            <thead className="bg-gray-200 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Enquiry</th>
                <th className="px-4 py-3">Whatsapp-Response</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {leads?.data?.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{student.fullName}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.phone}</td>
                  {/* <td className="px-4 py-2">{student.enquiry}</td> */}
                  <td className="px-4 py-2">{student.engagementType}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-sm rounded font-medium
      ${
        student.status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : student.status === "Interested"
          ? "bg-green-100 text-green-800"
          : student.status === "Not Interested"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800"
      }
    `}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border px-2 py-1 rounded"
                      value={student.updatedStatus}
                      onChange={(e) =>
                        handleStatusChange(student._id, e.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`https://wa.me/${student.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-medium hover:underline"
                    >
                      Message
                    </a>
                  </td>
                </tr>
              ))}

              {leads?.data?.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No student enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        ):(
            <span className="text-center text-green-500">Loading.....</span>
        )
        }
    </div>
  );
};

export default SalesTracking;
