"use client";
import { getReports } from "@/app/Redux/action/attendance";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const data = [
  {
    text: "Name",
    name: "Raja",
  },
  {
    text: "Email",
    name: "raj@disenosys.com",
  },
  {
    text: "S.id",
    name: "DST110",
  },
  {
    text: "phone",
    name: "999999999",
  },
];
const Details = () => {
  const searchParams = useSearchParams();
  const { attendance, loading } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();
  const fullBatch = searchParams.get("batch");
  let batch = "";
  let sid = "";
  console.log(sid);
  useEffect(() => {
    dispatch(getReports(batch));
  }, [dispatch, batch]);

  if (fullBatch?.includes("?")) {
    const [b, queryString] = fullBatch.split("?");
    batch = b;

    const params = new URLSearchParams(queryString);
    sid = params.get("sid") || "";
  } else {
    batch = fullBatch || "";
  }
  return (
    <>
      <div className="bg-gray-50 p-12 h-screen font-garet">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl">Attendance Details for - {sid} </h1>
          <Link
            href="/attendance-analytics"
            className="bg-black text-white rounded-md shadow-inner px-3 py-1"
          >
            Back
          </Link>
        </div>
        {attendance?.reports?.map((batch) =>
          batch.students
            .filter((s) => s.sid === sid)
            ?.map((std) => (
              <>
                <div className=" grid grid-cols-4 gap-2 mb-10">
                  <div
                    key={std.sid}
                    className="border-2 border-gray-200 bg-blue-400 px-2 py-3 flex flex-col rounded-lg shadow-md text-white"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h4 className="text-base font-medium ">Name</h4>
                        <p className="font-medium text-md">{std.name}</p>
                      </div>
                      <div>
                        <PiStudentFill size={30} />
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 bg-blue-400 px-2 py-3 flex flex-col rounded-lg shadow-md text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h4 className="text-base font-medium ">Student ID</h4>
                        <p className="font-medium text-md">{std.sid}</p>
                      </div>
                      <div>
                        <PiStudentFill size={30} />
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 bg-blue-400 px-2 py-3 flex flex-col rounded-lg shadow-md text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h4 className="text-base font-medium ">First class</h4>
                        <p className="font-medium text-md">
                          {new Date(batch.startedDate).getDate()}-
                          {new Date(batch.startedDate).getMonth() + 1}-
                          {new Date(batch.startedDate).getFullYear()}
                        </p>
                      </div>
                      <div>
                        <PiStudentFill size={30} />
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 bg-blue-400 px-2 py-3 flex flex-col rounded-lg shadow-md text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h4 className="text-base font-medium ">Last class</h4>
                        <p className="font-medium text-md">
                          {new Date(batch.updateAttendanceDate).getDate()}-
                          {new Date(batch.updateAttendanceDate).getMonth() + 1}-
                          {new Date(batch.updateAttendanceDate).getFullYear()}
                        </p>
                      </div>
                      <div>
                        <PiStudentFill size={30} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto flex justify-center">
                  <div className="border-2 border-white bg-blue-400 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex flex-col items-center p-6">
                      <h1 className="text-xl font-semibold text-white mb-3 ">
                        {batch.batch.toUpperCase()}
                      </h1>
                      {std?.topic?.map((items) => (
                        <p key={items} className="font-medium text-sm bg-blue-100 rounded-lg shadow-inner px-4 py-1 mb-2 flex items-center gap-2">
                          {items} <IoCheckmarkDoneCircle  size={25} className="text-green-400"/>
                        </p>
                      ))}
                      <div className="w-full border-b border-blue-200 mb-4"></div>
                      <div className="text-sm text-white w-full space-y-2">
                        <p className="flex justify-between font-bold text-lg">
                          <span className="font-medium">Total Class :</span>{" "}
                          {std.topic.length}
                        </p>
                        <p className="flex justify-between font-bold text-lg">
                          <span className="font-medium">Present:</span>{" "}
                          {std.status.filter((s) => s === true).length}
                        </p>

                        <p className="flex justify-between font-bold text-lg">
                          <span className="font-medium">Absent :</span>{" "}
                          {std.status.filter((s) => s === false).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
        )}
      </div>
    </>
  );
};

export default Details;
