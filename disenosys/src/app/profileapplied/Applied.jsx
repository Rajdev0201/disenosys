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
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white font-Roboto-light">
      {data?.data
        ?.filter((data) => data._id === courseId)
        ?.map((data) => (
          <>
            {/* Header Section */}
            <div className="h-32 w-full bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center">
              <h1 className="text-white text-3xl font-extrabold uppercase tracking-wider">
                Profile Overview
              </h1>
            </div>

            {/* Main Content Section */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Profile Details */}
              <div className="space-y-6">
                <div className="mt-0 flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#182073] text-white text-3xl flex items-center justify-center font-bold rounded-md">
                    {data.name[0]}
                  </div>
                  <div className="text-center mt-4">
                    <h1 className="text-2xl font-bold text-blue-800">
                      {data.name}
                    </h1>
                    <p className="text-gray-600 italic">{data.employee}</p>
                  </div>
                </div>

                <div className="w-full max-w-lg mx-auto">
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
                        <td className="p-3 text-gray-800 font-semibold border border-gray-200">
                          {data.phone}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                          Current City:
                        </td>
                        <td className="p-3 text-gray-800 font-semibold border border-gray-200">
                          {data.city}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                          Preferred Location:
                        </td>
                        <td className="p-3 text-gray-800 font-semibold border border-gray-200">
                          {data.location}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                          Relocate:
                        </td>
                        <td className="p-3 text-gray-800 font-semibold border border-gray-200">
                          {data.relocate}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-blue-600 border border-gray-200">
                          Notice Period:
                        </td>
                        <td className="p-3 text-gray-800 font-semibold border border-gray-200">
                          {data.notice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-lg gap-12 mt-6">
                    <div className="group rounded-lg bg-gradient-to-r w-44 from-blue-700 to-blue-500 p-5 text-center transition duration-300 hover:shadow-lg cursor-pointer">
                      <p className="text-white text-2xl font-bold">
                        <p className="text-white text-2xl font-bold">
                          {data.experience}.{parseInt(data?.expmonths)} Years
                        </p>
                      </p>
                      <p className="text-white text-sm">Experience</p>
                    </div>
                    <div className="group rounded-lg bg-gradient-to-r w-44 from-blue-700 to-blue-500 p-5 text-center transition duration-300 hover:shadow-lg cursor-pointer">
                      <p className="text-white text-2xl font-bold">
                        {/* {data.current} */}
                        {data.current
                          ? `${(
                              parseFloat(data.current.split(" ")[0]) +
                              parseFloat(data.cinr.replace(",", "") / 100000)
                            ).toFixed(1)} LPA`
                          : "N/A"
                          }
                      </p>
                      <p className="text-white text-sm">Current Salary</p>
                    </div>
                    <div className="group rounded-lg bg-gradient-to-r w-44 from-blue-700 to-blue-500 p-5 text-center transition duration-300 hover:shadow-lg cursor-pointer">
                      <p className="text-white text-2xl font-bold">
                        {/* {data.expected} */}
                        {data.expected
                          ? `${(
                              parseFloat(data.expected.split(" ")[0]) +
                              parseFloat(data.einr.replace(",", "") / 100000)
                            ).toFixed(1)} LPA`
                          : "N/A"
                          }
                      </p>
                      <p className="text-white text-sm">Expected Salary</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Companies Experience */}
              <div>
                <h2 className="text-lg font-semibold text-blue-800 mt-5">
                  Companies Experience:
                </h2>
                <div className="flex flex-col gap-4 mt-3">
                  {data?.companies?.map((company, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-lg rounded-lg p-4 border-2 border-gray-200"
                    >
                      <h3 className="text-xl font-semibold text-blue-600">
                        {company.companyName}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        <strong>From:</strong> {company.from}{" "}
                        <strong>To:</strong> {company.to}
                      </p>
                      <div className="mt-3">
                        <h4 className="font-semibold text-gray-800 underline">
                          Details:
                        </h4>
                        {company.rows?.map((row) => (
                          <div key={row._id} className="mt-1">
                            <p className="text-gray-600 text-sm">
                              <strong>Industry:</strong> {row.industry}
                            </p>
                            <p className="text-gray-600 text-sm">
                              <strong>Domain:</strong> {row.domain}
                            </p>
                            <p className="text-gray-600 text-sm">
                              <strong>Software:</strong> {row.software}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Applied;
