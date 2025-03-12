"use client"
import Navbar from "../coursel&d/Navbar.jsx";
import Sidebar from "../component/sidebar/SidebarLD";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
import { useEffect } from "react";

export default function DashboardRoutePage() {
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
  {user?.user?.user?.userType === 'L&D'?
    <div className="">
       
        <div className="grid grid-cols-12 h-full mt-16">
          <div className="col-span-2 h-full">
          <Sidebar />
          </div>
          <div className="col-span-10">
           <div className="">
            <Navbar />
          </div>
            <Home />
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