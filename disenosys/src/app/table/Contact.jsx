"use client";
import React, { useState } from "react";

const Contact = () => {
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
    <div className=" bg-blue-50 mb-5 lg:py-20">
      <div className="grid lg:grid-cols-2 lg:gap-12">
        <div className="bg-[#0d1039]/50 text-white lg:w-3/4 h-20 mt-6 lg:mt-24 rounded-br-2xl rounded-tr-2xl shadow-inner ">
            <span className="flex items-center justify-center p-3 font-garet lg:text-5xl font-medium">For More Info</span>
        </div>

        <div className="lg:p-6 p-2 mt-4 lg:mt-0">
          <h1 className="font-bold mb-4 text-2xl lg:text-4xl ml-5 font-garet">Get a call back from us!</h1>
          <form onSubmit={onSubmit}>
          <div className="bg-[#6497e6]/30 flex flex-col lg:w-3/4 h-auto p-8 space-y-8 rounded-3xl shadow-inner">
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
          
          <div className="mx-24 lg:mx-40 -mt-3">
          <button className="bg-[#0d1039] text-white px-12 py-3 rounded-md shadow-inner text-2xl font-semibold"  type="submit"
                      disabled={loading}>
                          {loading ? "Sending..." : "Submit"}
                      </button>
                      {result && <p className="text-white mt-4">{result}</p>}
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
