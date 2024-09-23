"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import logo from '../../assests/logo.png';
import { CiSearch } from "react-icons/ci";
import { RiMenu4Fill } from "react-icons/ri";
import { FiEdit, FiChevronDown, FiTrash, FiShare, FiPlusSquare } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from 'next/link';
import CartModal from "../CartModal";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts } from '@/app/Redux/action/addToCart.js';
import Modal from "../Modal.jsx";
import {ShiftingDropDown} from "../Dropdown.jsx";
import { usePathname } from 'next/navigation';
import Blink from "../Blink/BlinkingPopup";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  // console.log(path);
  
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(getAllCarts());
    const currentPath = router.pathname;
    setActiveLink(currentPath === '/' ? '/' : currentPath);
  }, [dispatch, router.pathname]);

  const cart = useSelector((state) => state?.currentCart);
  const length = cart?.cartItems?.length;
  // console.log(length)
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileMenuOpen(false);
    if (link !== '/company') {
      setDropdownOpen(false);
    }
  };


  return (
    <nav className="shadow-lg bg-[#182073] fixed w-full top-0 left-0 right-0 z-50">
      <div className=" flex flex-col md:flex-row items-center justify-evenly px-4 py-3">

        <div className="flex items-center w-full md:w-auto justify-between md:justify-center">
          <Image src={logo} alt='Logo' className='w-44 h-auto p-3' />
          <div className='md:hidden flex items-center'>
            <RiMenu4Fill size={30} className='text-white' onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </div>
        </div>

        <div className={`hidden md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4`}>
     
          <Link href="/" passHref
            // onClick={() => handleLinkClick('/')}
            className={`py-2 px-4 font-semibold  hover:text-[#057FE3] font-poppins text-base ${path === '/' ? 'text-[#057FE3]' : 'text-white'}`}
          >
            Home
          </Link>
    
          <ShiftingDropDown/>

          {['Course', 'Gallery'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} passHref
              // onClick={() => handleLinkClick(`/${item.toLowerCase()}`)}
              className={`py-2 px-4 font-semibold  hover:text-[#057FE3] font-poppins text-base ${path === `/${item.toLowerCase()}` ? 'text-[#057FE3]' : 'text-white'}`}
            >
              {item}
            </Link>
          ))}
             <div className='hidden md:flex space-x-6  justify-center items-center'>
            <CiSearch size={30} className='text-white hover:text-[#057FE3]' />
            <div className='relative flex items-center gap-4 hover:cursor-pointer'>
              <IoCartSharp size={40} className='text-white hover:text-[#057FE3]' />
              {length > 0 &&  user?.user?.user?._id?
                <>
                  <span className='absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold  bg-[#057FE3] rounded-full ring-2 ring-white z-50' onClick={() => setCartModalOpen(true)}>
                    {length}
                  </span>
                </>
                :
                <>
                  <span className='absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#057FE3] rounded-full ring-2 ring-gray-400 z-50' onClick={() => setCartModalOpen(true)}>
                    0
                  </span>
                </>
              }
            </div>
            <div className='hidden md:flex'>
          {user?.user?.user?.userName ?
            <div className='hidden md:flex gap-28 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer'>
            <span className="bg-[#057FE3] shadow-lg px-6 py-4 gap-5 rounded-full text-white font-bold text-base">{user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}</span>
            </div>
            :

            <Modal />
          }
        </div>
          </div>
        </div>
        <Blink/>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-violet-800  shadow-lg z-50">
            <div className="flex flex-col items-center py-4 space-y-4">
              <Link href="/" passHref
                // onClick={() => handleLinkClick('/')}
                className={`py-2 px-4 font-semibold  hover:text-[#057FE3] font-poppins text-base ${path === '/' ? 'text-[#057FE3]' : 'text-white'}`}
              >
                Home
              </Link>

              {/* <div className="relative">
                <button
                  onClick={() => { setDropdownOpen(!dropdownOpen); handleLinkClick('/company'); }}
                  className={`py-2 px-4 font-semibold text-[#182073] hover:text-[#057FE3] font-poppins text-base flex items-center ${activeLink === '/company' ? 'bg-[#2AAA94] text-[#057FE3] ' : ''}`}
                >
                  Company
                  <motion.span variants={iconVariants} animate={dropdownOpen ? "open" : "closed"}>
                    <FiChevronDown size={30} />
                  </motion.span>
                </button>

                {dropdownOpen && (
                  <motion.ul
                    initial="closed"
                    animate={dropdownOpen ? "open" : "closed"}
                    variants={wrapperVariants}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl mt-2"
                  >
                    <Option setDropdownOpen={setDropdownOpen} Icon={FiEdit} text="Edit" />
                    <Option setDropdownOpen={setDropdownOpen} Icon={FiPlusSquare} text="Duplicate" />
                    <Option setDropdownOpen={setDropdownOpen} Icon={FiShare} text="Share" />
                    <Option setDropdownOpen={setDropdownOpen} Icon={FiTrash} text="Remove" />
                  </motion.ul>
                )}
              </div> */}

                   <ShiftingDropDown/>
              

              {['Course', 'Gallery'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} passHref
                  // onClick={() => handleLinkClick(`/${item.toLowerCase()}`)}
                  className={`py-2 px-0 font-semibold hover:text-[#057FE3] font-poppins text-base ${path === `/${item.toLowerCase()}` ? 'text-[#057FE3]' : 'text-white' }`}
                >
                  {item}
                </Link>
              ))}

              <div className='flex space-x-4 justify-center py-4 border-t border-gray-200'>
                <CiSearch size={30} className='text-white hover:text-[#057FE3]' />
                <div className='relative flex items-center gap-4 hover:cursor-pointer'>
                <IoCartSharp size={40} className='text-white hover:text-[#057FE3]' />
                  {length > 0 &&  user?.user?.user?._id?
                <>
                  <span className='absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold  bg-[#057FE3] rounded-full ring-2 ring-gray-400 z-50' onClick={() => setCartModalOpen(true)}>
                    {length}
                  </span>
                </>
                :
                <>
                  <span className='absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-white text-xs font-bold bg-[#057FE3] rounded-full ring-2 ring-gray-400 z-50' onClick={() => setCartModalOpen(true)}>
                    0
                  </span>
                </>
              }
              </div>
              </div>

              <>
              {user?.user?.user?.userName ?
            <div className='hidden md:flex gap-28 ring-4 ring-white rounded-full shadow-lg hover:ring-blue-400 hover:cursor-pointer'>
            <span className=" bg-[#057FE3] shadow-lg px-6 py-4 gap-5 rounded-full text-white font-bold text-base">{user?.user?.user?.userName?.toLocaleUpperCase()?.charAt(0)}</span>
            </div>
            :

            <Modal />
          }
              </>
            </div>
          </div>
        )}
      </div>
      <CartModal isOpen={cartModalOpen} setIsOpen={setCartModalOpen} cart={cart} />
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
  open: { opacity: 1, height: 'auto', display: 'block' },
  closed: { opacity: 0, height: 0, transitionEnd: { display: 'none' } },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
