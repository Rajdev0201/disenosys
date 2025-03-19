"use client";
import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice";

const Review = ({ courseId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [selectedLikes, setSelectedLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const toggleSelection = (item) => {
    setSelectedLikes((prev) =>
      prev.includes(item) ? prev.filter((like) => like !== item) : [...prev, item] 
    );
  };
  
  const emojiMap = {
    1: "😡", 
    2: "😕", 
    3: "😐", 
    4: "😊", 
    5: "🤩", 
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating before submitting!");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("https://disenosys-dkhj.onrender.com/api/v1/postreviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, name: user?.user?.user?.userName, rating, message,selectedLikes }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Review submitted successfully!");
        setRating(0); 
        setMessage(""); 
        setIsOpen(false);
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center mb-6 mt-8">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
        >
          <span className="relative w-full font-garet text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            Add Review
          </span>
        </button>
      </div>


      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <h2 className="text-xl font-bold text-center mb-4">Review Box</h2>

            <label className="block text-gray-300 mb-2">Rate Your Experience :</label>
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(rating === star ? 0 : star)}
                  className={`text-3xl cursor-pointer transition-all ${
                    rating >= star ? "text-yellow-400" : "text-gray-500"
                  } ${rating === star ? "animate-pulse" : ""}`}
                >
                  <CiStar />
                </span>
              ))}
            </div>

            {rating > 0 && (
              <div className="flex justify-end">
                <button className="hover:-translate-y-5 cursor-pointer hover:scale-125 bg-white dark:bg-[#191818] rounded-full p-2 px-3 transition
                loader border-2 rounded-full border-white-500 bg-yellow-300 animate-bounce
                aspect-square w-12 h-12 flex justify-center items-center text-yellow-700">
                  {emojiMap[rating]}
                </button>
              </div>
            )}
            <label className="block text-gray-300 mt-4 mb-2">What Did You like? :</label>
             <div className="grid grid-cols-2 gap-2 text-gray-800">
             {["Affordable", "Teaching", "Session", "Design"].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection(item)}
                  className={`p-2 rounded shadow-inner transition ${
                    selectedLikes.includes(item) ? "bg-blue-500 text-white" : "bg-blue-200"
                  }`}
                >
                  {item}
                </button>
              ))}
             </div>
            <label className="block text-gray-300 mt-4 mb-2">Your Feedback :</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring focus:ring-indigo-500"
              placeholder="Write your feedback..."
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

       
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                disabled={loading}
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="ml-3 px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
