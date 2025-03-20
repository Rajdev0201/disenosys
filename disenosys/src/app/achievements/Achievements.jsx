"use client";
import { LuBadgeCheck } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice";
import { fetchCourse } from "../Redux/action/Course";
import { payment } from "../Redux/action/Payment";


const Achievements = () => {
  const dispatch = useDispatch();
  
  const pay = useSelector((state) => state.payment);
  const courses = useSelector((state) => state?.course?.courses);
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(payment());
  }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6 font-garet">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map through achievements */}
        {pay?.data?.length > 0 ? (
          pay?.data?.map((item) =>
            item.customerDetails.name === user?.user?.user?.userName ? (
              item.isActive ? (
                item.lineItems.map((course, i) => {
                  const matchedCourse = courses?.find(
                    (c) => c.courseName === course.name
                  );

                  return (
                    <div key={i} className="flex items-center bg-gray-100 p-6 rounded-lg shadow-md">
                      {/* Left Side - Course Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{course.name}</h3>
                        <div className="flex items-center text-green-600 mt-2">
                          <FaCheckCircle className="mr-1" />
                          <p className="text-xs">Completed</p>
                        </div>
                      </div>

                      {/* Right Side - Badge Icon */}
                      <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-md">
                        <span className="text-4xl">
                          <LuBadgeCheck />
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p key={item.id} className="text-gray-500 text-center">
                  No completed courses found.
                </p>
              )
            ) : null
          )
        ) : (
          <p className="text-gray-500 text-center">No achievements available.</p>
        )}
      </div>
    </div>
  );
};

export default Achievements;
