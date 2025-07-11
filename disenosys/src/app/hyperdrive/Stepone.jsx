"use client";
import React from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from "react-multi-date-picker";

const Stepone = ({ nextStep, formData, setFormData }) => {
  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  //   const handlePhoneChange = (phone) => {
  //   setFormData({...formData, phone });
  // };

  const handlePhoneChange1 = (no1) => {
    setFormData({ ...formData, no1 });
  };

    const handlePhoneChange2 = (no2) => {
    setFormData({ ...formData, no2 });
  };

    const handlePhoneChange3 = (emg) => {
    setFormData({ ...formData, emg });
  };

  const handleDate = (dob) => {
    setFormData({...formData,dob})
  }
  return (
    <div>
      <div className="flex flex-col space-y-3 ">
        <h1 className="text-lg font-sans font-bold">Student Details:</h1>
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
            <span className="text-sm text-red-500">First Name*</span>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              className="w-full h-12 rounded-lg p-3 bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <span className="text-sm text-red-500">Last Name*</span>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
              className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <span className="text-sm text-red-500">Date Of Birth*</span>
            {/* <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="DOB"
              required
            /> */}
           <div className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              >
             <DatePicker
                    name="dob"
                    value={formData.dob}
                    selected={formData.dob}
                    onChange={handleDate}
                    dateFormat="MM/dd/yyyy"
                    placeholder="yyyy/MM/dd"
                    className="border-blue-400 border-2"
                    style={{color:'blue',background:'none', padding:"5px",border:"none"}}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                  </div>
          </div>

          <div>
            <span className="text-sm text-red-500">Gender*</span>
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              required
            >
              <option value="">Gender</option>
              {gender?.map((gender, index) => (
                <option
                  key={index}
                  value={gender.value}
                  aria-labelledby="dropdownHoverButton"
                  className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                >
                  {gender.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h1 className="text-lg font-sans font-bold">Address Details:</h1>
        <div>
          <span className="text-sm text-red-500">Permanent Address*</span>
          <input
            type="text"
            name="permanent"
            value={formData.permanent}
            onChange={(e) =>
              setFormData({ ...formData, permanent: e.target.value })
            }
            className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="Permanent Address"
            required
          />
        </div>
        <div>
          <span className="text-sm text-red-500">Communication Address*</span>
          <input
            type="text"
            name="communication"
            value={formData.communication}
            onChange={(e) =>
              setFormData({ ...formData, communication: e.target.value })
            }
            className="w-full h-12 bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="Communication Address"
            required
          />
        </div>
        <h1 className="text-lg font-sans font-bold">Contact Details:</h1>
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
            <span className="text-sm text-red-500">Personal Mobile 1*</span>
            {/* <input
              type="text"
              name="no1"
              value={formData.no1}
              onChange={(e) =>
                setFormData({ ...formData, no1: e.target.value })
              }
              className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="Personal Mobile No 1"
              required
            /> */}
             <PhoneInput
                        country={'in'}
                        name="no1"
                        value={formData.no1}
                        onChange={handlePhoneChange1}
                        placeholder="Enter your number"
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true,
                          className:"w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
             
                        }}
                      />
          </div>
          <div>
            <span className="text-sm text-red-500">Whatsapp Number*</span>
             <PhoneInput
                        country={'in'}
                        name="no2"
                        value={formData.no2}
                        onChange={handlePhoneChange2}
                        placeholder="Enter your number"
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true,
                          className:"w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
             
                        }}
                      />
          </div>
          <div>
            <span className="text-sm text-red-500">Emergency Contact No *</span>
          
             <PhoneInput
                        country={'in'}
                        name="emg"
                        value={formData.emg}
                        onChange={handlePhoneChange3}
                        placeholder="Enter your number"
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true,
                          className:"w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
             
                        }}
                      />
          </div>
          <div>
            <span className="text-sm text-red-500">Personal Mail ID *</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full  bg-blue-100 shadow-inner h-12 rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="Personal Mail ID"
              required
            />
          </div>
        </div>
      </div>
      <button
        onClick={nextStep}
        className="mt-4 flex justify-end items-end px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Stepone;
