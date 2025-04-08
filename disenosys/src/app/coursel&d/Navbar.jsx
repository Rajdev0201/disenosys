"use client";
import React, { useEffect, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, setUser } from "../Redux/features/authSlice.js";

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

  const handleLogout = () => {
    dispatch(LogOut());
  };

  return (
    <nav className="shadow-inner bg-blue-100 fixed w-full top-0 left-0 right-0 z-30">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 lg:px-12 py-3">
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
          {/* <div className="text-white relative">
            <FaRegBell size={30} className="text-black"/>
            <span className="absolute -top-2 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </div> */}

          {user?.user?.user?.userName ||
          user?.user?.name ||
          user?.user?.userName ? (
            <div className="relative group font-garet">
              <div className="flex gap-2 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400">
                <span className="bg-[#0d1039] shadow-lg px-4 py-2 rounded-full text-white font-poppins font-bold text-lg">
                  {user?.user?.user?.userName?.toUpperCase().charAt(0) || ""}
                  {user?.user?.name?.toUpperCase().charAt(0) || ""}
                  {user?.user?.userName?.toUpperCase().charAt(0) || ""}
                </span>
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800/60 text-white text-sm px-4 py-2 rounded-md ring-2 ring-blue-500 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 whitespace-nowrap ">
                <div className="flex">
                  {user?.user?.user?.userName ||
                    user?.user?.userName ||
                    user?.user?.name}
                  <div className="w-2 h-2 mx-2 mt-1 animate-pulse bg-green-500 ring-2 ring-white shadow-xl rounded-full flex justify-center items-center"></div>
                </div>
                <div>{user?.user?.user?.userEmail}</div>
              </div>
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
    </nav>
  );
};

export default Navbar;
