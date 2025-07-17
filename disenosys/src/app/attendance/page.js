"use client"
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../coursel&d/Navbar";
import Sidebar from "../component/sidebar/SidebarLD";
import Attendance from "./Attendance";
import { setUser } from "../Redux/features/authSlice";
import { useEffect } from "react";


export default function AttendancePage() {
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
    {user?.user?.user?.userType === 'L&D'?
     <div className="">
     <div className="grid grid-cols-12 h-full mt-16">
       <div className="col-span-2 h-full">
       <Sidebar />
       </div>
       <div className="col-span-10 h-full">
        <div className="">
         <Navbar />
       </div>
         <Attendance />
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