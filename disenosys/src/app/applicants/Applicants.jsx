"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCareer } from "../Redux/action/Portfolio";
import { useRouter } from "next/navigation";
import { BsFiletypeXlsx } from "react-icons/bs";
import * as XLSX from "xlsx";
import { MdCancel } from "react-icons/md";

const Applicants = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.career);
 console.log(data)
  const [filteredData, setFilteredData] = useState([]);
  const experience = [
    { label: "Fresher", value: 0 },
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
    { label: "4 Years", value: 4 },
    { label: "5 Years", value: 5 },
    { label: "6 Years", value: 6 },
    { label: "7 Years", value: 7 },
    { label: "8 Years", value: 8 },
    { label: "9 Years", value: 9 },
    { label: "10 Years", value: 10 },
    { label: "11 Years", value: 11 },
    { label: "12 Years", value: 12 },
    { label: "13 Years", value: 13 },
    { label: "14 Years", value: 14 },
    { label: "15 Years", value: 15 },
    { label: "16 Years", value: 16 },
    { label: "17 Years", value: 17 },
    { label: "18 Years", value: 18 },
    { label: "19 Years", value: 19 },
    { label: "20 Years", value: 20 },
    { label: "21 Years", value: 21 },
    { label: "22 Years", value: 22 },
    { label: "23 Years", value: 23 },
    { label: "24 Years", value: 24 },
    { label: "25 Years", value: 25 },
    { label: "26 Years", value: 26 },
    { label: "27 Years", value: 27 },
    { label: "28 Years", value: 28 },
    { label: "29 Years", value: 29 },
    { label: "30 Years", value: 30 }
  ];
  const [filters, setFilters] = useState({
    experience: "",
    notice: "",
    expmonths: "",
    companyName: "",
    industry: "",
    domain: "",
    software: "",
  });

  const router = useRouter();


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const {
      experience,
      notice,
      expmonths,
      companyName,
      industry,
      domain,
      software,
    } = filters;

    const filtered = data?.data?.filter((profile) => {
      const profileExperience = parseInt(profile.experience) || 0 ;
      const profileNotice = profile.notice || "";
      const profileExpmonths = profile.expmonths || "";
      const profileCompanies = profile.companies || [];

      const matchesExperience = experience !== "" ? profileExperience === parseInt(experience) : true;


      const matchesNotice = notice ? profileNotice.includes(notice) : true;

      const matchesExpmonths = expmonths
        ? profileExpmonths.toLowerCase().includes(expmonths.toLowerCase())
        : true;

      const matchesCompany = profileCompanies.some((company) => {
        const matchesCompanyName = companyName
          ? company.companyName
              .toLowerCase()
              .includes(companyName.toLowerCase())
          : true;
        const matchesIndustry = industry
          ? company.rows?.[0]?.industry
              .toLowerCase()
              .includes(industry.toLowerCase())
          : true;
        const matchesDomain = domain
          ? company.rows?.[0]?.domain
              .toLowerCase()
              .includes(domain.toLowerCase())
          : true;
        const matchesSoftware = software
          ? company.rows?.[0]?.software
              .toLowerCase()
              .includes(software.toLowerCase())
          : true;

        return (
          matchesCompanyName &&
          matchesIndustry &&
          matchesDomain &&
          matchesSoftware
        );
      });

      return (
        matchesExperience && matchesNotice && matchesExpmonths && matchesCompany
      );
    });

    // const extractedData = filtered.map((profile) => ({
    //   name: profile.name || "N/A",
    //   email: profile.email || "N/A",
    //   phone: profile.phone || "N/A",
    //   dob: profile.dob || "N/A",
    //   gender: profile.gender || "N/A",
    //   experience: profile.experience || "N/A",
    //   expmonths: profile.expmonths || "N/A",
    //   employee: profile.employee || "N/A",
    //   current: profile.current || "N/A",
    //   expected: profile.expected || "N/A",
    //   notice: profile.notice || "N/A",
    //   city: profile.city || "N/A",
    //   location: profile.location || "N/A",
    //   relocate: profile.relocate || "N/A",
    //   companies: profile.companies || [],
    // }));

    // setFilteredData(filteredData);
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilters({
      experience: "",
      notice: "",
      expmonths: "",
      companyName: "",
      industry: "",
      domain: "",
      software: "",
    });
    setFilteredData(data?.data || []);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

  const goTo = (id) => {
    router.push(`/profileapplied?profileId=${id}`);
  };
  useEffect(() => {
    dispatch(getCareer());
  }, [dispatch]);

  const handleDownload = () => {
    try {
      if (!filteredData || filteredData.length === 0) {
        alert("No filtered data available to download!");
        return;
      }

      const maxCompanies = Math.max(
        ...filteredData?.map((profile) => profile.companies?.length || 0)
      );

      const headers = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Phone", key: "phone" },
        { name: "DOB", key: "dob" },
        { name: "Gender", key: "gender" },
        { name: "Experience", key: "experience" },
        // { name: "Exp in Months", key: "expmonths" },
        { name: "Current Employee", key: "employee" },
        { name: "Current CTC", key: "currentCtc" },
        { name: "Expected CTC", key: "expectedCtc" },
        { name: "Notice Period", key: "notice" },
        { name: "Current Location", key: "city" },
        { name: "Preferred Location", key: "location" },
        { name: "Relocate", key: "relocate" },
      ];

      for (let i = 1; i <= maxCompanies; i++) {
        headers.push({ name: `C ${i} Name`, key: `c${i}Name` });
        headers.push({ name: `C ${i} From`, key: `c${i}From` });
        headers.push({ name: `C ${i} To`, key: `c${i}To` });

        const company = filteredData[i - 1];
        company?.companies?.forEach((companyItem, companyIndex) => {
          // Loop through the rows for the current company
          companyItem.rows?.forEach((row, rowIndex) => {
            headers.push({
              name: `C ${i} Industry ${rowIndex + 1}`,
              key: `c${i}Industry_${rowIndex + 1}`,
            });
            headers.push({
              name: `C ${i} Domain ${rowIndex + 1}`,
              key: `c${i}Domain_${rowIndex + 1}`,
            });
            headers.push({
              name: `C ${i} Software ${rowIndex + 1}`,
              key: `c${i}Software_${rowIndex + 1}`,
            });
            // headers.push({ name: `Company ${i} months of exp ${rowIndex + 1}`, key: `c${i}months_${rowIndex + 1}` });
          });
        });
      }

      // Map filteredData to include dynamic company data
      const excelData = filteredData?.map((profile) => {
        const row = {
          name: profile.name || "N/A",
          email: profile.email || "N/A",
          phone: profile.phone || "N/A",
          dob: profile.dob
            ? new Date(profile.dob)
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .replace(",", "")
                .replace(" ", " /") // Adjusts formatting
            : "N/A",

          gender: profile.gender || "N/A",
          // experience: profile.experience || "N/A",
          // expmonths: profile.expmonths || "N/A",
          experience: profile.experience
            ? `${(
                parseInt(profile.experience) +
                parseInt(profile.expmonths || 0) / 12
              ).toFixed(1)}`
            : "N/A",

          employee: profile.employee || "N/A",
          currentCtc: profile.current
            ? `${(
                parseFloat(profile?.current.split(" ")[0]) +
                parseFloat(profile?.cinr?.replace(",", "") / 100000)
              ).toFixed(1)}`
            : "N/A",
          expectedCtc: profile?.expected
            ? `${(
                parseFloat(profile.expected.split(" ")[0]) +
                parseFloat(profile?.einr?.replace(",", "") / 100000)
              ).toFixed(1)}`
            : "N/A",
          notice: profile.notice || "N/A",
          city: profile.city || "N/A",
          location: profile.location || "N/A",
          relocate: profile.relocate || "N/A",
        };

        profile?.companies?.forEach((company, index) => {
          row[`c${index + 1}Name`] = company.companyName || "N/A";
          row[`c${index + 1}From`] = company.from || "N/A";
          row[`c${index + 1}To`] = company.to || "N/A";

          company?.rows?.forEach((rowData, rowIndex) => {
            row[`c${index + 1}Industry_${rowIndex + 1}`] =
              rowData.industry || "N/A";
            row[`c${index + 1}Domain_${rowIndex + 1}`] =
              rowData.domain || "N/A";
            row[`c${index + 1}Software_${rowIndex + 1}`] =
              rowData.software || "N/A";
            // row[`c${index + 1}months_${rowIndex + 1}`] = rowData.months || "N/A";
          });
        });

        return row;
      });

      const worksheet = XLSX.utils.json_to_sheet(excelData);

      XLSX.utils.sheet_add_aoa(
        worksheet,
        [headers.map((header) => header.name)],
        {
          origin: "A1",
        }
      );

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;

      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${currentDate.getFullYear()}`;
      link.setAttribute("download", `Filtered_Data_${formattedDate}.xlsx`);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="px-24 py-12">
        <div className="grid grid-cols-4 gap-4">
  
          <div>
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                  className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="">Total Experience</option>
                  {experience?.map((experience, index) => (
                    <option
                      key={index}
                      value={experience.value}
                      aria-labelledby="dropdownHoverButton"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      {experience.label}
                    </option>
                  ))}
                </select>
          </div>
               
          
          <div>
            <select
              name="notice"
              value={filters.notice}
              onChange={handleFilterChange}
              className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
              required
            >
              <option
                value="Immediate"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                Immediate
              </option>
              <option
                value="7 Days"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                7 Days
              </option>
              <option
                value="15 Days"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                15 Days
              </option>
              <option
                value="30 Days"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                30 Days
              </option>
              <option
                value="45 Days"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                45 Days
              </option>
              <option
                value="60 Days"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                60 Days
              </option>
              <option
                value="90 Days"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                90 Days
              </option>
              <option
                value="Others"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                Others
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
          <div className="flex gap-4">
            <button
              className="flex ring-2 ring-gray-100 shadow-2xl rounded-md text-xl font-bold font-poppins bg-red-600 text-white items-center justify-center px-6 py-1"
              onClick={handleDownload}
            >
              Download <BsFiletypeXlsx className="px-2 w-10 h-10" />
            </button>
            
          <button
              className="flex ring-2 ring-gray-100 shadow-2xl rounded-md text-xl font-bold font-poppins bg-stone-600 text-white items-center justify-center px-4 py-1"
              onClick={handleReset}
           >
             Reset <MdCancel className="px-2 w-10 h-10" />
            </button>
          </div>
      
       
        </div>

        <div className="grid grid-cols-4 gap-4">
          {filteredData?.length ? (
            filteredData.map((profile, index) => (
              <div key={index} className="px-1 mt-12">
               <div className="w-64 min-h-[250px] flex flex-col justify-between rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
  <div>
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
  </div>

  {/* Button Container */}
  <div className="mt-auto flex items-center justify-center space-x-4">
    <button
      className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
      onClick={() => goTo(profile?._id)}
    >
      Contact
    </button>
    <button
      className="rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
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
