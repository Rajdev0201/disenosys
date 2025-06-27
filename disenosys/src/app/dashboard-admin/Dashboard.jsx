"use client";
import React, { useEffect } from "react";
import Charts from "./Chart";
import { GrCertificate, GrScorecard } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getCareer, getMentor } from "../Redux/action/Portfolio";
import { Online } from "../Redux/action/onlineStd";
import { companyCode, externalCode, studentCode } from "../Redux/action/auth";
import { CourseList } from "../Redux/action/CourseCertificate.js";
import { InternList } from "../Redux/action/internCertificate.js";
import { gpdxList } from "../Redux/action/gpdx.js";
import { ExamList } from "../Redux/action/examCertificate.js";
import { payment } from "../Redux/action/Payment";
import { PiStudentBold } from "react-icons/pi";

const Dashboard = () => {
  const data = useSelector((state) => state.career);
  const Data = useSelector((state) => state.mentor);
  const { online } = useSelector((state) => state.online);
  const intern = useSelector((state) => state.intern);
  const course = useSelector((state) => state.coursec);
  const exam = useSelector((state) => state.exam);
  const gpdx = useSelector((state) => state.gpdx);
  const student = useSelector((state) => state.companyCode);
  const University = useSelector((state) => state.code);
  const external = useSelector((state) => state.external);
  const pay = useSelector((state) => state.payment);
  const mentor = Data?.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCareer());
    dispatch(getMentor());
    dispatch(Online());
    dispatch(studentCode());
    dispatch(externalCode());
    dispatch(companyCode());
    dispatch(CourseList());
    dispatch(InternList());
    dispatch(gpdxList());
    dispatch(ExamList());
    dispatch(payment());
  }, [dispatch]);

 return (
    <div className="px-8 py-0 flex-1">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 font-sans">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <GrCertificate className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!intern.data && (
              <div className="text-gray-500 text-md">Loading</div>
            )}
            <p className="text-2xl font-bold">{intern?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">Internship</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <GrCertificate className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!exam.data && <div className="text-gray-500 text-md">Loading</div>}
            <p className="text-2xl font-bold">{exam?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">Exam</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <GrCertificate className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!course.data && (
              <div className="text-gray-500 text-md">Loading</div>
            )}
            <p className="text-2xl font-bold">{course?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">Course</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <GrCertificate className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!gpdx.data && <div className="text-gray-500 text-md">Loading</div>}
            <p className="text-2xl font-bold">{gpdx?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">Gpdx</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <GrScorecard className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!University.data && (
              <div className="text-gray-500 text-md">Loading</div>
            )}
            <p className="text-2xl font-bold">{University?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">
              University List
            </h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <GrScorecard className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!external.data && (
              <div className="text-gray-500 text-md">Loading</div>
            )}
            <p className="text-2xl font-bold">{external?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">External List</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <GrScorecard className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!student.data && (
              <div className="text-gray-500 text-md">Loading</div>
            )}
            <p className="text-2xl font-bold">{student?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">Company List</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="">
            <PiStudentBold className="w-12 h-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-end">
            {!pay.data && <div className="text-gray-500 text-md">Loading</div>}
            <p className="text-2xl font-bold">{pay?.data?.length}</p>
            <h2 className="text-md font-medium text-gray-500">Course Joined</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-sans h-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="border shadow-sm rounded-md">
            <h2 className="text-2xl font-semibold p-3 text-gray-700 font-garet">
              Applied Data
            </h2>
          </div>
          <table className="w-full mt-4 bg-white">
            <thead>
              <tr className="font-garet font-medium text-lg">
                <th className="px-4 py-2">S.no</th>
                <th className="px-4 py-2">Applied Type</th>
                <th className="px-4 py-2">Totally Applied</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="font-garet font-medium text-xl">
                <td className="text-center p-6 ">01</td>
                <td className="text-center">Career</td>
                {!data.data && (
                  <td className="text-gray-500 text-sm">Loading</td>
                )}
                <td className="text-center">{data?.data?.length}</td>
              </tr>
              <tr className="font-garet font-medium text-xl bg-gray-100">
                <td className="text-center p-6 ">02</td>
                <td className="text-center">Mentor</td>
                {!mentor && <td className="text-gray-500 text-md">Loading</td>}
                <td className="text-center">{mentor?.length}</td>
              </tr>
              <tr className="font-garet font-medium text-xl">
                <td className="text-center p-6 ">03</td>
                <td className="text-center">SAF</td>
                {!online.data && (
                  <td className="text-gray-500 text-md">Loading</td>
                )}
                <td className="text-center">
                  {online?.data?.length === 0 ? (
                    <button className="bg-red-200 text-garet text-red-800 font-medium p-2 rounded-2xl text-md">
                      Not Applied
                    </button>
                  ) : (
                    <span> {online?.data?.length} </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
