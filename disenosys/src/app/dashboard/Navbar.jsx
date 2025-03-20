"use client";
import React, { useEffect, useState } from "react";
import logo from "../assests/logo.png";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { CiUser, CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, setUser } from "../Redux/features/authSlice.js";
import Link from "next/link";

const Navbar = () => {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("profile");
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
    const handleLogout = () => {
        dispatch(LogOut());
      };

    return (
        <nav className="shadow-lg bg-[#182073] fixed w-full top-0 left-0 right-0 z-50 mt-0">
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 font-garet">
                <div className="flex items-center justify-between w-full">
                    <Link href="/">
                        <Image src={logo} alt="Logo" className="w-44 h-auto p-2" />
                    </Link>
                    <div className="md:hidden flex items-center">
                        <RiMenu4Fill size={30} className="text-white" onClick={toggleMobileMenu} />
                    </div>
                </div>

                <div className={`flex items-center hidden md:flex space-x-7`}>
                    {/* <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full bg-white text-gray-800 border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <CiSearch size={25} />
                        </span>
                    </div> */}

                    <div className="text-white relative">
                        <FaRegBell size={24} />
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                    </div>

                    {user?.user?.user?.userName || user?.user?.name || user?.user?.userName ? (
                        <div className="relative hidden md:flex gap-2 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer group">
                            <span className="bg-[#057FE3] shadow-lg px-4 py-2 rounded-full text-white font-garet font-bold text-lg">
                                {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}{" "}
                                {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}{" "}
                                {user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
                            </span>
                        </div>
                    ) : (
                        <div className="text-white">
                            <CiUser size={24} />
                        </div>
                    )}

               <button
            onClick={handleLogout}
            class="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
          >
            <div class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div class="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Logout
            </div>
          </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="flex flex-row gap-5 items-center justify-center md:hidden bg-[#182073] p-4  top-0 left-0 right-0 z-50">
                    <div className="relative w-64 max-w-xs mb-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full bg-white text-gray-800 border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <CiSearch size={25} />
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-white relative">
                            <FaRegBell size={24} />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </div>
                        {/* {user?.user?.user?.userName || user?.user?.name || user?.user?.userName ? (
                        <div className="relative hidden md:flex gap-2 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer group z-50">
                            <span className="bg-[#057FE3] shadow-lg px-4 py-2 rounded-full text-white font-garet font-bold text-lg">
                                {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}{" "}
                                {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}{" "}
                                {user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
                            </span>
                        </div>
                    ) : (
                        <div className="text-white">
                            <CiUser size={24} />
                        </div>
                    )} */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
