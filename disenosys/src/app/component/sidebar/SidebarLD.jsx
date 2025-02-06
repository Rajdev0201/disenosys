"use client";
import { LogOut } from '@/app/Redux/features/authSlice.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCog, FaChartBar, FaSignOutAlt, FaChevronDown, FaBars } from 'react-icons/fa';
import { SiAuthentik, SiCoursera } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { PiCertificateBold } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";
import Image from 'next/image';
import Brand from "../../assests/brand-1.png"
import { MdCastForEducation } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';

const Sidebar = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const [isUniversityDropdownOpen, setUniversityDropdownOpen] = useState(false);
  const [isCourse, setIsCourse] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    // { href: '/certificate', label: 'Post certificate', icon: <PiCertificateBold /> },
    { href: '/coursel&d', label: 'Course',icon:<SiCoursera /> },
    { href: '/teachers', label: 'Teachers',icon:<GiTeacher />},
    { href: '/students', label: 'Students', icon: <MdCastForEducation /> },
  ];

  const handleLogout = () => {
    dispatch(LogOut());
  };

  return (
    <>
      
      <nav className="fixed w-full bg-[#0d1039] text-white shadow-md flex items-center justify-between p-4 z-50 lg:hidden">
        <button
          className="text-white"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-semibold">L&D Admin Panel</h1>
      </nav>


      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0d1039] text-white flex flex-col justify-between transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64 z-40`}
      >
        <div className="flex flex-col flex-grow space-y-6">
            <div className='flex flex-col justify-center items-center border-b-2 border-b-white mt-6'>
            <div>
                <Image src={Brand} alt='brand' className='w-28 h-28 object-cover'/>
            </div>
          <div className="text-center mt-2 text-lg font-semibold  md:block hidden mb-6">
            L&D Admin Panel
          </div>
          </div>
         <div className='px-6 space-y-4'>
          {links.map((link) => (
            <Link href={link.href} key={link.label} className={` flex justify-start items-center py-2 px-12 rounded-md hover:bg-blue-400  transition-colors duration-200 ${path === link.href ? 'bg-blue-400 rounded-md' : ''}`}>
              <span className="mr-3">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          </div>
        </div>

        <div className="px-6 py-4">
          <button onClick={handleLogout} className="flex items-center py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 w-full">
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
