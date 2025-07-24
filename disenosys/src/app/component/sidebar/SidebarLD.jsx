"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronDown, FaBars } from 'react-icons/fa';
import { SiCoursera, SiGoogleanalytics } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Image from 'next/image';
import Brand from "../../assests/brand-1.png"
import { MdCastForEducation, MdOutlineDashboard } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';

const Sidebar = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const [isCourse, setIsCourse] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    // { href: '/certificate', label: 'Post certificate', icon: <PiCertificateBold /> },
    {href: "/dashboard-l&d",label:"Dashboard",icon:<SiGoogleanalytics />},
    { href: '/coursel&d', label: 'Course',icon:<SiCoursera /> },
    { href: '/teachers', label: 'Teachers',icon:<GiTeacher />},
    // { href: '/students', label: 'Students', icon: <MdCastForEducation /> },
  ];

  // const handleLogout = () => {
  //   dispatch(LogOut());
  // };

  return (
    <>
      
      <nav className="fixed w-full bg-[#0d1039] text-white shadow-md flex items-center justify-between p-4 z-50 lg:hidden font-garet">
        <button
          className="text-white"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-semibold">L&D Admin Panel</h1>
      </nav>


      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-500 text-white flex flex-col justify-between transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64 z-40`}
      >
        <div className="flex flex-col flex-grow space-y-6">
            <div className='flex flex-col justify-center items-center border-b-2 border-b-white mt-6'>
            <div>
                <Image src={Brand} alt='brand' className='w-24 h-24 rounded-full'/>
            </div>
          <div className="text-center mt-2 text-lg font-medium  md:block hidden mb-6 font-garet">
            L&D Admin Panel
          </div>
          </div>
          <div className="space-y-4">
  {links.map((link) => (
    <Link
      href={link.href}
      key={link.label}
      className={`w-full flex items-center text-black font-garet font-medium py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 ${
        path === link.href ? "bg-white rounded" : ""
      }`}
    >
      <span className="pl-4 mr-3">{link.icon}</span>
      <span>{link.label}</span>
    </Link>
  ))}

  <div>
    <button
      onClick={() => setIsCourse(!isCourse)}
      className={`w-full flex items-center text-black font-garet font-medium py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 ${
        path.startsWith("/students") || path.startsWith("/prerecord") || path.startsWith("/saf-data")
          ? "bg-white"
          : ""
      }`}
    >
      <span className="pl-4 mr-3">
        <MdCastForEducation />
      </span>
      <span>Students</span>
      <FaChevronDown
        className={`ml-1 transition-transform ${
          isCourse ? "rotate-180" : ""
        }`}
      />
    </button>

    {isCourse && (
      <div className="mt-2 space-y-2 px-6">
        <Link
          href="/students"
          className={`w-full flex items-center text-black font-garet font-medium py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 ${
            path === "/students" ? "bg-white rounded" : ""
          }`}
        >
          <span className="pl-4 mr-3">
            <MdCastForEducation />
          </span>
          <span>Hyper-Drive</span>
        </Link>
        {/* <Link
          href="/prerecord"
          className={`w-full flex items-center text-black font-garet font-medium py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 ${
            path === "/prerecord" ? "bg-white rounded" : ""
          }`}
        >
          <span className="pl-4 mr-3">
            <MdCastForEducation />
          </span>
          <span>Pre-Record</span>
        </Link> */}

         <Link
          href="/saf-data"
          className={`w-full flex items-center text-black font-garet font-medium py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 ${
            path === "/saf-data" ? "bg-white rounded" : ""
          }`}
        >
          <span className="pl-4 mr-3">
          <MdOutlineDashboard />
          </span>
          <span>Dashboard</span>
        </Link>

         <Link
          href="/attendance"
          className={`w-full flex items-center text-black font-garet font-medium py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 ${
            path === "/attendance" ? "bg-white rounded" : ""
          }`}
        >
          <span className="pl-4 mr-3">
            <MdCastForEducation />
          </span>
          <span>Attendance</span>
        </Link>

          <Link
          href="/attendance-analytics"
          className={`w-full flex items-center text-black font-garet font-medium py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 ${
            path === "/attendance-analytics" ? "bg-white rounded" : ""
          }`}
        >
          <span className="pl-4 mr-3">
            <MdCastForEducation />
          </span>
          <span>Reports</span>
        </Link>
      </div>
    )}
  </div>
</div>


        </div>
         

        {/* <div className="px-2 py-4">
          <button onClick={handleLogout} className="flex items-center justify-center py-3 gap-2 text-lg  rounded-lg bg-gray-800 hover:bg-red-700 transition-colors duration-200 w-full">
            <FaSignOutAlt className="" />
            <span>Logout</span>
          </button>
        </div> */}
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
