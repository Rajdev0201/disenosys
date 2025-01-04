"use client";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import brand from "../assests/brand-1.png";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "When does the workshop start?",
      answer:
        "The date and timings of the workshop have been clearly mentioned at the top of the page for your convenience.",
    },
    {
      question: "Will this be live or pre-recorded?",
      answer:
        "The workshop will be conducted live, with opportunities to interact with the mentor in real time.",
    },
    {
      question: "What are the timings?",
      answer:
        "The exact timings are shared at the top of the page and will be updated upon registration.",
    },
    {
      question: "Is this workshop suitable for beginners?",
      answer:
        "Absolutely! The workshop is designed for beginners, professionals, and anyone interested in automotive design.",
    },
    {
      question: "Will there be a certificate upon completion?",
      answer:
        "Yes, all participants will receive a certificate of completion after the workshop.",
    },
    {
      question: "Do I need prior experience in automotive design?",
      answer:
        "No prior experience is needed! This workshop covers everything from the basics to advanced techniques.",
    },
    {
      question: "What tools/software will I need?",
      answer:
        "You will need access to a computer with software like Alias, CATIA, or SolidWorks. We’ll guide you on setting it up.",
    },
    {
      question: "Can I ask questions to the mentor during the session?",
      answer:
        "Yes, there will be dedicated Q&A sessions where you can ask all your questions.",
    },
    {
      question: "If I miss this workshop, can I join the next one?",
      answer:
        "Yes, this workshop will have multiple batches. Stay tuned for future dates.",
    },
    {
      question: "Why is the price of the program so low?",
      answer:
        "We want to make this knowledge accessible to everyone, which is why the workshop is priced affordably.",
    },
    {
      question: "What happens if I make the payment but don’t receive any email?",
      answer:
        "Please check your spam folder or contact us immediately for assistance.",
    },
    {
      question: "When can I receive the bonus?",
      answer:
        "You will get access to all the bonuses during the live sessions.",
    },
    {
      question: "Can I record the session for personal use later?",
      answer:
        "The content is owned by Diesnosys. It is not allowed to record or use it for personal purposes. Doing so may lead to legal consequences. But here’s what you can do 😊 Our best learners take notes or create mind maps and share their insights with the community. So, if you want to revisit your learnings, simply take detailed notes during the session and review them later. Not only does this improve learning retention, but it also enhances the overall workshop experience. Don’t believe it? Give it a try! 😊",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-10 px-4 bg-blue-50 rounded-xl shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h6 className="text-blue-600 font-semibold uppercase text-5xl tracking-wide">
            FAQ
          </h6>
          <p className="text-gray-700 text-md mt-2">
            Here&apos;s everything you may ask...
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md bg-white shadow-md">
              <div className="flex justify-between items-center p-4">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <button
                  className="text-blue-600"
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
      <div className="flex justify-center items-center mt-12">
        <div className="border-2 border-gray-400 rounded shadow-lg">
          <Image src={brand} className="object-cover w-28 h-28" />
        </div>
        <h4 className="text-lg font-bold text-[#182073] font-poppins mx-4 w-48">
          E-Learning Platform, Automotive Design
        </h4>
      </div>
    </div>
  );
};

export default FAQ;
