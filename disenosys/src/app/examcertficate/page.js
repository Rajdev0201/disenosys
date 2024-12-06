
"use client";

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
import { useEffect } from "react";


const Bulkform = dynamic(() => import("./Share.jsx"), { ssr: false });
const Navbar = dynamic(() => import("../adminroute/Navbar"), { ssr: false });
const Sidebar = dynamic(() => import("../component/sidebar/SidebarAdmin"), { ssr: false });

export default function ExamCertificatePage() {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure this runs only on the client
            const storedUser = localStorage.getItem("profile");
            if (storedUser) {
                dispatch(setUser(JSON.parse(storedUser)));
            }
        }
    }, [dispatch]);

    return (
        <>
            {user?.user?.user?.userType === 'admin' ? (
                <div className="h-screen">
                    <Navbar />
                    <div className="grid grid-cols-12 h-full mt-16">
                        <div className="col-span-2 bg-[#182073] h-full">
                            <Sidebar />
                        </div>
                        <div className="col-span-10 lg:col-span-10 h-full bg-blue-50">
                            <Bulkform />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-red-600 flex justify-center items-center min-h-screen">
                    Sorry, You are not an admin!
                </p>
            )}
        </>
    );
}
