"use client";
import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMentor } from "../Redux/action/Portfolio.js";
import { useRouter } from "next/navigation.js";
import { BsFiletypeXlsx } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import * as XLSX from "xlsx";
import { Pagination } from "../component/Pagination.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mentor);
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
    exp: "",
    automotive: "",
  });

    const [page, setPage] = useState(1);
    const totalPages = data?.totalPage || 1;

      useEffect(() => {
    dispatch(getMentor(page,filters));
  }, [page,filters]);


  const exp = [
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
    { label: "30 Years", value: 30 },
  ];

  const auto = [
    "Exterior Components",
    "Interior Components",
    "Lighting Systems",
    "Chassis and Suspension Components",
    "Powertrain Components",
    "Electrical and Electronics",
    "Body-in-White (BIW)",
    "Plastics and Trims",
    "HVAC and Thermal Systems",
    "Safety Systems",
    "Electric Vehicle (EV) Specific Components",
  ];



  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const { exp, automotive } = filters;

    const filtered = data?.data?.filter((profile) => {
      const profileExperience = parseInt(profile.exp) || 0;
      const component = profile.automotive || "";

      const matchesExperience =
        exp !== "" ? profileExperience === parseInt(exp) : true;

      const matchesComponent = automotive
        ? component.includes(automotive)
        : true;

      return matchesExperience && matchesComponent;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

    useEffect(() => {
    setPage(1);
  }, [filters]);

    const handlePageClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const goTo = (id) => {
    router.push(`/mentordetails?profileId=${id}`);
  };

  const handleDownload = () => {
    try {
      if (!filteredData || filteredData.length === 0) {
        alert("No filtered data available to download!");
        return;
      }
      const headers = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Phone", key: "phone" },
        { name: "Total Exp", key: "exp" },
        { name: "Linkedin Profile", key: "link" },
        { name: "About Me", key: "bio" },
        { name: "Course Name", key: "Course" },
        { name: "Total Hours", key: "totalHour" },
        { name: "Commodity", key: "automotive" },
        { name: "Commodity Exp", key: "yearexp" },
      ];

      const excelData = filteredData?.map((profile) => {
        const row = {
          name: profile.name || "N/A",
          email: profile.email || "N/A",
          phone: profile.phone || "N/A",
          exp: profile.exp || "N/A",
          link: profile.link || "N/A",
          bio: profile.bio || "N/A",
          course: profile.course || "N/A",
          totalHour: profile.totalHour || "N/A",
          automotive: profile?.automotive || "N/A",
          yearexp: profile?.yearexp || "N/A",
        };

        profile?.topics?.forEach((company, index) => {
          let topicDetails = "";

          company?.rows?.forEach((rowData, rowIndex) => {
            topicDetails += `${rowData.topic} - ${rowData.hours}hours \n`;
          });
          row.Topics = topicDetails.trim();
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

  const handleReset = () => {
    setFilters({
      exp: "",
      automotive: "",
    });
    setFilteredData(data?.data || []);
  };

  return (
    <div className="px-24">
      <div className="grid grid-cols-4 gap-4 mt-16">
        <div className="">
          <label className="block text-sm font-medium mb-2">
            Experience in Years
          </label>
          <select
            name="exp"
            value={filters.exp}
            onChange={handleFilterChange}
            className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
            required
          >
            <option value="">Total Experience</option>
            {exp.map((experience) => (
              <option
                key={experience.value}
                value={experience.value} // Use the numeric value
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                {experience.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Commodity Component
          </label>
          <select
            name="automotive"
            value={filters.automotive}
            onChange={handleFilterChange}
            className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
            required
          >
            <option value="">-None-</option>
            {auto?.map((lpa, index) => (
              <option
                key={index}
                value={lpa}
                aria-labelledby="dropdownHoverButton"
                className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
              >
                {lpa}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 mt-7">
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
          filteredData.map((data, i) => (
            <div key={i} className="px-1 mt-12">
             <div className="w-64 h-64 flex flex-col rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
  <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
    <span className="font-bold text-white dark:text-gray-800 text-2xl">
    {data?.name.charAt(0).toUpperCase()}
    </span>
    <figcaption className="sr-only">John Doe, Web Developer</figcaption>
  </figure>

  <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
    {data?.name.toUpperCase()}
  </h2>
  <p className="text-gray-600 dark:text-gray-300">DESIGNER</p>

  <div className="flex-grow"></div>
  <div className="mt-auto flex items-center justify-center gap-4">
    <button
      className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
      onClick={() => goTo(data?._id)}
    >
      Contact
    </button>
    <button
      className="rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
      onClick={() => goTo(data?._id)}
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
         <div className="w-full mt-4 flex justify-center">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageClick}
                  />
                </div>
    </div>
  );
};

export default Profile;
