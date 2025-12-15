"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../assests/logo.png";
import { CiSearch } from "react-icons/ci";
import { RiMenu4Fill } from "react-icons/ri";
import "../../globals.css";
// import {
//   FiEdit,
//   FiChevronDown,
//   FiTrash,
//   FiShare,
//   FiPlusSquare,
// } from "react-icons/fi";

import { motion } from "framer-motion";
import Link from "next/link";
import CartModal from "../CartModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "@/app/Redux/action/addToCart.js";
import Modal from "../Modal.jsx";
import { usePathname } from "next/navigation";
import { LogOut, setUser } from "@/app/Redux/features/authSlice.js";
import { IoMdLogOut } from "react-icons/io";
import { payment } from "@/app/Redux/action/Payment";
import NotificationDropdown from "../../component/Alert";
import { FaBell, FaCaretDown, FaCaretUp, FaTimes } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
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

  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

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

  const filteredCartItems =
    cart?.cartItems?.filter(
      (item) => item.userName === user?.user?.user?.userName
    ) || [];
  const length = filteredCartItems.length;


  const handleLogout = () => {
    dispatch(LogOut());
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <nav className="shadow-lg bg-[#0d1039] z-20 mt-0 lg:mt-16 fixed top-0 right-0 left-0">
      <div className=" shadow-lg bg-[#0d1039]  flex flex-col md:flex-row items-center justify-center px-4 lg:px-32 py-3">
        <div className="flex lg:hidden items-center w-full md:w-auto justify-between md:justify-start">
          <Link href="/">
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
          className={`hidden md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 `}
        >
          <Link
            href="/"
            passHref
            // onClick={() => handleLinkClick('/')}
            className={`py-2 px-2 font-medium  hover:text-[#057FE3] font-garet text-md ${
              path === "/" ? "text-[#057FE3]" : "text-white"
            }`}
          >
            Home
          </Link>
          {/* <h1>Welcome, {session?.user?.name}</h1>
      <button onClick={handleApiCall}>Fetch LinkedIn Profile</button> */}
          {/* 
          <ShiftingDropDown /> */}

          {[
            "About",
            "Course",
            "Portfolio",
            "Gallery",
            "Admission",
            "Blog",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              passHref
              // onClick={() => handleLinkClick(`/${item.toLowerCase()}`)}
              className={`py-2 px-4 font-garet  hover:text-[#057FE3] font-medium text-md ${
                path === `/${item.toLowerCase()}`
                  ? "text-[#057FE3]"
                  : "text-white"
              }`}
            >
              {item}
            </Link>
          ))}
             <Link
            href="/contact"
            passHref
            // onClick={() => handleLinkClick('/')}
            className={`py-2 px-2 font-medium  hover:text-[#057FE3] font-garet text-md ${
              path === "/contact" ? "text-[#057FE3]" : "text-white"
            }`}
          >
            Contact Us
          </Link>
          {/* <div className="hidden md:flex space-x-6 justify-center items-center">
            <CiSearch size={30} className="text-white hover:text-[#057FE3]" />
            <div className="relative flex items-center gap-4 hover:cursor-pointer mx-4">
              <IoCartSharp
                size={40}
                className="text-white hover:text-[#057FE3]"
                onClick={() => setCartModalOpen(true)}
              />
              {length > 0 && cartUserName.includes(user?.user?.user?.userName) ? (
                <>
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold  bg-[#0d1039] rounded-full ring-2 ring-white z-50"
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
          </div> */}
        </div>

        {/* <div className="hidden md:flex justify-end mx-2">
  {user?.user?.user?.userName || user?.user?.name ? (
    <div className="relative  flex items-center gap-4 ring-4 mx-6 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer group">

      <span className="bg-[#0d1039] shadow-lg px-4 py-2 rounded-full text-white font-font-garet font-bold text-lg">
        {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)} 
        {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}
      </span>
      

      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative w-44">
          <div className="bg-[#057FE3] text-white flex flex-col rounded-md px-5 py-3">
            <div className="text-center text-base font-bold font-font-garet mt-1">
              {user?.user?.user?.userName?.toLocaleUpperCase()} {user?.user?.name?.toLocaleUpperCase()}
            </div>
            <div className="text-center text-base font-bold font-font-garet mt-1">
              <Link href="/dashboard">My Profile</Link>
            </div>
            <div className="max-w-44 flex items-center justify-center text-white text-base font-font-garet font-bold duration-300 cursor-pointer active:scale-[0.98]">
              <button className="px-0 py-2 flex items-center" onClick={handleLogout}>
                <IoMdLogOut size={20} className="mx-0" />
                <span className="text-center">LOGOUT</span>
              </button>
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
        </div>
      </div>
    </div>
  ) : (
    <Modal />
  )}
         </div> */}

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 shadow-lg z-50 xl:hidden">
            <div className="flex flex-col items-center py-1 space-y-2">
              <Link
                href="/"
                passHref
                // onClick={() => handleLinkClick('/')}
                className={`py-2 px-4 font-medium  hover:text-[#057FE3] font-garet text-base ${
                  path === "/" ? "text-[#057FE3]" : "text-white"
                }`}
              >
                Home
              </Link>

              {/* <ShiftingDropDown /> */}

              {[
                "About",
                "Course",
                "Portfolio",
                "Gallery",
                "Admission",
                "Blog",
                "Contact",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  passHref
                  // onClick={() => handleLinkClick(`/${item.toLowerCase()}`)}
                  className={`py-2 px-0 font-medium hover:text-[#057FE3] font-garet text-base ${
                    path === `/${item.toLowerCase()}`
                      ? "text-[#057FE3]"
                      : "text-white"
                  }`}
                >
                  {item}
                </Link>
              ))}

              <div className="flex space-x-4 justify-center items-center py-4 border-t border-gray-200">
                <CiSearch
                  size={30}
                  className="text-white hover:text-[#057FE3]"
                />
                <div
                  className="relative flex items-center gap-4 hover:cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaBell size={35} className="text-white" />
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#0d1039] rounded-full ring-2 ring-white z-50">
                    1
                  </span>
                  {isDropdownOpen && (
                    <NotificationDropdown
                      onClose={() => setIsDropdownOpen(false)}
                    />
                  )}
                </div>
                  <div className="relative flex items-center gap-4 hover:cursor-pointer">
                     <BsCart3
                         size={40}
                         className="text-white"
                         onClick={() => setCartModalOpen(true)}
                       />
                       {length > 0 && cartUserName.includes(user?.user?.user?.userName) ? (
                         <span
                           className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#0d1039] rounded-full ring-2 ring-white z-50"
                           onClick={() => setCartModalOpen(true)}
                         >
                           {length}
                         </span>
                       ) : (
                         <span
                           className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#0d1039] rounded-full ring-2 ring-gray-400 z-50"
                           onClick={() => setCartModalOpen(true)}
                         >
                           0
                         </span>
                       )}
                  </div>
                                       
    <div className="relative">
    {user?.user?.user?.userName || user?.user?.name ? (
        <div className="relative flex items-center gap-4 cursor-pointer">
          {/* User Avatar */}
          <div className="flex items-center space-x-2 p-2 rounded-full">
            <div className="bg-[#0d1039] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
            {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
            {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}
            </div>

            <div onClick={toggleDropdown} className="flex items-center gap-2">
              {/* <span className="font-semibold text-black">
              {user?.user?.user?.userName?.toLocaleUpperCase()}{" "}
              {user?.user?.name?.toLocaleUpperCase()}
              </span> */}
              {dropdownVisible ? (
                <FaCaretUp size={20} className="text-gray-800" />
              ) : (
                <FaCaretDown size={20} className="text-gray-800" />
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="absolute -top-96 right-0  mt-2 w-64 bg-white shadow-lg rounded-md z-50 border border-gray-200">
              {/* User Info */}
              <div className="px-2 py-3 border-b-2 flex items-center gap-3">
                <div className="bg-[#0d1039] text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold">
                {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
                {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">  {user?.user?.user?.userName?.toLocaleUpperCase()}{" "}
                  {user?.user?.name?.toLocaleUpperCase()}
                  </div>
                  <div className="text-sm text-gray-500">  {user?.user?.user?.userEmail}{" "}
                  {user?.user?.email}</div>
                </div>
                 <FaTimes className="text-gray-500 flex flex-end  hover:text-red-600 cursor-pointer" onClick={() => toggleDropdown(false)} />
              </div>

              {/* Dropdown Links */}
              <ul className="py-2 text-gray-800">
                <Link href="/mycourse" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My learning</Link>
                <Link href="/cart" className="px-4 py-2 flex justify-between hover:bg-gray-100 cursor-pointer">
                  My cart <span className="">
                  {length > 0 && cartUserName.includes(user?.user?.user?.userName) ? (
        <span
          className=" flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#4e6e9f] rounded-full ring-2 ring-white z-50"
          onClick={() => setCartModalOpen(true)}
        >
          {length}
        </span>
      ) : (
        <span
          className="flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#4e6e9f] rounded-full ring-2 ring-white z-50"
          onClick={() => setCartModalOpen(true)}
        >
          0
        </span>
      )}
                  </span>
                </Link>
                <li className="px-4 py-2 flex justify-between hover:bg-gray-100 cursor-pointer">
                  Notifications 
                  <span
          className=" flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#4e6e9f] rounded-full ring-2 ring-white z-50"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          1
        </span>

                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link href ="/settings">Account settings</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link href="/payment-methods" >Payment methods</Link> </li> 
               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link href="/purchase-history" >Purchase history</Link> </li> 
               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <Link href="/edit-profile" >Edit profile</Link> </li>
               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <Link href="/support">Help and support</Link> </li>
              </ul>

              {/* Logout Button */}
              <div
                className="flex items-center justify-center gap-2 py-3 text-red-600 font-semibold hover:bg-gray-100 cursor-pointer border-t"
                onClick={handleLogout}
              >
                <IoMdLogOut size={18} />
                Logout
              </div>
            </div>
          )}
        </div>
  ) : (
    <Modal />
  )}
   </div>
              </div>
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
