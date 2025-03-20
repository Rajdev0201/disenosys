"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import brand from "../assests/brand-1.png";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../Redux/action/Payment.js";
import { setUser } from "../Redux/features/authSlice";
import { fetchCourse } from "../Redux/action/Course";
import { useRouter } from "next/navigation";

const Course = () => {
  const pay = useSelector((state) => state.payment);
  const courses = useSelector((state) => state?.course?.courses);
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const router = useRouter();

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

  const goTo = (name, id) => {
    const encodedName = encodeURIComponent(name); 
    router.push(`/recorded?courseName=${encodedName}&id=${id}`);
  };
  

  return (
    <div className="py-16 md:px-40 lg:px-6 lg:py-6">
      <div className="flex flex-col">
      <h4 className="text-[#182073] font-medium text-xl font-garet">
        My Course
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-4 container mx-auto mt-10 gap-3">
        {pay?.data?.map((item) =>
          item.customerDetails.name === user?.user?.user?.userName ? (
            item.isActive ? (
              item.lineItems.map((course, i) => {
                const matchedCourse = courses?.find(
                  (c) => c.courseName === course.name
                );

                return (
                  <div
                    key={`${item._id}-${i}`}
                    className="flex flex-col mr-12 lg:mr-0"
                  >
                    <div className="bg-[#182073] flex rounded-t-md shadow-lg justify-between items-center px-2 lg:px-4 py-2">
                      <Image
                        src={brand}
                        alt="Brand logo"
                        className="w-8 h-8 object-cover"
                      />
                      <h2 className="text-base font-garet font-semibold text-white">
                        Happy Learning!
                      </h2>
                    </div>

                    <div
                      className="w-full h-64 flex flex-col justify-end bg-cover"
                      style={{
                        backgroundImage: `url(${matchedCourse?.imagePath || ""})`,
                      }}
                    >
                      <div className="bg-opacity-3 bg-white text-center py-2">
                        <p className="text-gray-700 text-base font-garet font-bold">
                          {course.name}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#182073] flex justify-between rounded-b-md shadow-lg items-center px-4 py-2">
                      <button className="px-4 text-base font-garet font-semibold text-white">
                        Info
                      </button>
                      <button
                        className="bg-white px-6 py-1 text-base font-garet rounded-sm font-semibold text-[#182073]"
                        onClick={() => goTo(course.name,item?._id
                        )}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div key={item._id} className="text-center  mt-6">
                <p className="text-red-600 font-garet border rounded bg-white shadow-xl p-2">
                  Please wait, you still don&apos;t have admin access.
                </p>
                <p className="text-red-600 font-garet mt-6">Loading...</p>
              </div>
            )
          ) : null
        )}
      </div>
      </div>
    </div>
  );
};

export default Course;
