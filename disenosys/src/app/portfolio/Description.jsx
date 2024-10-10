"use client";
import React, { useEffect, useState } from "react";
import Card from "../component/ProfilePage/Card";
import { getPortfolioAll, getResume } from "../Redux/action/Portfolio.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProfile } from "../Redux/action/editProfile";
import { useSearchParams } from "next/navigation";

const Description = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const AllPort = useSelector((state) => state.allPort);
  const [resumeList, setResumeList] = useState([]);
  const dispatch = useDispatch();
  const search = useSearchParams();
  const userid = search.get("userId");

  const getImage = (filePath) => {
    return `http://localhost:8000/uploads/${filePath}`;
  };

  const fetchResumes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/resumes`);
      const resumesWithUrl = response?.data?.map((resume) => ({
        ...resume,
        fileUrl: resume?.filePath ? getImage(resume?.filePath) : null,
      }));

      setResumeList(resumesWithUrl);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const profile = useSelector((state) => state.currentProfile);
  console.log(profile)

  const getImagePic = (filePath) => {
    return `http://localhost:8000/uploadsProfile/${filePath}`;
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    dispatch(getResume());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPortfolioAll());
  }, [dispatch]);

  const getImageUrl = (filePath) => {
    return `http://localhost:8000/uploadsPortfolio/${filePath}`;
  };

  const filteredPortfolios = AllPort?.filter((port) => port?.userId === userid);
  const filteredResumes = resumeList?.filter((resume) => resume?.userId === userid);
  console.log(filteredResumes)
  return (
    <div className="mt-0">
      <Card />

      <div className="container mx-auto px-4 py-4 max-w-screen-lg">
        <div className="flex space-x-8 border-b border-gray-300">
          <div
            className={`cursor-pointer pb-2 ${activeTab === "overview" ? "font-bold border-b-2 border-blue-600 text-[#182073]" : "font-normal"}`}
            onClick={() => setActiveTab("overview")}
          >
            <p>Resume</p>
          </div>

          <div
            className={`cursor-pointer pb-2 ${activeTab === "3dmodels" ? "font-bold border-b-2 border-blue-600 text-[#182073]" : "font-normal"}`}
            onClick={() => setActiveTab("3dmodels")}
          >
            <p>3D Models</p>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="mt-4 w-full h-screen relative">
            {filteredResumes?.length > 0 ? (
              filteredResumes?.map((resume, index) => (
                <iframe
                  key={index}
                  src={resume?.fileUrl}
                  alt="Resume"
                  className="absolute object-cover top-0 left-0 w-full h-full"
                />
              ))
            ) : (
              <p className="text-center text-red-500">No resume found.</p>
            )}
          </div>
        )}

        {activeTab === "3dmodels" && (
          <div className="container mx-auto px-4 py-8 max-w-screen-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPortfolios?.length > 0 ? (
                filteredPortfolios?.map((port, index) => {
                  const user = profile?.find((user) => user?._id === port?.userId);
                  const profileImage = getImagePic(user?.filePath);
                  // const portfolioImage = getImageUrl(port?.filePath);
               

                  return (
                    <div className="shadow-md rounded-lg overflow-hidden" key={index}>
                      <img
                        src={getImageUrl(port?.filePath)}
                        alt="Portfolio"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex justify-between">
                        <div className="flex space-x-2">
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-6 h-6 object-cover"
                          />
                          <p className="text-base text-gray-400">{user?.userName}</p>
                        </div>
                        <p className="text-center font-semibold text-gray-800">
                          {port?.title}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-red-500">No portfolios found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
