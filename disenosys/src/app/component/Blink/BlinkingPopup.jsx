"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from "../../assests/profile/logo.jpg"
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, setUser } from '@/app/Redux/features/authSlice';
import { getAllCarts } from '@/app/Redux/action/addToCart';
import { payment } from '@/app/Redux/action/Payment';
import { CiSearch } from 'react-icons/ci';
import { IoCartSharp } from 'react-icons/io5';
import CartModal from '../CartModal';
import MyModal from '../Modal';
import { IoMdLogOut } from 'react-icons/io';
import { FaBell, FaCaretDown } from 'react-icons/fa';

const BlinkingAlert = () => {
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

const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility


const toggleDropdown = () => {
  setDropdownVisible(prevState => !prevState);
};

const pay = useSelector((state) => state.payment);

useEffect(() => {
  dispatch(payment());
}, [dispatch]);



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

    <div className="flex fixed top-0 right-0 w-full z-50 px-16 items-center bg-white justify-between">
  {/* Logo Section */}
  <div>
    <Link href="/">
      <Image
        src={logo}
        alt="Logo"
        className="w-48 h-24 object-cover h-auto lg:-mt-16"
      />
    </Link>
  </div>

  <div className="flex items-center gap-6 ml-auto lg:-mt-12">
    {/* Search Box */}
    <div className="flex relative">
      <input
        type="text"
        placeholder="Search..."
        className="border-2 border-[#0d1039] rounded-lg pr-10 w-36 p-1 text-[#0d1039]"
      />
      <CiSearch
        size={24}
        className="text-[#0d1039] hover:text-[#057FE3] absolute top-1/2 right-3 transform -translate-y-1/2"
      />
    </div>
       
    <FaBell  size={24}
        className="text-[#0d1039]"/>
    {/* Cart Icon */}
    {/* <div className="relative flex items-center gap-4 hover:cursor-pointer">
      <IoCartSharp
        size={40}
        className="text-[#0d1039] hover:text-[#057FE3]"
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
          className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#057FE3] rounded-full ring-2 ring-gray-400 z-50"
          onClick={() => setCartModalOpen(true)}
        >
          0
        </span>
      )}
    </div> */}


    {/* <div className="relative">
      {user?.user?.user?.userName || user?.user?.name ? (
        <div className="relative flex items-center gap-4 shadow-lg hover:ring-blue-400 hover:cursor-pointer group">
          <span className="bg-[#0d1039]  px-4 py-2 rounded-full text-white font-garet font-bold text-lg">
            {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
            {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}
          </span>

          <button onClick={toggleDropdown} className="ml-0">
            <FaCaretDown size={20} className="text-gray-800" />
          </button>

          {dropdownVisible && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-100 transition-opacity duration-300 z-50">
              <div className="relative w-44">
                <div className="bg-[#057FE3] text-white flex flex-col rounded-md px-5 py-3">
                  <div className="text-center text-base font-bold font-garet mt-1">
                    {user?.user?.user?.userName?.toLocaleUpperCase()}{" "}
                    {user?.user?.name?.toLocaleUpperCase()}
                  </div>
                  <div className="text-center text-base font-bold font-garet mt-1">
                    <Link href="/dashboard">My Profile</Link>
                  </div>
                  <div className="max-w-44 flex items-center justify-center text-white text-base font-garet font-bold duration-300 cursor-pointer active:scale-[0.98]">
                    <button className="px-0 py-2 flex items-center" onClick={handleLogout}>
                      <IoMdLogOut size={20} className="mx-0" />
                      <span className="text-center">LOGOUT</span>
                    </button>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <MyModal />
      )}
    </div> */}

  </div>
  <CartModal
        isOpen={cartModalOpen}
        setIsOpen={setCartModalOpen}
        cart={cart}
      />
</div>

  
  );
};

export default BlinkingAlert;

