"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../assests/logo.png";
import { CiSearch } from "react-icons/ci";
import { RiMenu4Fill } from "react-icons/ri";
// import {
//   FiEdit,
//   FiChevronDown,
//   FiTrash,
//   FiShare,
//   FiPlusSquare,
// } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import CartModal from "../CartModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "@/app/Redux/action/addToCart.js";
import Modal from "../Modal.jsx";
import { ShiftingDropDown } from "../Dropdown.jsx";
import { usePathname } from "next/navigation";
import {  LogOut, setUser } from "@/app/Redux/features/authSlice.js";
import { IoMdLogOut } from "react-icons/io";
import LinkedInSocialLogin from "@/app/auth/LinkedIn";
import { payment } from "@/app/Redux/action/Payment";
// import { useSession } from 'next-auth/react';

const Navbar = () => {
  // const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  // console.log(path);

  const user = useSelector((state) => state?.user);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      // Dispatch action to update Redux with localStorage data
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCarts());
    const currentPath = router.pathname;
    setActiveLink(currentPath === "/" ? "/" : currentPath);
  }, [dispatch, router.pathname]);

  const cart = useSelector((state) => state?.currentCart);

  const cartUserName = cart?.cartItems?.map((item) => {
    return item.userName;
});


const pay = useSelector((state) => state.payment);

useEffect(() => {
  dispatch(payment());
}, [dispatch]);

// const paidCourses = pay?.data?.flatMap(item => item?.lineItems.map(course => course.name)) || [];

// const paidCourses = pay?.data
// ?.filter((item) => item?.customerDetails?.name === user?.user?.user?.userName)
// ?.flatMap((item) => item?.lineItems?.map((course) => course.name)) || [];

const filteredCartItems = cart?.cartItems?.filter(item => item.userName === user?.user?.user?.userName) || [];
const length = filteredCartItems.length;



  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileMenuOpen(false);
    if (link !== "/company") {
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(LogOut());
  };

  return (
    <nav className="shadow-lg bg-[#182073] fixed w-full top-0 left-0 right-0 z-50 mt-10">
      <div className=" flex flex-col md:flex-row items-center justify-between px-4 lg:px-32 py-3">
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
           <Link
            href="/"
            >
          <Image src={logo} alt="Logo" className="w-44 h-auto p-2" />
          </Link>
          <div className="md:hidden flex items-center">
            <RiMenu4Fill
              size={30}
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        <div
          className={`hidden md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4`}
        >
          <Link
            href="/"
            passHref
            // onClick={() => handleLinkClick('/')}
            className={`py-2 px-2 font-semibold  hover:text-[#057FE3] font-poppins text-base ${
              path === "/" ? "text-[#057FE3]" : "text-white"
            }`}
          >
            Home
          </Link>
          {/* <h1>Welcome, {session?.user?.name}</h1>
      <button onClick={handleApiCall}>Fetch LinkedIn Profile</button> */}

          <ShiftingDropDown />

          {["Course","Portfolio", "Gallery"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              passHref
              // onClick={() => handleLinkClick(`/${item.toLowerCase()}`)}
              className={`py-2 px-4 font-semibold  hover:text-[#057FE3] font-poppins text-base ${
                path === `/${item.toLowerCase()}`
                  ? "text-[#057FE3]"
                  : "text-white"
              }`}
            >
              {item}
            </Link>
          ))}
          <div className="hidden md:flex space-x-6  justify-center items-center">
            <CiSearch size={30} className="text-white hover:text-[#057FE3]" />
            <div className="relative flex items-center gap-4 hover:cursor-pointer">
              <IoCartSharp
                size={40}
                className="text-white hover:text-[#057FE3]"
                onClick={() => setCartModalOpen(true)}
              />
              {length > 0 && cartUserName.includes(user?.user?.user?.userName) ? (
                <>
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold  bg-[#057FE3] rounded-full ring-2 ring-white z-50"
                    onClick={() => setCartModalOpen(true)}
                  >
                    {length}
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#057FE3] rounded-full ring-2 ring-gray-400 z-50"
                    onClick={() => setCartModalOpen(true)}
                  >
                    0
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex justify-end">
  {user?.user?.user?.userName || user?.user?.name ? (
    <div className="relative flex items-center gap-4 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer group">
      {/* User Avatar - Displaying Initials */}
      <span className="bg-[#057FE3] shadow-lg px-4 py-2 rounded-full text-white font-poppins font-bold text-lg">
        {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)} 
        {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}
      </span>
      
      {/* Dropdown Menu */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative w-44">
          <div className="bg-[#057FE3] text-white flex flex-col rounded-md px-5 py-3">
            <div className="text-center text-base font-bold font-poppins mt-1">
              {user?.user?.user?.userName?.toLocaleUpperCase()} {user?.user?.name?.toLocaleUpperCase()}
            </div>
            <div className="text-center text-base font-bold font-poppins mt-1">
              <Link href="/dashboard">My Profile</Link>
            </div>
            <div className="max-w-44 flex items-center justify-center text-white text-base font-poppins font-bold duration-300 cursor-pointer active:scale-[0.98]">
              <button className="px-0 py-2 flex items-center" onClick={handleLogout}>
                <IoMdLogOut size={20} className="mx-0" />
                <span className="text-center">LOGOUT</span>
              </button>
            </div>
          </div>
          {/* Dropdown arrow - Positioned under the center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
        </div>
      </div>
    </div>
  ) : (
    <Modal />
  )}
</div>



        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-violet-800 shadow-lg z-50 xl:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              <Link
                href="/"
                passHref
                // onClick={() => handleLinkClick('/')}
                className={`py-2 px-4 font-semibold  hover:text-[#057FE3] font-poppins text-base ${
                  path === "/" ? "text-[#057FE3]" : "text-white"
                }`}
              >
                Home
              </Link>

              <ShiftingDropDown />

              {["Course","Portfolio", "Gallery"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  passHref
                  // onClick={() => handleLinkClick(`/${item.toLowerCase()}`)}
                  className={`py-2 px-0 font-semibold hover:text-[#057FE3] font-poppins text-base ${
                    path === `/${item.toLowerCase()}`
                      ? "text-[#057FE3]"
                      : "text-white"
                  }`}
                >
                  {item}
                </Link>
              ))}

              <div className="flex space-x-4 justify-center py-4 border-t border-gray-200">
                <CiSearch
                  size={30}
                  className="text-white hover:text-[#057FE3]"
                />
                <div className="relative flex items-center gap-4 hover:cursor-pointer">
                  <IoCartSharp
                    size={40}
                    className="text-white hover:text-[#057FE3]"
                  />
                 {length > 0 && cartUserName.includes(user?.user?.user?.userName) ? (
                    <>
                      <span
                        className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold  bg-[#057FE3] rounded-full ring-2 ring-gray-400 z-50"
                        onClick={() => setCartModalOpen(true)}
                      >
                        {length}
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#057FE3] rounded-full ring-2 ring-gray-400 z-50"
                        onClick={() => setCartModalOpen(true)}
                      >
                        0
                      </span>
                    </>
                  )}
                </div>
              </div>

              <>
  {user?.user?.user?.userName || user?.user?.name ? (
    <>
      <div className="relative ring-2  ring-white rounded-sm p-2 shadow-lg hover:ring-blue-400 hover:cursor-pointer group">
        {/* User avatar initials */}
        <span className="bg-[#057FE3] shadow-lg px-2 py-1 rounded-sm text-white font-poppins font-bold text-lg">
          {/* Display first initials of the userName or name */}
          {user?.user?.user?.userName?.charAt(0).toLocaleUpperCase()} 
          {user?.user?.name?.charAt(0).toLocaleUpperCase()}
        </span>

        {/* Dropdown */}
        <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative">
            <div className="bg-[#057FE3] text-white flex flex-col rounded-md px-5 py-3">
              {/* User's full name */}
              <div className="text-center text-base font-bold font-poppins mt-1">
                {user?.user?.user?.userName} {user?.user?.name}
              </div>
              {/* Link to "My Profile" */}
              <div className="text-center text-base font-bold font-poppins mt-1">
                <Link href="/dashboard">My Profile</Link>
              </div>

              {/* Logout button */}
              <div className="max-w-44 items-center justify-center text-white text-base font-poppins font-bold duration-300 cursor-pointer active:scale-[0.98]">
                <button className="px-0 py-2 flex items-center" onClick={handleLogout}>
                  <IoMdLogOut size={20} className="mx-0" />
                  <span className="text-center">LOGOUT</span>
                </button>
              </div>
            </div>
            {/* Arrow pointing to the dropdown */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Modal />
    </>
  )}
</>

            </div>
          </div>
        )}
      </div>
      <CartModal
        isOpen={cartModalOpen}
        setIsOpen={setCartModalOpen}
        cart={cart}
      />
    </nav>
  );
};

export default Navbar;

const Option = ({ setDropdownOpen, Icon, text }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setDropdownOpen(false)}
      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
    >
      <Icon size={20} />
      <span>{text}</span>
    </motion.li>
  );
};

const wrapperVariants = {
  open: { opacity: 1, height: "auto", display: "block" },
  closed: { opacity: 0, height: 0, transitionEnd: { display: "none" } },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
