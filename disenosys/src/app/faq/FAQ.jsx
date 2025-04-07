"use client"
import React, { useState } from 'react'
import "../home/Home.css";
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import Link from 'next/link';
import AllLinks from '../component/LegalInfo/AllLinks';


const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
          question: "What services does your company offer?",
          answer:
            "We provide a range of services ,Explore our website to learn more.",
        },
        {
          question: "How can I contact customer support?",
          answer:
            "You can reach our support team via email, phone, or the contact form available on our website's footer.",
        },
        {
          question: "Do you offer custom solutions for businesses?",
          answer:
            "Yes, we specialize in tailor-made solutions based on your business needs. Contact us for a consultation.",
        },
        {
          question: "Where can I find pricing details?",
          answer:
            "Pricing varies based on the service you choose. Visit our pricing page or get in touch with us for a custom quote.",
        },
        {
          question: "Is my data secure on your platform?",
          answer:
            "Absolutely! We prioritize data security and follow industry standards to protect your information.",
        },
        {
          question: "Do you offer refunds for your services?",
          answer:
            "Refund policies vary based on the service. Please refer to our Terms & Conditions page for details.",
        },
        {
          question: "How often is your website updated?",
          answer:
            "We regularly update our website to ensure accuracy, security, and the latest information on our offerings.",
        },
        {
          question: "Can I partner with your company for business opportunities?",
          answer:
            "Yes, we welcome collaboration! Visit our Partnerships page to learn more about how we can work together.",
        },
        {
          question: "Where can I find your company’s latest news and updates?",
          answer:
            "Check out our Blog or News section for the latest updates, announcements, and industry insights.",
        },
        {
          question: "Do you have a career page for job opportunities?",
          answer:
            "Yes! Visit our Careers page to explore job openings and apply to join our team.",
        },
        {
          question: "How can I subscribe to your newsletter?",
          answer:
            "You can subscribe by entering your email in the subscription form found in the website footer.",
        },
        {
          question: "Are your services available internationally?",
          answer:
            "Yes, we serve clients globally. Our remote capabilities allow us to work with businesses worldwide.",
        },
      ];
      
  
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  return (
    <div>
    <div className='bg-faq lg:py-64 py-10 lg:mt-24 mt-20'>
      <h1 className='font-bold lg:font-medium text-lg lg:text-6xl font-garet text-[#0d1039] px-4 lg:px-64'>
        FAQ
      </h1>
      <p className='lg:text-2xl font-garet text-white font-medium lg:px-48 mt-3 px-4'>We value your privacy</p>
    </div>
    <div className='grid lg:grid-cols-12  mt-24'> 
    <div className='col-span-12 lg:col-span-3 px-16 lg:px-12'>
      <AllLinks/>
    </div>
    <div className='col-span-12 lg:col-span-8 mb-8 '>
    <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md bg-white shadow-md font-garet">
              <div className="flex justify-between items-center p-4">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <button
                  className="text-[#0d1039]"
                  onClick={() => toggleFAQ(index)}
                >
                  {activeIndex === index ? (
                    <IoIosArrowDropdown size={30} />
                  ) : (
                    <IoIosArrowDropright size={30} />
                  )}
                </button>
              </div>
              {activeIndex === index && (
                <div className="p-4 border-t">
                  <p className="text-gray-700 text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
    </div>
    </div>
  )
}

export default FAQ;