"use client"
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Success = () => {

  const search = useSearchParams();
  const orderId = search.get("orderId");
  const amount = search.get("amount");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-6">
      <div className="text-center">
      <div className="flex justify-center mb-4">
          <FiCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-semibold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been successfully processed.
        </p>

        <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="">
              <tr className='bg-[#182073] text-white'>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Field</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-x divide-[#182073]">
              <tr>
                <td className="border px-4 py-2">Order ID</td>
                <td className="border px-4 py-2">{orderId}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Amount Paid</td>
                <td className="border px-4 py-2">{amount}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Status</td>
                <td className="border px-4 py-2">Successful</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Link href="/">
          <button className="inline-block px-2 py-3 mt-10 rounded-lg bg-[#182073] text-white font-semibold hover:text-[#182073] hover:bg-white transition-colors">
            Continue to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
