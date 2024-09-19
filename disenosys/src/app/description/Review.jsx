import React, { useState, useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import { FaThumbsUp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaFilter } from "react-icons/fa";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import ReactStars from "react-stars";
import "./Description.css";
export const Review = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const appElement = document.getElementById("root"); // Replace 'root' with your actual root element ID
    if (appElement) {
      Modal.setAppElement(appElement);
    } else {
      console.error("Root element not found");
    }
  }, []);

  // Sample reviews data including stars
  const reviews = [
    {
      user: "Arjun Dass",
      Coursename: "CFD Fundamental course-1",
      commands:
        "This course is taught in a straightforward and well-structured manner. Assignments helped me to gain more confidence to learn more about CFD!",
      stars: [1, 1, 1, 1, 0],
      date: "02/05/2024",
    },
    {
      user: "Maya Verma",
      Coursename: "Advanced CFD Techniques",
      commands:
        "The course was intense but worth it. The instructors provided a lot of practical examples which were really helpful.",
      stars: [1, 1, 1, 1, 1],
      date: "02/05/2024",
    },
    {
      user: "Ravi Kumar",
      Coursename: "CFD in Aerodynamics",
      commands:
        "Great course! The content is rich and the explanations are very clear. I especially liked the hands-on assignments.",
      stars: [1, 1, 1, 0, 0],
      date: "02/05/2024",
    },
  ];

  // Function to render stars based on the array values
  const renderStars = (stars) => {
    return stars.map((star, index) =>
      star ? (
        <AiFillStar key={index} className="text-yellow-500" />
      ) : (
        <AiOutlineStar key={index} className="text-gray-300" />
      )
    );
  };

  return (
    <>
      <div>
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col md:flex-row justify-between items-center">
          <div className="  ">
            <div className="border border-gray-400 w-full md:w-96 p-1 inline-flex rounded-lg my-2 md:my-4">
              <CiSearch className="mt-1 text-gray-400" size={25} />
              <input
                type="text"
                className="w-full p-1 outline-none text-gray-400"
                placeholder="search customer review"
              />
            </div>
            <div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-800 to-purple-600  p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-4/12  "
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
              >
                <button
                  onClick={closeModal}
                  className="bg-[#38c3e2] text-white px-3 py-3 rounded-full mb-44 ml-20  absolute -top-7 -right-8  "
                >
                  <AiOutlineClose size={30} />
                </button>
                <h1 className="text-3xl font-bold text-center text-white">
                  Add Reviews
                </h1>
                <form className="p-3">
  <div className="relative">
    <input
      type="text"
      id="name-input"
      className="pt-4 pb-2 pl-2 pr-2 peer text-white border-b border-white bg-transparent outline-none focus:border-purple-500 w-full"
      placeholder=" "
    />
    <label
      htmlFor="name-input"
      className="absolute top-1 left-2 text-gray-400 transition-transform duration-300 transform -translate-y-1 peer-placeholder-shown:top-1 peer-placeholder-shown:left-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-4 peer-focus:text-purple-500"
    >
      Name
    </label>
  </div>

  <div className="relative my-3">
    <input
      type="text"
      id="email-input"
      className="pt-4 pb-2 pl-2 pr-2 peer text-white border-b border-white bg-transparent outline-none focus:border-purple-500 w-full"
      placeholder=" "
    />
    <label
      htmlFor="email-input"
      className="absolute top-1 left-2 text-gray-400 transition-transform duration-300 transform -translate-y-1 peer-placeholder-shown:top-1 peer-placeholder-shown:left-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-4 peer-focus:text-purple-500"
    >
      Email
    </label>
  </div>

  <div className="relative my-3">
    <textarea
      id="comments-textarea"
      className="pt-4 pb-2 pl-2 pr-2 peer text-white border-b border-white bg-transparent outline-none focus:border-purple-500 w-full"
      placeholder=" "
    ></textarea>
    <label
      htmlFor="comments-textarea"
      className="absolute top-1 left-2 text-gray-400 transition-transform duration-300 transform -translate-y-1 peer-placeholder-shown:top-1 peer-placeholder-shown:left-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-4 peer-focus:text-purple-500"
    >
      Comments
    </label>
  </div>

  <div>
    <h1 className="text-gray-400 text-xl">Ratings</h1>
    <div className="flex space-x-2">
      <ReactStars count={5} size={50} color2={"#ffd700"} />
    </div>
  </div>

  <button
    type="submit"
    className="bg-purple-500 w-full py-2.5 rounded-md my-5 text-xl font-medium text-white hover:bg-purple-700 shadow-lg transition duration-200"
  >
    Submit
  </button>
</form>

              </Modal>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
            <div className="border border-gray-400 p-1 inline-flex rounded-lg">
              <FaFilter className="mt-2 text-gray-400 font-poppins" size={18} />
              <input
                type="text"
                className="w-16 p-1 outline-none text-gray-400"
                placeholder="Sort by"
              />
              <FaSort className="mt-1 ml-2 text-gray-400" size={20} />
            </div>
            <div className="border border-gray-400 p-1 font-poppins inline-flex rounded-lg">
              <FaFilter className="mt-2 text-gray-400" size={18} />
              <h1 className="pt-1 text-gray-400 font-poppins">5 Star Reviews</h1>
              <FaSort className="mt-1 ml-2 text-gray-400" size={20} />
            </div>
            <button
              className="bg-[#182073] p-2 text-white font-poppins rounded my-2 text-lg text-base font-light"
              onClick={openModal}
            >
              Add Review
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28">
            <div className="flex justify-between">
              <div className="inline-flex gap-2">
                <RxAvatar size={30} />
                <p className="text-gray-900 text-lg md:text-xl font-bold">
                  {review.user}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(review.stars)}
              </div>
            </div>
            <p className="text-gray-500 text-sm md:text-sm font-medium mx-9">
              {review.date}
            </p>
            <div className="mt-2">
              <p className="text-gray-600">{review.commands}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};