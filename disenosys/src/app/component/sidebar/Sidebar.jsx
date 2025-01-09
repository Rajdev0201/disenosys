"use client";
import { LogOut } from '@/app/Redux/features/authSlice.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCog, FaChartBar, FaSignOutAlt, FaBars, FaHome, FaUser } from 'react-icons/fa';
import {  SiSololearn } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { IoCreate } from 'react-icons/io5';

const Sidebar = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
    // { href: '/profile', label: 'Profile', icon: <FaUser /> },
    // {href:'/portfolioDashboard',label:'Portfolio',icon:<SiSololearn />},
    {href:'/mycourse',label:'Mycourse',icon:<SiSololearn />},
    // {href:'/createblog',label:'Create Blog',icon:<IoCreate />},
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
      </nav>


      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#182073] text-white flex flex-col justify-between transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64 z-40`}
      >
        <div className="flex flex-col mt-20 px-4 flex-grow space-y-6">
  

       
          {links.map((link) => (
            <Link href={link.href} key={link.label} className={`flex items-center mt-12 lg:mt-0 py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === link.href ? 'bg-blue-700' : ''}`}>
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
