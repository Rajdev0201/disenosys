"use client";
import React, { useState } from "react";

const Steptow = ({ nextStep, prevStep, formData, setFormData }) => {
  const [errors, setErrors] = useState({
    pannoError: "",
    aadharnoError: "",
  });

  const handlePanChange = (e) => {
    const value = e.target.value;
    if (value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        pannoError: "PAN Number cannot be more than 10 characters.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        pannoError: "",
      }));
    }

    setFormData({ ...formData, panno: value });
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    if (value.length > 12) {
      setErrors((prev) => ({
        ...prev,
        aadharnoError: "Aadhar Number cannot be more than 12 digits.",
      }));
    } else if (value.length === 12 && !/^\d+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        aadharnoError: "Aadhar Number must be numeric.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        aadharnoError: "",
      }));
    }

    setFormData({ ...formData, aadharno: value });
  };

  return (
    <div>
      <div className="flex flex-col space-y-3 ">
        <h1 className="text-lg font-sans font-bold">Personal Details:</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div>
            <span className="text-sm text-red-500">PAN No *</span>
            <input
              type="text"
              name="panno"
              value={formData.panno}
              onChange={handlePanChange}
              className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder='PAN No'
              required
            />
            {errors.pannoError && (
              <p className="text-red-500 text-sm">{errors.pannoError}</p>
            )}
          </div>
          <div>
            <span className="text-sm text-red-500">Aadhar No *</span>
            <input
              type="text"
              name="aadharno"
              value={formData.aadharno}
              onChange={handleAadharChange}
              className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder='Aadhar No'
              required
            />
            {errors.aadharnoError && (
              <p className="text-red-500 text-sm">{errors.aadharnoError}</p>
            )}
          </div>
          <div>
            <span className="text-sm text-red-500">Blood Group*</span>
            <select
              name="blood"
              value={formData.blood}
              onChange={(e) =>
                setFormData({ ...formData, blood: e.target.value })
              }
              className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
          <span className='text-sm text-red-500'>Father Name *</span>
            <input
              type="text"
              name="father"
              value={formData.father}
              onChange={(e) =>
                setFormData({ ...formData, father: e.target.value })
              }
              className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="Father Name"
              required
            />
          </div>

          <div>
          <span className='text-sm text-red-500'>Mother Name *</span>
            <input
              type="text"
              name="mother"
              value={formData.mother}
              onChange={(e) =>
                setFormData({ ...formData, mother: e.target.value })
              }
              className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="Mother Name"
              required
            />
          </div>
          <div>
  <span className="text-sm text-red-500">Marital Status*</span>
  <select
    name="marital"
    value={formData.marital}
    onChange={(e) =>
      setFormData({ ...formData, marital: e.target.value })
    }
    className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
    required
  >
    <option value="">Select Marital Status</option>
    {["Single", "Married"].map((status, index) => (
      <option key={index} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>

 
        </div>
        <h1 className="text-lg font-sans font-bold">Nominee Details:</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
          <span className='text-sm text-red-500'>Nominee Name *</span>
            <input
              type="text"
              name="n1"
              value={formData.n1}
              onChange={(e) => setFormData({ ...formData, n1: e.target.value })}
              className="w-full h-12 rounded-lg  bg-blue-100 shadow-inner p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="Nominee Name"
              required
            />
          </div>
          <div className="lg:-mt-0">
            <span className="text-sm text-red-500">Nominee Date Of Birth*</span>
            <input
              type="date"
              name="ndob"
              value={formData.ndob}
              onChange={(e) =>
                setFormData({ ...formData, ndob: e.target.value })
              }
              className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
              placeholder="Nominee DOB"
              required
            />
          </div>
          <div>
          <span className="text-sm text-red-500">Nominee Relationship *</span>
          <input
            type="text"
            name="nrealtion"
            value={formData.nrealtion}
            onChange={(e) =>
              setFormData({ ...formData, nrealtion: e.target.value })
            }
            className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="Nominee Relationship"
            required
          />
          </div>
          <div>
          <span className="text-sm text-red-500">Nominee Address *</span>
          <input
            type="email"
            name="naddress"
            value={formData.naddress}
            onChange={(e) =>
              setFormData({ ...formData, naddress: e.target.value })
            }
            className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="Nominee Address"
            required
          />
          </div>
        </div>

        <h1 className="text-lg font-sans font-bold">
          Personal Bank Account Details:
        </h1>
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
          <span className="text-sm text-red-500">Bank Name *</span>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
            className="w-full h-12 rounded-lg  bg-blue-100 shadow-inner p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="Bank Name"
            required
          />
          </div>

          <div>
          <span className="text-sm text-red-500">Branch *</span>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={(e) =>
              setFormData({ ...formData, branch: e.target.value })
            }
            className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="Branch"
            required
          />
          </div>

          <div>
          <span className="text-sm text-red-500">A/c No *</span>
          <input
            type="text"
            name="Ac"
            value={formData.Ac}
            onChange={(e) => setFormData({ ...formData, Ac: e.target.value })}
            className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="A/c No"
            required
          />
          </div>

          <div>
          <span className="text-sm text-red-500">IFSC Code *</span>
          <input
            type="text"
            name="IFSC"
            value={formData.IFSC}
            onChange={(e) => setFormData({ ...formData, IFSC: e.target.value })}
            className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
            placeholder="IFSC Code"
            required
          />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevStep}
          className=" px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className=" px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Steptow;
