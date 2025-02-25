"use client"
import Navbar from "../adminroute/Navbar";
import Sidebar from "../component/sidebar/SidebarAdmin";
import History from "./History.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
import { useEffect } from "react";

export default function ExamPage() {
  const user = useSelector((state) => state?.user);
  // console.log(user);
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
    <div className="h-screen">
        <Navbar />
        <div className="grid grid-cols-12 h-full mt-16">
          <div className="col-span-2 bg-[#182073] h-full">
            <Sidebar />
          </div>
          <div className="col-span-10 h-full bg-blue-50">
            <History />
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