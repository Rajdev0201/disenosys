"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCareer } from "../Redux/action/Portfolio";

const Applied = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.career);

  useEffect(() => {
    dispatch(getCareer());
  }, [dispatch]);

  const search = useSearchParams();
  const courseId = search.get("profileId");
  return (
    <div className="relative rounded-xl overflow-hidden flex flex-col items-center shadow-lg bg-white font-Roboto-light">
      {data?.data
        ?.filter((data) => data._id === courseId)
        ?.map((data, index) => (
          <>
            <div className="h-32 w-full bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center">
              <h1 className="text-white text-3xl font-extrabold uppercase tracking-wider">
                Profile Overview
              </h1>
            </div>

            <div className="top-16 z-10 flex items-center flex-col gap-4 px-5 py-5">
              <div className="-mt-20">
                <div className="w-24 h-24 bg-blue-500 text-white text-3xl flex items-center justify-center font-bold rounded-md">
                  {data.name[0]}
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-blue-800">
                  {data.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {data.employee}
                </p>
              </div>

              <div className="w-full max-w-lg">
                <table className="table-auto w-full border-collapse border border-gray-200 text-sm text-gray-700">
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                        Email:
                      </td>
                      <td className="p-3 text-gray-800 font-semibold border border-gray-200">
                        {data.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                        Phone:
                      </td>
                      <td className="p-3 text-gray-800 border font-semibold border-gray-200">
                        {data.phone}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                       Current City:
                      </td>
                      <td className="p-3 text-gray-800 border font-semibold border-gray-200">
                        {data.city}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                       Preferred Location:
                      </td>
                      <td className="p-3 text-gray-800 border font-semibold border-gray-200">
                        {data.location}
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                        Relocate:
                      </td>
                      <td className="p-3 text-gray-800 border font-semibold border-gray-200">
                        {data.relocate}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                        Notice Period:
                      </td>
                      <td className="p-3 text-gray-800 border font-semibold border-gray-200">
                        {data.notice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 w-full max-w-lg">
                <h2 className="text-lg font-semibold text-blue-800">Skills</h2>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {data?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 text-sm font-bold px-3 py-1  border-2 border-blue-600 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-lg gap-4 mt-6">
                <div className="group rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 p-5 text-center transition duration-300 hover:shadow-lg cursor-pointer">
                  <p className="text-white text-2xl font-bold">
                    {data.experience} Years
                  </p>
                  <p className="text-white text-sm">Experience</p>
                </div>
                <div className="group rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 p-5 text-center transition duration-300 hover:shadow-lg cursor-pointer">
                  <p className="text-white text-2xl font-bold">
                    {data.current} LPA
                  </p>
                  <p className="text-white text-sm">Current Salary</p>
                </div>
                <div className="group rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 p-5 text-center transition duration-300 hover:shadow-lg cursor-pointer">
                  <p className="text-white text-2xl font-bold">
                    {data.expected} LPA
                  </p>
                  <p className="text-white text-sm">Expected Salary</p>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Applied;
