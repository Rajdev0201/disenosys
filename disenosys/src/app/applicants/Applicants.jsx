"use client";
import React, { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getCareer } from "../Redux/action/Portfolio";
import { useRouter } from "next/navigation";

const Applicants = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.career);
   
  const [filteredData, setFilteredData] = useState([]);
 
  const [filters, setFilters] = useState({
    experience: "",
    notice: "",
    location: "",
    companyName: "",
    industry: "",
    domain: "",
    software: ""
  });

  
 const router = useRouter();
  useEffect(() => {
    if (data?.data) {
      applyFilters();
    }
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  
  const applyFilters = () => {
    const { experience, notice, location, companyName, industry, domain, software } = filters;
  
    const filtered = data?.data?.filter((profile) => {
      const profileExperience = profile.experience || "";
      const profileNotice = profile.notice || "";
      const profileLocation = profile.location || "";
      const profileCompanies = profile.companies || [];
  
      // Match experience
      const matchesExperience = experience ? profileExperience.includes(experience) : true;
  
      // Match notice period
      const matchesNotice = notice ? profileNotice.includes(notice) : true;
  
      // Match location
      const matchesLocation = location
        ? profileLocation.toLowerCase().includes(location.toLowerCase())
        : true;
  
      // Match company details (companyName, industry, domain, software)
      const matchesCompany = profileCompanies.some((company) => {
        const matchesCompanyName = companyName
          ? company.companyName.toLowerCase().includes(companyName.toLowerCase())
          : true;
        const matchesIndustry = industry
          ? company.rows?.[0]?.industry.toLowerCase().includes(industry.toLowerCase())
          : true;
        const matchesDomain = domain
          ? company.rows?.[0]?.domain.toLowerCase().includes(domain.toLowerCase())
          : true;
        const matchesSoftware = software
          ? company.rows?.[0]?.software.toLowerCase().includes(software.toLowerCase())
          : true;
  
        return matchesCompanyName && matchesIndustry && matchesDomain && matchesSoftware;
      });
  
      return matchesExperience && matchesNotice && matchesLocation && matchesCompany;
    });
  
    setFilteredData(filtered);
  };
  
  
  
  
 const goTo = (id) => {
 router.push(`/profileapplied?profileId=${id}`)
 }
  useEffect(() => {
    dispatch(getCareer());
  }, [dispatch]);

  return (
    <div className="bg-blue-50 h-screen">
      <div className="px-24 py-12">
        <div className="grid grid-cols-4 gap-4">
               <div>
                <select
                  name="experience"
                  onChange={handleFilterChange}
                  className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="">Experience</option>
                  <option value="fresher" className="bg-[#182073] text-white">Fresher</option>
                  <option value="0-1" className="bg-[#182073] text-white">0-1 Years</option>
                  <option value="1-2" className="bg-[#182073] text-white">1-2 Years</option>
                  <option value="2-3" className="bg-[#182073] text-white">2-3 Years</option>
                  <option value="3-4" className="bg-[#182073] text-white">3-4 Years</option>
                  <option value="4-5" className="bg-[#182073] text-white">4-5 Years</option>
                  <option value="5-6" className="bg-[#182073] text-white">5-6 Years</option>
                  <option value="6-7" className="bg-[#182073] text-white">6-7 Years</option>
                  <option value="7-8" className="bg-[#182073] text-white">7-8 Years</option>
                  <option value="8-9" className="bg-[#182073] text-white">8-9 Years</option>
                  <option value="9-10" className="bg-[#182073] text-white">9-10 Years</option>
                  <option value="10+" className="bg-[#182073] text-white">10+ Years</option>
                  <option value="11+" className="bg-[#182073] text-white">11+ Years</option>
                  <option value="12+" className="bg-[#182073] text-white">12+ Years</option>
                  <option value="13+" className="bg-[#182073] text-white">13+ Years</option>
                </select>
              </div>

          <div>
            <select
              name="notice"
              onChange={handleFilterChange}
              className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
              required
            >
              <option value="-None-">Notice period</option>
              <option value="Immediate" className="bg-[#182073] text-white">
                Immediate
              </option>
              <option
                value="Not Applicable"
                className="bg-[#182073] text-white mt-1"
              >
                Not Applicable
              </option>
              <option value="1 month" className="bg-[#182073] text-white mt-1">
                1 month
              </option>
              <option value="2 months" className="bg-[#182073] text-white mt-1">
                2 months
              </option>
              <option value="3 months" className="bg-[#182073] text-white mt-1">
                3 months
              </option>
            </select>
          </div>

          <div>
            <select
              name="location"
              onChange={handleFilterChange}
              className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
              required
            >
              <option value="">Preferred Location</option>
              <option
                value="JAMMU AND KASHMIR"
                className="bg-[#182073] text-white"
              >
                JAMMU AND KASHMIR
              </option>
              <option
                value="HIMACHAL PRADESH"
                className="bg-[#182073] text-white"
              >
                HIMACHAL PRADESH
              </option>
              <option value="PUNJAB" className="bg-[#182073] text-white">
                PUNJAB
              </option>
              <option value="CHANDIGARH" className="bg-[#182073] text-white">
                CHANDIGARH
              </option>
              <option value="UTTARAKHAND" className="bg-[#182073] text-white">
                UTTARAKHAND
              </option>
              <option value="HARYANA" className="bg-[#182073] text-white">
                HARYANA
              </option>
              <option value="DELHI" className="bg-[#182073] text-white">
                DELHI
              </option>
              <option value="RAJASTHAN" className="bg-[#182073] text-white">
                RAJASTHAN
              </option>
              <option value="UTTAR PRADESH" className="bg-[#182073] text-white">
                UTTAR PRADESH
              </option>
              <option value="BIHAR" className="bg-[#182073] text-white">
                BIHAR
              </option>
              <option value="SIKKIM" className="bg-[#182073] text-white">
                SIKKIM
              </option>
              <option
                value="ARUNACHAL PRADESH"
                className="bg-[#182073] text-white"
              >
                ARUNACHAL PRADESH
              </option>
              <option value="NAGALAND" className="bg-[#182073] text-white">
                NAGALAND
              </option>
              <option value="MANIPUR" className="bg-[#182073] text-white">
                MANIPUR
              </option>
              <option value="MIZORAM" className="bg-[#182073] text-white">
                MIZORAM
              </option>
              <option value="TRIPURA" className="bg-[#182073] text-white">
                TRIPURA
              </option>
              <option value="TAMILNADU" className="bg-[#182073] text-white">
                TAMILNADU
              </option>
              <option value="MEGHALAYA" className="bg-[#182073] text-white">
                MEGHALAYA
              </option>
              <option value="ASSAM" className="bg-[#182073] text-white">
                ASSAM
              </option>
              <option value="WEST BENGAL" className="bg-[#182073] text-white">
                WEST BENGAL
              </option>
              <option value="JHARKHAND" className="bg-[#182073] text-white">
                JHARKHAND
              </option>
              <option value="ORISSA" className="bg-[#182073] text-white">
                ORISSA
              </option>
              <option value="CHHATTISGARH" className="bg-[#182073] text-white">
                CHHATTISGARH
              </option>
              <option
                value="MADHYA PRADESH"
                className="bg-[#182073] text-white"
              >
                MADHYA PRADESH
              </option>
              <option value="GUJARAT" className="bg-[#182073] text-white">
                GUJARAT
              </option>
            </select>
          </div>

          <div>
  <input
    type="text"
    name="companyName"
    value={filters.companyName}
    onChange={handleFilterChange}
    placeholder="Search by Company Name"
    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500 placeholder:text-gray-800"
  />
</div>

<div>
  <input
    type="text"
    name="industry"
    value={filters.industry}
    onChange={handleFilterChange}
    placeholder="Search by Industry"
    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500 placeholder:text-gray-800"
  />
</div>

<div>
  <input
    type="text"
    name="domain"
    value={filters.domain}
    onChange={handleFilterChange}
    placeholder="Search by Domain"
    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500 placeholder:text-gray-800"
  />
</div>

<div>
  <input
    type="text"
    name="software"
    value={filters.software}
    onChange={handleFilterChange}
    placeholder="Search by Software"
    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500 placeholder:text-gray-800"
  />
</div>

        </div>

        <div className="grid grid-cols-4 gap-4">
        {filteredData?.length ? (
            filteredData.map((profile, index) => (
            <div key={index} className="px-1 mt-12">
              <div className="w-64 rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
                <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    fill="currentColor"
                    className="bi bi-person-fill text-white dark:text-indigo-300"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  </svg>
                  <figcaption className="sr-only">
                    John Doe, Web Developer
                  </figcaption>
                </figure>
                <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {profile?.name?.toUpperCase()}
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  DESIGNER
                </p>
                <div className="flex items-center justify-center">
                  <button
                    className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
                    onClick={() => goTo(profile?._id)}
                  >
                    Contact
                  </button>
                  <button
                    className="ml-4 rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => goTo(profile?._id)}
                  >
                    Portfolio
                  </button>
                </div>
              </div>
            </div>
            ))
           ) : (
            <p className="col-span-4 text-center text-gray-500 mt-12">
              No matching profiles found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
