"use client";
import { LogOut } from '@/app/Redux/features/authSlice.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUser, FaCog, FaChartBar, FaSignOutAlt} from 'react-icons/fa';
import { SiAuthentik, SiSololearn } from "react-icons/si";


const Sidebar = () => {
  const path = usePathname();

  const links = [
    { href: '/adminroute', label: 'University Code', icon: <SiAuthentik /> },
    { href: '/external', label: 'External Code', icon: <SiAuthentik /> },
    // {href:'/portfolioDashboard',label:'Portfolio',icon:<SiSololearn />},
    { href: '/historycode', label: 'Student-List', icon: <SiAuthentik /> },
    { href: '/externalcode', label: 'External-List', icon: <SiAuthentik /> },
    { href: '/settings', label: 'Settings', icon: <FaCog /> },
    { href: '/reports', label: 'Reports', icon: <FaChartBar /> },
  ];


  const handleLogout = () => {
    dispatch(LogOut());
  };

  return (
    <div className="fixed top-0 left-0 w-1/6 h-screen text-white flex flex-col justify-between">
      {/* Navigation Links */}
      <div className="flex flex-col space-y-4 mt-20 px-6 flex-grow">
        {links.map((link) => (
          <Link href={link.href} key={link.label}
            className={`flex items-center py-2 px-4 rounded-lg text-white hover:bg-blue-600 transition-colors duration-200 ${
              path === link.href ? 'bg-blue-700' : ''
            }`}
          >
            <span className="mr-3">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-6 py-4">
        <Link href="/logout"
          className="flex items-center py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200">
          <FaSignOutAlt className="mr-3" />
          <span onClick={handleLogout}>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
