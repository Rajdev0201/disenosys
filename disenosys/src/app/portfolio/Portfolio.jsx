"use client";
import React, { useEffect, useState } from "react";
import Card from "../component/ProfilePage/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
import axios from "axios";

const Portfolio = () => {
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      const storedUser = localStorage.getItem("profile");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }, [dispatch]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!file || !title || !description) {
        alert("All fields are required, including the file.");
        return;
      }

      if(!user){
        alert("please sigin and upload your resume")
        return;
      }
  

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", user?.user?.userName);
      formData.append("title", title);
      formData.append("description", description);

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      try {
        const response = await axios.post(
          "https://disenosys-1.onrender.com/upload-portfolio",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert(response.data.message);
        setTitle("");
        setDescription("");
        setFile(null); 
      } catch (error) {
        console.error(error);
        alert("Error uploading the file.");
      }
    };

    return (
      <div className="px-6 py-6">
        <div className="flex flex-col w-full">
          <h4 className="text-[#182073] font-medium text-xl font-poppins">
            My Portfolio
          </h4>

          <div className="grid grid-cols-1 mt-8">
            <Card />
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-12">
              <div className="col-span-4 flex flex-col">
                <h4 className="text-white bg-[#182073] text-center p-2 font-semibold font-poppins">
                  Upload Portfolio
                </h4>
                <div className="flex flex-col items-center justify-center bg-blue-100 p-4 rounded-md mt-4">
                  <form onSubmit={handleSubmit} className="w-full">

                    <label className="mt-4">
                      <span className="block text-sm font-medium text-gray-700">
                        Add a Title
                      </span>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 border border-gray-300 rounded-md p-2"
                      />
                    </label>

                    <label className="mt-6">
                      <span className="block text-sm font-medium text-gray-700">
                        Add a Description
                      </span>
                      <input
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 border border-gray-300 rounded-md p-2"
                      />
                    </label>

                    <label className="mt-6">
                      <span className="block text-sm font-medium text-gray-700">
                        Upload Model
                      </span>
                      <input
                        type="file"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                        className="mt-1 border border-gray-300 rounded-md p-2"
                      />
                    </label>

                    <button
                      type="submit"
                      className="cursor-pointer bg-[#182073] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold mt-4"
                    >
                      Upload Portfolio
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Portfolio;
