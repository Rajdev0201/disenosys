"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getPortfolioOne } from "../Redux/action/Portfolio";
import { setUser } from "../Redux/features/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Redux/action/editProfile.js";

const Models = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.singlePort);
  const profile = useSelector((state) => state.currentProfile);

  const [search, setSearch] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState([]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPortfolioOne());
  }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  // Memoize unique portfolios to prevent re-calculations on every render
  const uniquePortfolios = useMemo(() => {
    return portfolio.reduce((acc, current) => {
      const found = acc.find(item => item.userId === current.userId);
      if (!found) acc.push(current);
      return acc;
    }, []);
  }, [portfolio]);

  // Enhance the search functionality: search both username and portfolio title
  useEffect(() => {
    const lowerCaseSearch = search.toLowerCase();
    
    // Filter profiles by username
    const matchingProfiles = profile?.filter(user => 
      user?.userName?.toLowerCase().includes(lowerCaseSearch)
    );
    
    // Filter portfolios by both username and portfolio title
    const matchingPortfolios = uniquePortfolios?.filter(port => {
      const user = profile?.find(user => user._id === port.userId);
      return (
        user?.userName?.toLowerCase().includes(lowerCaseSearch) || 
        port?.title?.toLowerCase().includes(lowerCaseSearch)
      );
    });

    setFilteredProfiles(matchingProfiles || []);
    setFilteredPortfolio(matchingPortfolios || []);
  }, [search, profile, uniquePortfolios]);

  const getImageUrl = (filePath) => {
    return `http://localhost:8000/uploadsPortfolio/${filePath}`;
  };

  const getImage = (filePath) => {
    return `http://localhost:8000/uploadsProfile/${filePath}`;
  };

  const goToDescriptionPage = (id) => {
    router.push(`/profileDescription?userId=${id}`);
  };

  return (
    <div className="bg-white mt-28">
      <div className="px-20 container mx-auto py-16">
        <h1 className="text-2xl font-bold font-Poppins mb-4">Model Showcase</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]"
              placeholder="Search 3D models"
            />
          </div>

          <div className="col-span-1">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]">
              <option value="" disabled selected>
                Any Category
              </option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>

          <div className="col-span-1">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]">
              <option value="" disabled selected>
                Formats
              </option>
              <option value="format1">Format 1</option>
              <option value="format2">Format 2</option>
            </select>
          </div>

          <div className="col-span-1">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]">
              <option value="" disabled selected>
                Filters
              </option>
              <option value="filter1">Filter 1</option>
              <option value="filter2">Filter 2</option>
            </select>
          </div>
        </div>

        <div className="xl:container mx-auto px-0 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPortfolio?.length > 0 ? (
      filteredPortfolio?.map((port) => {
                const user = profile?.find((user) => user?._id === port?.userId);
                const profileImage = getImage(user?.filePath);
                const portfolioImage = getImageUrl(port?.filePath);

                return (
                  <div
                    key={port._id}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer"
                    onClick={() => goToDescriptionPage(port.userId)}
                  >
                    <img
                      src={portfolioImage}
                      alt="Portfolio Item"
                      className="w-full h-48 object-cover"
                    />
                    <div className="border-b-2 border-gray-300 mt-4"></div>
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
                        {port.title}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-red-500 mt-4">No data found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;
