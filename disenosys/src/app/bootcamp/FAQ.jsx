"use client";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import brand from "../assests/brand-1.png"
const FAQ = () => {
  const [isOpen, setOpen] = useState(false);
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const [isOpen4, setOpen4] = useState(false);

  return (
    <div className="py-10 px-4 bg-blue-50 rounded-xl shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h6 className="text-blue-600 font-semibold uppercase text-5xl tracking-wide">
            FAQ
          </h6>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="border rounded-md bg-white shadow-md">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-lg font-medium">
                In how many days will one rank in the first page of a search engine like Google?
              </h3>
              <button
                className="text-blue-600"
                onClick={() => setOpen(!isOpen)}
              >
                {isOpen ? <IoIosArrowDropdown size={30} /> : <IoIosArrowDropright size={30} />}
              </button>
            </div>
            {isOpen && (
              <div className="p-4 border-t">
                <p className="text-gray-700 text-sm">
                  Ranking on Google&apos;s first page depends. If homework is less competitive, then one should rank within weeks. Otherwise, for more competitive keywords, it will take months or more.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="border rounded-md bg-white shadow-md">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-lg font-medium">
                What are the most important factors for SEO success?
              </h3>
              <button
                className="text-blue-600"
                onClick={() => setOpen1(!isOpen1)}
              >
                {isOpen1 ? <IoIosArrowDropdown size={30} /> : <IoIosArrowDropright size={30} />}
              </button>
            </div>
            {isOpen1 && (
              <div className="p-4 border-t">
                <p className="text-gray-700 text-sm">
                  The most important factors involved in any successful SEO are good content, proper keyword analysis, and quality backlinks.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="border rounded-md bg-white shadow-md">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-lg font-medium">Will SEO Increase Sales?</h3>
              <button
                className="text-blue-600"
                onClick={() => setOpen2(!isOpen2)}
              >
                {isOpen2 ? <IoIosArrowDropdown size={30} /> : <IoIosArrowDropright size={30} />}
              </button>
            </div>
            {isOpen2 && (
              <div className="p-4 border-t">
                <p className="text-gray-700 text-sm">
                  Yes, you may see a gradual increase in sales and consumer visits after achieving ranks. To increase sales, we recommend transactional keywords.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="border rounded-md bg-white shadow-md">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-lg font-medium">
                Is SEO a one-time effort or a continuous process?
              </h3>
              <button
                className="text-blue-600"
                onClick={() => setOpen3(!isOpen3)}
              >
                {isOpen3 ? <IoIosArrowDropdown size={30} /> : <IoIosArrowDropright size={30} />}
              </button>
            </div>
            {isOpen3 && (
              <div className="p-4 border-t">
                <p className="text-gray-700 text-sm">
                  SEO is a continuous process. Regular optimization and updates are needed to maintain and improve rankings on search engines.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="border rounded-md bg-white shadow-md">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-lg font-medium">
                How can I improve my websites visibility in a local search result?
              </h3>
              <button
                className="text-blue-600"
                onClick={() => setOpen4(!isOpen4)}
              >
                {isOpen4 ? <IoIosArrowDropdown size={30} /> : <IoIosArrowDropright size={30} />}
              </button>
            </div>
            {isOpen4 && (
              <div className="p-4 border-t">
                <p className="text-gray-700 text-sm">
                  Learn how to optimize your website for local SEO and reach your direct customers in your location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-12 ">
        <div className="border-2 border-gray-400 rounded shadow-lg">
        <Image src={brand} className="object-cover w-28 h-28"/>
        </div>
      <h4 className="text-lg font-bold text-[#182073] font-poppins mx-4 w-44">E-Learing Platform, Automotive design</h4>
      </div>
    </div>
  );
};

export default FAQ;
