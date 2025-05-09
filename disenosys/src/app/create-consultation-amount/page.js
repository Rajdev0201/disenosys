"use client"
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../adminroute/Navbar";
import Sidebar from "../component/sidebar/SidebarAdmin";
import CreateForm from "./CreateForm";
import { useEffect } from "react";
import { setUser } from "../Redux/features/authSlice";




export default function CreateAmountPage () {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch()

     useEffect(() => {
        const storedUser = localStorage.getItem("profile");
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
      }, [dispatch]);
    
      
    return(
        <>
        {user?.user?.user?.userType === 'admin'?
        <div className="">
            <Navbar />
            <div className="grid grid-cols-12 bg-blue-50 min-h-screen">
              <div className="col-span-2">
                <Sidebar />
              </div>
              <div className="col-span-10">
                <CreateForm/>
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