"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';


const AllLinks = () => {
    const path = usePathname();
  return (
    <div className="flex flex-col justify-center space-y-3">
    <h4 className="text-[#0d1039] font-semibold text-xl lg:text-2xl font-garet px-6 lg:px-4 mb-4">
      Legal Information
    </h4>
    <Link
      href="/termsandcondition"
      className={`border bg-gray-400 shadow-inner rounded-3xl gap-2 flex items-start justify-center w-64 text-center text-xl p-2 text-white font-garet mt-6 ${path === "/termsandcondition" ? "bg-blue-500 text-white" : ""}`}
    >
      <span className="text-center"> Terms & Conditions </span>
    </Link>
    <Link
      href="/privacyandpolicy"
      className={`border shadow-inner rounded-3xl gap-2 flex items-start justify-center w-64 text-center text-xl py-2 text-white font-garet ${path === "/privacyandpolicy" ? "bg-blue-500 text-white" : " bg-gray-400 "}`}
    >
      <span className="text-center"> Privacy & Policy </span>
    </Link>
    <Link
      href="/faq"
      className={`border bg-gray-400 shadow-inner rounded-3xl flex items-center justify-center w-64 text-center text-xl p-2 text-white font-garet ${path === "/faq" ? "bg-blue-500 text-white" : " bg-gray-400 "}`}
    >
      FAQ
    </Link>
  </div>
  )
}

export default AllLinks