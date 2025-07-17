"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCareer } from "../Redux/action/Portfolio";
import { useRouter } from "next/navigation";
import { BsFiletypeXlsx } from "react-icons/bs";
import * as XLSX from "xlsx";
import { MdCancel } from "react-icons/md";
import { Pagination } from "../component/Pagination";

const Applicants = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.career);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const experienceOptions = [
    { label: "Fresher", value: "0" },
    { label: "1 Year", value: "1" },
    { label: "2-3 Years", value: "2-3" },
    { label: "4-5 Years", value: "4-5" },
    { label: "6-10 Years", value: "6-10" },
    { label: "11-15 Years", value: "11-15" },
    { label: "16-20 Years", value: "16-20" },
    { label: "21-30 Years", value: "21-30" },
  ];
  
  const [filters, setFilters] = useState({
    experience: "",
    multiExperience: "",
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
      multiExperience,
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

      let matchesMultiExperience = true;
      if (multiExperience) {
        let minExp, maxExp;
        if (multiExperience.includes("-")) {
          [minExp, maxExp] = multiExperience.split("-").map(Number);
        } else {
          minExp = maxExp = Number(multiExperience);
        }
        matchesMultiExperience =
          profileExperience >= minExp && profileExperience <= maxExp;
      }

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
          matchesMultiExperience &&
          matchesIndustry &&
          matchesDomain &&
          matchesSoftware
        );
      });

      return (
        matchesExperience && matchesNotice && matchesExpmonths && matchesCompany
      );
    });
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
      multiExperience: "",
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
    window.open(`/profileapplied?profileId=${id}`, '_blank');
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
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="">
      <div className="px-24 py-8 font-garet">
      <h1 className="text-2xl font-medium mb-6">Career Page Applicants</h1>
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
        className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
        name="multiExperience"
        value={filters.multiExperience}
        onChange={handleFilterChange}
      >
        <option value="">All Experience Ranges</option>
        {experienceOptions.map((exp) => (
          <option key={exp.value} value={exp.value}>
            {exp.label}
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
          
          <div className="flex gap-2">
            <button
              className="flex ring-2 gap-2 py-2 px-2 ring-gray-100 shadow-2xl rounded-md text-xl font-bold  bg-red-600 text-white items-center justify-center "
              onClick={handleDownload}
            >
              Download <BsFiletypeXlsx className="" />
            </button>
            
          <button
              className="flex gap-2 ring-2 p-2 ring-gray-100 shadow-2xl rounded-md text-xl font-bold  bg-stone-600 text-white items-center justify-center"
              onClick={handleReset}
           >
             Reset <MdCancel className="" />
            </button>
          </div>
      
       
        </div>

        <div className="grid grid-cols-4 gap-4">
          {paginatedData?.length > 0  ? (
            paginatedData.map((profile, index) => (
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

  <div className="mt-auto flex items-center justify-between space-x-4">
         <div class="tooltip-container">
  <div class="relative">
    <div class="group peer relative z-10 p-1">
      <svg
        class="duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
        height="30"
        width="30"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.518 0-10-4.482-10-10s4.482-10 10-10 10 4.482 10 10-4.482 10-10 10zm-1-16h2v6h-2zm0 8h2v2h-2z"
        ></path>
      </svg>
    </div>
    <div
      class="absolute left-1/2 w-40 -translate-x-1/2 rounded bg-gray-400 p-3 text-sm opacity-0 before:absolute before:-bottom-2 before:left-1/2 before:size-4 before:-translate-x-1/2 before:rotate-45 before:bg-gray-400 peer-hover:bottom-[3.3rem] peer-hover:opacity-100 peer-hover:duration-500"
    >
      <p class="text-center text-white">Click portfolio and get more details...</p>
    </div>
  </div>
        </div>

    <button
      className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
      onClick={() => goTo(profile?._id)}
    >
      Portfolio
    </button>
  </div>
</div>

              </div>
            ))
          ) : (
            <p className="flex text-red-500 text-center ">
              Loading
            </p>
          )}
        </div>
      </div>
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
  );
};

export default Applicants;
