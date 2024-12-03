"use client";
import { LogOut } from '@/app/Redux/features/authSlice.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCog, FaChartBar, FaSignOutAlt, FaChevronDown, FaBars } from 'react-icons/fa';
import { SiAuthentik } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { PiCertificateBold } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";

const Sidebar = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const [isUniversityDropdownOpen, setUniversityDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { href: '/courselist', label: 'Paid Courses', icon: <SiAuthentik /> },
    { href: '/certificate', label: 'Post certificate', icon: <PiCertificateBold /> },
    { href: '/gpdx', label: 'GPDX', icon: <GrScorecard />    },
    { href: '/settings', label: 'Settings', icon: <FaCog /> },
    { href: '/reports', label: 'Reports', icon: <FaChartBar /> },
  ];

  const handleLogout = () => {
    dispatch(LogOut());
  };

  return (
    <>
      
      <nav className="fixed w-full bg-blue-600 text-white shadow-md flex items-center justify-between p-4 z-50 lg:hidden">
        <button
          className="text-white"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </nav>


      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#182073] text-white flex flex-col justify-between transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64 z-40`}
      >
        <div className="flex flex-col mt-20 px-4 flex-grow space-y-6">
  
          <div className="text-center text-2xl font-semibold py-4 md:block hidden">
            Admin Panel
          </div>

     
          <div>
            <button
              onClick={() => setUniversityDropdownOpen(!isUniversityDropdownOpen)}
              className={`flex items-center w-full py-3 px-4  mt-12 lg:mt-0 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                path.startsWith('/historycode') || path.startsWith('/externalcode') ? 'bg-blue-700' : ''
              }`}
            >
              <SiAuthentik className="mr-3" />
              <span>University Code</span>
              <FaChevronDown className={`ml-auto transition-transform ${isUniversityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isUniversityDropdownOpen && (
              <div className="ml-8 mt-2 space-y-2">
                <Link href="/historycode" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/historycode' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  University-List
                </Link>
                <Link href="/externalcode" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/externalcode' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  External-List
                </Link>
              </div>
            )}
          </div>

       
          {links.map((link) => (
            <Link href={link.href} key={link.label} className={`flex items-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === link.href ? 'bg-blue-700' : ''}`}>
              <span className="mr-3">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
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
