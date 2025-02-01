"use client"
import React from 'react'
import "../home/Home.css";
import { MdPolicy } from 'react-icons/md';
import Link from 'next/link';


const Terms = () => {
  return (
    <div>
     <div className='bg-pr lg:py-64 py-10 lg:mt-28 mt-20'>
      <h1 className='font-bold lg:font-medium text-lg lg:text-6xl font-garet text-[#0d1039] px-4 lg:px-12'>
        Terms & Condition
      </h1>
      <p className='lg:text-2xl font-garet text-white font-medium lg:px-48 mt-3 px-4'>We value your privacy</p>
    </div>
    <div className='grid lg:grid-cols-12  mt-24'> 
    <div className='col-span-12 lg:col-span-3 px-16 lg:px-12'>
      <div className='flex flex-col justify-center space-y-3'>
        <h4 className='text-[#0d1039] font-semibold text-xl lg:text-2xl font-garet px-6 lg:px-4 mb-4'>Legal Information</h4>
         <Link href="/termsandcondition" className='border bg-gray-400 shadow-inner rounded-3xl gap-2 flex items-start justify-center w-64 text-center text-xl p-2 text-white font-garet mt-6'>
      <span className='text-center'> Terms & Conditions </span>
         </Link>
         <Link href="/privacyandpolicy" className='border bg-gray-400 shadow-inner rounded-3xl gap-2 flex items-start justify-center w-64 text-center text-xl py-2 text-white font-garet'>
         <span className='text-center'> Privacy & Policy </span>
         </Link>
         <Link href="/faq" className='border bg-gray-400 shadow-inner rounded-3xl flex items-center justify-center w-64 text-center text-xl p-2 text-white font-garet'>
          FAQ
         </Link>
      </div>
    </div>
    <div className='col-span-12 lg:col-span-9 mb-8 '>
      <div className='flex flex-col justify-center items-center lg:justify-start space-y-4 px-1 mt-12 lg:mt-0 leading-7 lg:px-12'>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at <b className='text-red-600 font-bold'>nulla</b> iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at <b className='text-red-600 font-bold'>nulla</b> iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>
        <p className='font-garet text-lg font-medium text-black'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia at nulla iusto repellendus, ullam sit. Iure, non aliquam omnis vitae voluptatum deserunt dignissimos nisi dolorem facilis sapiente quae molestiae.
        </p>        
      </div>
    </div>
    </div>
    </div>
  )
}

export default Terms