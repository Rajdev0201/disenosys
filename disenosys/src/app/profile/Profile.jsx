"use client";
import React, { useEffect, useState } from "react";
import Card from "../component/ProfilePage/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
import { MdDelete } from "react-icons/md";

const Profile = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const [resumeList, setResumeList] = useState([]);
  console.log(resumeList)
  const [file, setFile] = useState(null);

  console.log(user?.user?._id);

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const fetchResumes = async () => {
    try {
      const response = await axios.get(`https://disenosys-1.onrender.com/resumes/${user.user.userName}`);
      const resumesWithUrl = response?.data?.map((resume) => ({
        ...resume,
        fileUrl: `https://disenosys-1.onrender.com/uploads/${resume?.filePath?.split('\\').pop()}`,
      }));
      setResumeList(resumesWithUrl);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchResumes(); 
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", user?.user?.userName);
    formData.append("file", file);


    if(!user){
      alert("please sigin and upload your resume")
      return;
    }

    try {
      const response = await axios.post(
        "https://disenosys-1.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      fetchResumes(); 
    } catch (error) {
      console.error(error);
      alert("Error uploading resume", error);
    }
  };

  const handleResumeClick = (resume) => {
    console.log("Opening resume at URL:", resume.fileUrl);
    window.open(resume.fileUrl, "_blank");
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://disenosys-1.onrender.com/delete/${id}`);
      setResumeList(resumeList?.filter(item => item._id !== id));
      alert("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting Resume:", error);
      alert("Failed to delete history item.");
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="flex flex-col w-full">
        <h4 className="text-[#182073] font-medium text-xl font-poppins">
          My Profile
        </h4>

        <div className="grid grid-cols-1 mt-8">
          <Card />
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-12">
            <div className="col-span-4 flex flex-col">
              <h4 className="text-white bg-[#182073] text-center p-2 font-semibold font-poppins">
                Upload Resume
              </h4>
              <div className="flex flex-col items-center justify-center bg-blue-100 p-4 rounded-md mt-4">
                <form onSubmit={handleSubmit} className="w-full">
                  {/* {file && (
                    <p className="text-center text-green-600 font-medium">
                      {file.name} uploaded successfully!
                    </p>
                  )} */}
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    className="mt-4 border border-gray-300 rounded-md p-2"
                  />
                  <button type="submit" className="cursor-pointer bg-[#182073] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold mt-4">
                    Upload Resume
                  </button>
                  <p className="text-sm text-gray-500 mt-2">Select a PDF or DOC file to upload your resume.</p>
                </form>
              </div>

              {/* Resumes List */}
              <div className="mt-6">
                <h4 className="text-[#182073] font-semibold text-lg mb-2">Uploaded Resumes</h4>
                {resumeList.length > 0 ? (
                  <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <thead>
                      <tr className="bg-[#182073] text-white">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                        <th className="py-2 px-4 text-left">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumeList.map((resume) => (
                        <tr key={resume._id} className="hover:bg-gray-100">
                          <td className="py-2 px-4 border-b">{resume.name}</td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleResumeClick(resume)}
                              className="text-blue-600 underline hover:text-blue-800 transition"
                            >
                              View
                            </button>
                          </td>
                          <td className="py-2 px-4 border-b">
                           
                          <MdDelete size={20} className="text-red-500 hover:cursor-pointer" onClick={() => handleDelete(resume?._id)}/>
                          
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No resumes found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
