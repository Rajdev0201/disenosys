"use client";
import React, { useEffect, useState } from "react";
import logo from "../assests/logo.png";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { CiUser, CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
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

    return (
        <nav className="shadow-lg bg-[#182073] fixed w-full top-0 left-0 right-0 z-50 mt-0">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 lg:px-32 py-3">
                <div className="flex items-center justify-between w-full">
                    <Link href="/">
                        <Image src={logo} alt="Logo" className="w-44 h-auto p-2" />
                    </Link>
                    <div className="md:hidden flex items-center">
                        <RiMenu4Fill size={30} className="text-white" onClick={toggleMobileMenu} />
                    </div>
                </div>

                <div className={`flex items-center ${isMobileMenuOpen ? 'flex-col md:flex-row' : 'hidden md:flex'} space-x-7`}>
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full bg-white text-gray-800 border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <CiSearch size={25} />
                        </span>
                    </div>

                    <div className="text-white relative">
                        <FaRegBell size={24} />
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                    </div>

                    {user?.user?.user?.userName || user?.user?.name || user?.user?.userName ? (
                        <div className="relative hidden md:flex gap-2 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer group">
                            <span className="bg-[#057FE3] shadow-lg px-4 py-2 rounded-full text-white font-poppins font-bold text-lg">
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
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="flex flex-col md:hidden bg-[#182073] p-4 fixed top-50 left-0 right-0 z-50">
                    <div className="relative w-full max-w-xs mb-2">
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
                        {user?.user?.user?.userName || user?.user?.name || user?.user?.userName ? (
                        <div className="relative hidden md:flex gap-2 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer group">
                            <span className="bg-[#057FE3] shadow-lg px-4 py-2 rounded-full text-white font-poppins font-bold text-lg">
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
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
