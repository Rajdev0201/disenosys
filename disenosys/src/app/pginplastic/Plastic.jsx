"use client";
import React, { useState } from "react";
import "../home/Home.css"

const Plastic = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get("email");
    const mobile = formData.get("mob");

    if (!fname || !email || !mobile || !lname) {
      setResult("Please fill out all fields.");
      return;
    }

    setResult("Sending....");
    formData.append("access_key", "6c016ccc-be7f-4c75-be4c-56e74e4671fa");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setTimeout(() => {
          setResult("");
        }, 1000);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setResult("An error occurred. Please try again.");
    }
  };
  return (
    <div>
      <div className="bg-week">
        <div className="grid lg:grid-cols-12 px-0 py-28 lg:py-44 mt-28">
          <div className="col-span-8 ">
            <div className="space-y-7 mt-20 lg:mt-48 flex flex-col text-white">
            <button
              type="submit"
              class="flex justify-center gap-2 items-center rotate-05 w-64 shadow-xl text-lg bg-[#0d1039] text-white backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            >
              Take Test
              <svg
                class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-white ease-linear duration-300 rounded-full border border-white group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  class="fill-white group-hover:fill-gray-800"
                ></path>
              </svg>
            </button>

            <button
              type="submit"
              class="flex justify-center gap-2 items-center rotate-05 w-64 shadow-xl text-lg bg-[#0d1039] text-white backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            >
             Book a Demo Class
              <svg
                class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-white group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  class="fill-white group-hover:fill-gray-800"
                ></path>
              </svg>
            </button>
            </div>
          </div>

          <div className="col-span-4 flex flex-col justify-end lg:px-8 mt-12">
            <h1 className="font-bold mb-4 text-2xl lg:text-3xl ml-4 lg:ml-5 font-garet">
              Get a call back from us!
            </h1>
            <form onSubmit={onSubmit}>
              <div className="bg-[#6497e6]/30 flex flex-col lg:w-full h-auto p-8 space-y-8 rounded-3xl shadow-inner">
                <div className="grid grid-cols-2 gap-4 font-garet">
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    required
                    placeholder="First Name"
                    className="w-full h-10 px-4 bg-white rounded-full border border-gray-300 focus:outline-none text-gray-500"
                  />
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    required
                    placeholder="Last Name"
                    className="w-full h-10 px-4 bg-white rounded-full border border-gray-300 focus:outline-none text-gray-500"
                  />
                </div>

                <input
                  type="text"
                  name="mob"
                  id="mobil"
                  required
                  placeholder="Mobile Number"
                  className="w-full h-10 px-4 bg-white rounded-full border border-gray-300 focus:outline-none text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  className="w-full h-10 px-4 bg-white rounded-full border border-gray-300 focus:outline-none text-gray-500"
                />
              </div>

              <div className="mx-24 lg:mx-36 -mt-3">
                <button
                  className="bg-[#0d1039] text-white px-12 py-3 rounded-md shadow-inner text-2xl font-semibold"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                {result && <p className="text-white mt-4">{result}</p>}
              </div>
            </form>
          </div>

        </div>
      </div>
        <div className="flex flex-col px-2 lg:px-24 space-y-6">
        <h1 className="lg:text-4xl text-md font-bold font-garet text-center mt-8 text-[#0d1039]">PG Diploma in Plastic Trims Design</h1>
          <p className="font-garet font-medium text-sm lg:text-xl text-[#0d1039]">
            The Postgraduate Diploma in Plastic Trims Design is a speciaspanzed
            program designed to equip students with the technical knowledge and
            industry-relevant skills required for designing high-quaspanty
            plastic trims for automotive, consumer products, and other
            industrial appspancations. This course blends theoretical concepts
            with hands-on training, ensuring a comprehensive understanding of
            plastic materials, manufacturing processes, and design
            methodologies.
          </p>
          <p className="font-garet font-medium text-sm lg:text-xl text-[#0d1039] mt-4 flex flex-col space-y-2 ">
            <b>Key Highspanghts:</b>
            <span>
              ✔ In-depth study of plastic materials, properties, and
              appspancations{" "}
            </span>
            <span>✔ CAD-based plastic trim design and development</span>
            <span>
              ✔ Understanding of injection molding and other manufacturing
              techniques
            </span>
            <span>
              ✔ Understanding of injection molding and other manufacturing
              techniques
            </span>
            <span>✔ Toospanng and surface finishing considerations</span>
            <span>
              ✔ Industry case studies and real-world project appspancations
            </span>
            <span>
              ✔ Training on industry-standard software and design vaspandation
              tools
            </span>
          </p>
        </div> 
        <div className="flex justify-center items-center mt-12 mb-2 lg:mb-6">
          <span className="text-white font-garet p-2 lg:p-4 bg-[#0d1039] text-md lg:text-3xl rounded shadow-inner">View all programmes in plastic trims </span>
        </div>

        <div className="py-12 lg:py-24 bg-[#0d1039]">
        <h1 className="lg:text-5xl text-lg  font-garet font-medium text-white mb-2 lg:mb-20 text-center">PG Diploma in Plastic Trims Design Programmes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 md:px-10 pb-10">

        <div className="bg-[#d7e4f9] text-black p-6 rounded-lg shadow-md font-garet">
          <h2 className="text-2xl font-medium text-center ">Weekend Programme</h2>
          <p className="mt-4 text-lg font-medium "><strong>Duration:</strong></p>
          <p className="text-lg font-medium "><strong>Days:</strong></p>
          <p className="text-lg font-medium"><strong>Time:</strong></p>
          <div className="mt-4 text-center">
            <button className="bg-[#0A0F33] text-white px-4 py-2 rounded-lg">Learn More</button>
          </div>
        </div>
      

        <div className="bg-[#d7e4f9] text-black p-6 rounded-lg shadow-md font-garet">
          <h2 className="text-2xl font-medium text-center ">Live Programme</h2>
          <p className="mt-4 text-lg font-medium "><strong>Duration:</strong></p>
          <p className="text-lg font-medium "><strong>Days:</strong></p>
          <p className="text-lg font-medium"><strong>Time:</strong></p>
          <div className="mt-4 text-center">
            <button className="bg-[#0A0F33] text-white px-4 py-2 rounded-lg">Learn More</button>
          </div>
          </div>


        <div className="bg-[#d7e4f9] text-black p-6 rounded-lg shadow-md font-garet">
          <h2 className="text-2xl font-medium text-center">Recorded Programme</h2>
          <p className="mt-4 text-lg font-medium "><strong>Duration:</strong></p>
          <p className="text-lg font-medium "><strong>Days:</strong></p>
          <p className="text-lg font-medium"><strong>Time:</strong></p>
          <div className="mt-4 text-center">
            <button className="bg-[#0A0F33] text-white px-4 py-2 rounded-lg">Learn More</button>
          </div>
        </div>

      </div>
      </div>

      <div className="bg-[#F8F8F8] text-black py-10 px-10 md:px-20 font-garet">
        <h2 className="text-4xl font-bold mb-6">FAQs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-2xl">What is this programme about?</h3>
            <p className="text-md mt-2 font-medium">
              A specialized course in plastic trim design for automotive, consumer products, and 
              industrial applications, covering CAD, tooling, and manufacturing.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-2xl">Who can apply?</h3>
            <p className="text-md mt-2 font-medium">
              Graduates in Engineering, Industrial Design, or related fields. Diploma holders with 
              experience may also be eligible.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-2xl">Duration & Mode?</h3>
            <p className="text-md mt-2 font-medium">
              Typically 6 months - 1 year, available in online & offline formats.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-2xl">Industries Hiring?</h3>
            <p className="text-md mt-2 font-medium">
              Automotive, consumer electronics, packaging, and medical devices.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-2xl">Fees & Salary?</h3>
            <p className="text-md mt-2 font-medium">
              <li>Fees: ₹1.5 - 2.5 Lakhs ($5,000 - $15,000) </li>
              <li>Salary: ₹4 - ₹12 LPA ($50,000 - $90,000) </li>
            </p>
          </div>
          <div>
            <h3 className="font-medium text-2xl">How to Apply?</h3>
            <p className="text-md mt-2 font-medium">
              Check institute websites for applications, deadlines, and entrance requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plastic;
