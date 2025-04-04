"use client"
import Navbar from "../adminroute/Navbar";
import Sidebar from "../component/sidebar/SidebarAdmin";
import Applicants from "./Applicants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
import { useEffect } from "react";

export default function ApplicantsPage() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

return(
  <>
  {user?.user?.user?.userType === 'admin'?
    <div className="bg-blue-50">
        <Navbar />
        <div className="grid grid-cols-12 h-full mt-16">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-10 ">
            <Applicants />
          </div>
        </div>
    </div>
    :
    <>
    <p className="text-center text-red-600 flex justify-center items-center min-h-screen">Sorry You are not admin!!</p>
    </>
  }
  </>
)
}