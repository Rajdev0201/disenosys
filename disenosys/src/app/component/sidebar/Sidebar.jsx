"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUser, FaCog, FaChartBar, FaSignOutAlt} from 'react-icons/fa';
import { SiSololearn } from "react-icons/si";


const Sidebar = () => {
  const path = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { href: '/profile', label: 'Profile', icon: <FaUser /> },
    {href:'/portfolioDashboard',label:'Portfolio',icon:<SiSololearn />},
    { href: '/settings', label: 'Settings', icon: <FaCog /> },
    { href: '/reports', label: 'Reports', icon: <FaChartBar /> },
  ];

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
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
