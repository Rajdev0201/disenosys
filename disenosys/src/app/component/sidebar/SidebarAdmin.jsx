"use client";
import { LogOut } from '@/app/Redux/features/authSlice.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCog, FaChartBar, FaSignOutAlt, FaChevronDown, FaBars, FaMailBulk, FaRegListAlt } from 'react-icons/fa';
import { SiAuthentik } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { PiCertificateBold } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";
import { MdDashboardCustomize } from 'react-icons/md';


const Sidebar = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const [isUniversityDropdownOpen, setUniversityDropdownOpen] = useState(false);
  const [isCourse, setIsCourse] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [certificateList, setCertificateList] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  

  const links = [
    // { href: '/certificate', label: 'Post certificate', icon: <PiCertificateBold /> },
    { href: '/gpdx', label: 'DEMO', icon: <TfiWrite />    },
    { href: '/applicants', label: 'Applicants', icon: <GrScorecard />},
    { href: '/mentors', label: 'Mentors-Profile', icon: <GrScorecard />},
    { href: '/studentsapplied', label: 'Hyper-Drive', icon: <GrScorecard />},
    { href: '/settings', label: 'Settings', icon: <FaCog /> },
    { href: '/reports', label: 'Reports', icon: <FaChartBar /> },
  ];

 

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
        className={`fixed top-0 left-0 h-full w-64 bg-[#182073] text-white flex flex-col justify-between transition-transform duration-300 transform overflow-y-scroll ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64  z-40`}
      >
        <div className="flex flex-col  px-4 flex-grow space-y-6">
  
          {/* <div className="text-center mt-20 text-2xl font-semibold  md:block hidden">
            Admin Panel
          </div> */}
           
           <div className='mt-20'>
             <Link href="/dashboard-admin"  className={`flex items-center py-2  px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === "/dashboard-admin" ? 'bg-blue-700' : ''}`}> <MdDashboardCustomize className="mr-3"  />Dashboard</Link>
           </div>
     
          <div className=''>
            <button
              onClick={() => setUniversityDropdownOpen(!isUniversityDropdownOpen)}
              className={`flex items-center w-full py-2 px-4  lg:mt-0 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                path.startsWith('/historycode') || path.startsWith('/externalcode') ? 'bg-blue-700' : ''
              }`}
            >
              <TfiWrite className="mr-3" />
              <span>GPDX</span>
              <FaChevronDown className={`ml-auto transition-transform ${isUniversityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isUniversityDropdownOpen && (
              <div className="ml-8 mt-2 space-y-2">
                  <Link href="/uploadquestion" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/uploadquestion' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  Upload-Question
                </Link>
                <Link href="/historycode" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/historycode' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  University-List
                </Link>
                <Link href="/externalcode" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/externalcode' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  External-List
                </Link>
                <Link href="/companycode" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/companycode' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  Company-List
                </Link>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => setCertificate(!certificate)}
              className={`flex items-center w-full px-4 py-2  mt-12 lg:mt-0 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                path.startsWith('/examcertficate') || path.startsWith('/certificate') || path.startsWith('/coursecerificate') || path.startsWith('/gpdxcerificate') ? 'bg-blue-700' : ''
              }`}
            >
              <FaMailBulk className="mr-3" />
              <span>Post certificate</span>
              <FaChevronDown className={`ml-auto transition-transform ${certificate ? 'rotate-180' : ''}`} />
            </button>

            {certificate && (
              <div className="ml-8 mt-2 space-y-2">
                <Link href="/certificate" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/certificate' ? 'bg-blue-700' : ''}`}>
                  <PiCertificateBold className="mr-3" />
                  Internship
                </Link>
                <Link href="/examcertficate" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/examcertficate' ? 'bg-blue-700' : ''}`}>
                  <PiCertificateBold className="mr-3" />
                  Exam
                </Link>
                <Link href="/coursecerificate" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/coursecerificate' ? 'bg-blue-700' : ''}`}>
                  <PiCertificateBold className="mr-3" />
                  Course
                </Link>
                <Link href="/gpdxcerificate" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/gpdxcerificate' ? 'bg-blue-700' : ''}`}>
                  <PiCertificateBold className="mr-3" />
                  GPDX
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setCertificateList(!certificateList)}
              className={`flex items-center w-full px-4 py-2  mt-12 lg:mt-0 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                path.startsWith('/course-c-list') || path.startsWith('/intern-c-list') || path.startsWith('/gpdx-c-list') || path.startsWith('/exam-c-list') ? 'bg-blue-700' : ''
              }`}
            >
              <FaRegListAlt className="mr-3" />
              <span>Certification List</span>
              <FaChevronDown className={`ml-auto transition-transform ${certificateList ? 'rotate-180' : ''}`} />
            </button>

            {certificateList && (
              <div className="ml-8 mt-2 space-y-2"> 
              <Link href="/intern-c-list" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/intern-c-list' ? 'bg-blue-700' : ''}`}>
              <PiCertificateBold className="mr-3" />
                   Intern List
                </Link>

                <Link href="/exam-c-list" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/exam-c-list' ? 'bg-blue-700' : ''}`}>
                  <PiCertificateBold className="mr-3" />
                  Exam List
                </Link>

                <Link href="/course-c-list" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/course-c-list' ? 'bg-blue-700' : ''}`}>
                  <PiCertificateBold className="mr-3" />
                  Course List
                </Link>

                <Link href="/gpdx-c-list" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/gpdx-c-list' ? 'bg-blue-700' : ''}`}>
                  <PiCertificateBold className="mr-3" />
                  Gpdx List
                </Link>
              </div>
            )}
          </div>
       
          <div>
            <button
              onClick={() => setIsCourse(!isCourse)}
              className={`flex items-center w-full py-2 px-4  lg:mt-0 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                path.startsWith('/courselist') || path.startsWith('/offlinepaid') ? 'bg-blue-700' : ''
              }`}
            >
              <SiAuthentik className="mr-3" />
              <span>Courses</span>
              <FaChevronDown className={`ml-auto transition-transform ${isCourse ? 'rotate-180' : ''}`} />
            </button>

            {isCourse && (
              <div className="ml-8 mt-2 space-y-2">
                  <Link href="/courselist" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/courselist' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  Online-Paid
                </Link>
                <Link href="/offlinepaid" className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === '/offlinepaid' ? 'bg-blue-700' : ''}`}>
                  <SiAuthentik className="mr-3" />
                  Offline-Paid
                </Link>
              </div>
            )}
          </div>
          {links.map((link) => (
            <Link href={link.href} key={link.label} className={`flex items-center py-2  px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${path === link.href ? 'bg-blue-700' : ''}`}>
              <span className="mr-3">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
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
