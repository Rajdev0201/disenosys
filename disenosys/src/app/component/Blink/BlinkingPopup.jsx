"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from "../../assests/profile/logo.webp";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, setUser } from '@/app/Redux/features/authSlice';
import { getAllCarts } from '@/app/Redux/action/addToCart';
import { payment } from '@/app/Redux/action/Payment';
import { CiSearch } from 'react-icons/ci';
import CartModal from '../CartModal';
import MyModal from '../Modal';
import { IoMdLogOut } from 'react-icons/io';
import { FaBell, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import NotificationDropdown from '../../component/Alert';
import { BsCart3 } from 'react-icons/bs';

const BlinkingAlert = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [search ,setSearch ] = useState("");
  const [filteredData, setFilteredData] = useState([]);  
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const cart = useSelector((state) => state?.currentCart);
  const courses = useSelector((state) => state?.course?.courses);
  const cartUserName = cart?.cartItems?.map((item) => {
    return item.userName;
     });
const user = useSelector((state) => state?.user);
const [dropdownVisible, setDropdownVisible] = useState(false);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const pay = useSelector((state) => state.payment);
const filteredCartItems = cart?.cartItems?.filter(item => item.userName === user?.user?.user?.userName) || [];
const length = filteredCartItems.length;

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCarts());
    const currentPath = router.pathname;
    setActiveLink(currentPath === "/" ? "/" : currentPath);
  }, [dispatch, router.pathname]);


const toggleDropdown = () => {
  setDropdownVisible(prevState => !prevState);
};

const cancelDropdown = () => {
  setDropdownVisible(false);
  setIsDropdownOpen(true)
}

useEffect(() => {
  dispatch(payment());
}, [dispatch]);
  // const handleLinkClick = (link) => {
  //   setActiveLink(link);
  //   setMobileMenuOpen(false);
  //   if (link !== "/company") {
  //     setDropdownOpen(false);
  //   }
  // };

  const handleLogout = () => {
    dispatch(LogOut());
  };
 
  //search course
  
  const specificCourses = [
    "CATIA Foundations for Automotive Designers",
    "Advanced CATIA Surface",
    "Fundamentals Of BIW in Automotive Design",
    "Fundamentals of Plastic Trims",
    "Solid Model Remastering",
    "Automotive B-Pillar Assembly",
    "Bracket And Reinforcement",
    "Automotive Close Volume & Feature Creation",
    "Surface Remastering for Automotive Designers"
  ];

  const filteredCourses = courses?.filter(course => {
    const isInSpecificCourses = specificCourses.includes(course?.courseName);
    return isInSpecificCourses;
  });


  const [isOpen,setIsOpen] = useState(false);

  const handleSearch = (e) => {
   setSearch(e.target.value);
   setIsOpen(e.target.value.length > 0);
  }
  useEffect(() => {
    const filtered =  filteredCourses?.filter((course) => {
      const c = course.courseName?.toLowerCase().includes(search.toLowerCase());
      return c;
    })
    setFilteredData(filtered)
  },[search])

  const goToDescriptionPage = (slug) => {
    router.push(`/description-update/${encodeURIComponent(slug)}`);
  };

  const closePopup = () => { 
    setIsOpen(false);
    setSearch("");
  }

  return (

    <div className="hidden lg:flex fixed top-0 right-0 w-full lg:z-50 px-16 items-center bg-white justify-between lg:h-16">
  <div>
    <Link href="/">
      <Image
        src={logo}
        alt="Logo"
        className="w-48 h-24 object-cover h-auto lg:mt-3"
        width={250}
        height={125}
        priority
        quality={80}
        loading="eager"
      />
    </Link>
  </div>

  <div className="flex items-center gap-6 ml-auto lg:mt-3">
    <div className="flex relative">
      <input
        type="text"
        placeholder="Search Course"
        value={search}
        onChange={handleSearch}
        className="border-2 border-[#0d1039] text-sm rounded-lg pr-10 w-36 px-1 py-2 text-[#0d1039]"
      />
      <CiSearch
        size={24}
        className="text-[#0d1039] hover:text-[#057FE3] absolute top-1/2 right-3 transform -translate-y-1/2"
      />
    </div>

    {isOpen && search && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[500px] relative font-garet">
            {/* Cancel Button */}
            <button
              className="absolute top-2 right-3 bg-red-500 hover:bg-white ring-2 text-white rounded-full ring-gray-300 text-gray-600 hover:text-red-500 text-xl px-3 py-1"
              onClick={closePopup}
            >
              ✖
            </button>

            {/* Heading */}
            <h2 className="text-xl font-medium mb-4 text-center">
              Are you searching for this course? <br />
              <span className="text-blue-600 font-bold">{search}</span>
            </h2>

            {/* Course List */}
            <ul className="space-y-2">
              {filteredData?.length > 0 ? (
                filteredData?.map((course, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200"
                  >
                    <span className="text-gray-800 text-sm font-medium w-56">{course.courseName}</span>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700" onClick={() => goToDescriptionPage(course.courseName)}>
                      View Course
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center">No courses found.</p>
              )}
            </ul>
          </div>
        </div>
      )}

    <div className="relative flex items-center gap-4 hover:cursor-pointer">
    <BsCart3
        size={40}
        className="text-[#4e6e9f]"
        onClick={() => setCartModalOpen(true)}
      />
      {length > 0 && cartUserName.includes(user?.user?.user?.userName ) ? (
        <span
          className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#0d1039] rounded-full ring-2 ring-white z-40"
          onClick={() => setCartModalOpen(true)}
        >
          {length}
        </span>
      ) : (
        <span
          className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#0d1039] rounded-full ring-2 ring-gray-400 z-40"
          onClick={() => setCartModalOpen(true)}
        >
          0
        </span>
      )}
    </div>

      <div className='relative flex items-center gap-4 hover:cursor-pointer' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <FaBell  size={35}
        className="text-[#0d1039]"/>
      <span
          className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#0d1039] rounded-full ring-2 ring-white z-40"
        >
          1
        </span>
        {isDropdownOpen && <NotificationDropdown onClose={() => setIsDropdownOpen(false)} /> }
      </div>


   
    <div className="relative">
    {user?.user?.user?.userName || user?.user?.name || user?.user?.userName  ? (
        <div className="relative flex items-center gap-4 cursor-pointer">
          {/* User Avatar */}
          <div className="flex items-center space-x-2 p-2 rounded-full">
            <div className="bg-[#0d1039] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
            {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
            {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}
            { user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
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
            <div className="absolute top-full right-0 mt-2 w-68 bg-white shadow-lg rounded-md z-50 border border-gray-200">
              {/* User Info */}
              <div className="p-4 border-b-2 flex items-center gap-3">
                <div className="bg-[#0d1039] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
                {user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
                {user?.user?.name?.toLocaleUpperCase()?.charAt(0)}
                {user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">  {user?.user?.user?.userName?.toLocaleUpperCase()}{" "}
                  {user?.user?.name?.toLocaleUpperCase()} {" "} {user?.user?.userName?.toLocaleUpperCase()}{" "}
                  </div>
                  <div className="text-sm text-gray-500">  {user?.user?.user?.userEmail}{" "}  {user?.user?.userEmail}{" "}
                  {user?.user?.email}</div>
                </div>
              </div>

              {/* Dropdown Links */}
              <ul className="py-2 text-gray-800">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link href="/mycourse">My learning</Link></li>
                <Link  href='/cart' className="px-4 py-2 flex justify-between hover:bg-gray-100 cursor-pointer">
                  My cart <span className="">
                  {length > 0 && cartUserName.includes(user?.user?.user?.userName || user?.user?.userName) ? (
        <span
       
          className=" flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#4e6e9f] rounded-full ring-2 ring-white z-50"
        >
          {length}
        </span>
      ) : (
         <span
        href='/cart'
          className="flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#4e6e9f] rounded-full ring-2 ring-white z-50"
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
          onClick={cancelDropdown}>
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
    <MyModal />
  )}
   </div>


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

