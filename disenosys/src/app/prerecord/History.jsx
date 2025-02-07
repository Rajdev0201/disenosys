"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { payment } from '../Redux/action/Payment';
import { GrInProgress } from 'react-icons/gr';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { Pagination } from '../component/Pagination';
import { AiOutlineClose } from 'react-icons/ai';

const History = () => {
  const dispatch = useDispatch();
  const pay = useSelector((state) => state.payment);
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;
  console.log(pay);
  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);
 
  const [newPayment, setNewPayment] = useState({
    sessionId: "",
    customerDetails: {
      name: "",
      email: "",
    },
    lineItems: [
      {
        name: "",
        price: 0,
        totalPrice: 0,
      },
    ],
    mode: "Offline",
    isPaid: true,
  });

  const courses = [
    {
      value: "CATIA Foundations for Automotive Designers",
      label: "CATIA Foundations for Automotive Designers",
    },
    { value: "Advanced CATIA Surface", label: "Advanced CATIA Surface" },
    {
      value: "Fundamentals Of BIW in Automotive Design",
      label: "Fundamentals Of BIW in Automotive Design",
    },
    {
      value: "Fundamentals of Plastic Trims",
      label: "Fundamentals of Plastic Trims",
    },
    { value: "Solid Model Remastering", label: "Solid Model Remastering" },
    {
      value: "Automotive B-Pillar Assembly",
      label: "Automotive B-Pillar Assembly",
    },
    { value: "Bracket And Reinforcement", label: "Bracket And Reinforcement" },
    {
      value: "Automotive Close Volume & Feature Creation",
      label: "Automotive Close Volume & Feature Creation",
    },
    {
      value: "Surface Remastering for Automotive Designers",
      label: "Surface Remastering for Automotive Designers",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" || name === "email") {
      setNewPayment((prev) => ({
        ...prev,
        customerDetails: {
          ...prev.customerDetails,
          [name]: value,
        },
      }));
    } else if (
      name === "courseName" ||
      name === "price" ||
      name === "totalPrice"
    ) {
      setNewPayment((prev) => ({
        ...prev,
        lineItems: [
          {
            ...prev.lineItems[0],
            [name === "courseName" ? "name" : name]:
              name === "price" || name === "totalPrice" ? Number(value) : value, 
          },
        ],
      }));
    } else {
      setNewPayment((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  useEffect(() => {
    const filtered = pay?.data?.filter((item) => 
      item.customerDetails.name.toLowerCase().includes(search.toLowerCase()) ||
      item.lineItems[0]?.name?.toLowerCase().includes(search.toLowerCase()) || 
      item.sessionId.toLowerCase().includes(search.toLowerCase()) ||
      new Date(item.createdAt).toLocaleDateString().toLowerCase().includes(search.toLowerCase())
    );
  
    setFilteredData(filtered);
  }, [search, pay]);
  

  

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://disenosys-dkhj.onrender.com/course/offline-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPayment),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
      
      if (data.success) {
        dispatch(payment());
      }
      alert("Student Paid data added");
    } catch (error) {
      console.error(error);
      alert("Student added data is failed");
    }
    setShowPopup(false);
  };

  return (
    <div>
         <h2 className="text-[#0d1039] font-medium text-4xl text-center font-garet mb-1 mt-5">
        Students-Prerecord
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-20 gap-4  font-garet ">
        <div className="flex items-center">
          <div className="flex items-center bg-blue-500 justify-center w-10  rounded-tl-lg rounded-bl-lg border-r border-gray-200 p-3">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none w-5  fill-white"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="bg-gray-300 pl-2 text-base font-medium outline-0 p-2  rounded-tr-lg rounded-br-lg "
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          Add Students
        </button>
      </div>
           <div className="px-8  font-garet ">
                       {paginatedData?.length === 0 ? (
                   <p className="text-lg text-red-500 text-center font-semibold">
                     No Students added!.
                   </p>
                 ) : (
                   <div className="w-full overflow-x-auto">
                     <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                       <thead className="bg-blue-500 text-white font-sans">
                         <tr>
                           <th className="py-3 px-4 text-center border-r border-gray-300">S.No</th>
                           <th className="py-3 px-4 text-center border-r border-gray-300">Name</th>
                           <th className="py-3 px-4 text-center border-r border-gray-300">Email</th>
                           <th className="py-3 px-4 text-center border-r border-gray-300">Section</th>
                           <th className="py-3 px-4 text-center border-r border-gray-300">Course Name</th>
                           {/* <th className="py-3 px-4 text-center border-r border-gray-300">
                                  Start Date
                          </th>
                          <th className="py-3 px-4 text-center border-r border-gray-300">
                                  End Date
                          </th>
                          <th className="py-3 px-4 text-center border-r border-gray-300">
                              Status
                          </th> */}
                         </tr>
                       </thead>
                       <tbody>
                       {paginatedData?.map((item, index) => {
                               const courseNames = item.lineItems.map(lineItem => lineItem.name).join(', ');
                               const totalPrice = item.lineItems.reduce((sum, lineItem) => sum + lineItem.totalPrice, 0);
                               return (
                           <tr
                             key={item._id}
                             className={`border-b border-gray-300 ${
                               index % 2 !== 0 ? "bg-blue-50" : "bg-white"
                             }`}
                           >
                             <td className="py-3 px-4 text-center text-gray-600 font-medium">
                               {startIndex + index + 1}.
                             </td>
                             <td className="py-3 px-4 text-center text-gray-600 font-medium">
                               {item.customerDetails.name}
                             </td>
                             <td className="py-3 px-4 text-center text-gray-600 font-medium">
                               {item.customerDetails.email}
                             </td>
                             <td className="py-3 px-4 text-center text-gray-600 font-medium">
                               Pre-Record
                             </td>
                             <td className="py-3 px-4 text-center text-gray-600 font-medium">
                               {courseNames}
                             </td>
                             {/* <td className="py-3 px-4 text-center text-gray-600 font-medium">
                                     {item?.start
                                       ? new Date(item?.start).toLocaleDateString()
                                       : "N/A"}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600 font-medium">
                                     {item?.end === "Not Completed"
                                       ? "Not Completed"
                                       : new Date(item?.end).toLocaleDateString()}
                          </td> */}
                          {/* <td className="py-3 px-4 text-center text-gray-600 font-medium">
                                     {item.status === "In-progress"
                                       ? <p className='flex items-center text-red-500 gap-2'><GrInProgress className='w-5 h-5 text-red-500'/> In-progress</p>
                                       : <p className='flex items-center text-green-500 gap-2'><IoCheckmarkDoneCircleOutline className='w-5 h-5 text-green-500' /> Completed</p> }
                          </td> */}
                           </tr>
                           );
                        })}
                       </tbody>
                     </table>
                   </div>
                 )}
              </div>

              {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative animate-slide-up ml-44 ">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPopup(false)}
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Add Offline Payment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="sessionId"
                placeholder="Session ID"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />

              <select
                name="courseName"
                value={newPayment.lineItems[0].name}
                onChange={handleChange}
                className="border p-2 w-full text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" className="">Select Course</option>
                {courses?.map((course, index) => (
                  <option
                    key={index}
                    value={course.value}
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    {course.label}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="price"
                placeholder="Price"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
              <input
                type="number"
                name="totalPrice"
                placeholder="Total Price"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#182073] text-white px-4 py-2 rounded-md hover:bg-[#0f165a] transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        
            {paginatedData?.length > 0 && (
              <div className="w-full mt-4 flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
    </div>
  )
}

export default History