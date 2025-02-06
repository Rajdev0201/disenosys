"use client";
import React, { useEffect, useState } from "react";
import logo from "../assests/logo.png";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice.js";
import Link from "next/link";

const Navbar = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser))); 
    }
  }, [dispatch]);

  return (
    <nav className="shadow-inner bg-blue-100 fixed w-full top-0 left-0 right-0 z-30">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 lg:px-32 py-3">
        <div className="flex items-center w-full md:w-auto justify-between">
          {/* <Link href="/">
            <Image src={logo} alt="Logo" className="w-44 h-auto p-2" />
          </Link> */}
          <div className="md:hidden flex items-center">
            <RiMenu4Fill
              size={30}
              className="text-white cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>

        {/* Menu Links and User Section */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-7 w-full md:w-auto`}
        >
          <div className="text-white relative">
            <FaRegBell size={30} className="text-black"/>
            <span className="absolute -top-2 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </div>

          {user?.user?.user?.userName ||
          user?.user?.name ||
          user?.user?.userName ? (
            <div className="relative flex gap-2 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 group">
              <span className="bg-[#0d1039] shadow-lg px-4 py-2 rounded-full text-white font-poppins font-bold text-lg">
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
    </nav>
  );
};

export default Navbar;
