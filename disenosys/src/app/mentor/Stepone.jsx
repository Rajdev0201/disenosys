"use client";

import React, { useState } from "react";
import MultiSelectDropdown from "./Multiple";
const StepOne = ({ formData, setFormData, nextStep }) => {
  const A1 = [
    "Front Bumper",
    "Rear Bumper",
    "Grille",
    "Hood/Bonnet",
    "Fender",
    "Roof",
    "Doors (Outer Panels and Structures)",
    "Side Panels",
    "Rear Panels",
    "Tailgate/Hatchback",
    "Side Mirrors",
    "Front Windshield",
    "Rear Windshield",
    "Side Glass",
    "Spoilers",
    "Rocker Panels",
    "Wheel Arch Claddings",
    "Mudguards",
  ];

  const A2 = [
    "Dashboard",
    "Center Console",
    "Instrument Panel",
    "A-Pillar Trims",
    "B-Pillar Trims",
    "C-Pillar Trims",
    "D-Pillar Trims",
    "Roof Headliner",
    "Sun Visors",
    "Glove Box",
    "Seats (Front, Rear, and Headrests)",
    "Door Trims (Inner Panels)",
    "Carpet/Floor Mats",
    "Gear Shifter and Boot",
    "Steering Wheel",
    "Armrests",
    "Cup Holders",
  ];

  const A3 = [
    "Headlights (Halogen, LED, Matrix, etc.)",
    "Tail Lights",
    "Fog Lights",
    "Daytime Running Lights (DRLs)",
    "Interior Ambient Lighting",
    "Turn Indicators",
    "Number Plate Lighting",
  ];

  const A4 = [
    "Front Suspension",
    "Rear Suspension",
    "Subframes",
    "Control Arms",
    "Steering Rack",
    "Tie Rods",
    "Stabilizer Bars",
    "Shock Absorbers",
    "Coil Springs",
    "Leaf Springs",
    "Wheels",
    "Tires",
    "Brake Rotors",
    "Brake Calipers",
    "Brake Pads",
    "Parking Brake Assembly",
  ];

  const A5 = [
    "Engine (IC Engines, Electric Motors)",
    "Transmission (Manual, Automatic, CVT, etc.)",
    "Driveshaft",
    "Axles (Front, Rear)",
    "Differential",
    "Exhaust System (Muffler, Catalytic Converter)",
    "Turbocharger/Supercharger",
    "Cooling System (Radiators, Fans)",
    "Fuel Tank and Lines",
  ];

  const A6 = [
    "Battery (Conventional, EV Batteries)",
    "Alternator",
    "Starter Motor",
    "Wiring Harness",
    "ECU (Engine Control Unit)",
    "ADAS Systems (Cameras, Sensors, Radars)",
    "Infotainment System",
    "Audio Systems (Speakers, Amplifiers)",
    "HVAC System (Heating, Ventilation, and Air Conditioning)",
    "Instrument Cluster",
    "Parking Assist Sensors",
    "Reverse Cameras",
    "Charging Ports (EV)",
    "Lighting Control Units",
  ];

  const A7 = [
    "Roof Rails",
    "Brackets and Reinforcements",
    "Cross Members",
    "A, B, C, and D Pillar Assemblies",
    "Side Impact Beams",
    "Crash Rails",
    "Door Hinges and Latches",
    "Floor Panels",
  ];

  const A8 = [
    "Door Handle (Outer and Inner)",
    "Window Seals",
    "Gaskets",
    "Sunroof Trim",
    "Wheel Covers",
    "Underbody Shields",
  ];

  const A9 = [
    "Heater Core",
    "Air Ducts",
    "Condenser",
    "Evaporator",
    "Air Filters",
  ];

  const A10 = [
    "Airbags (Driver, Passenger, Side, Curtain)",
    "Seat Belts",
    "Crumple Zones",
    "Anti-lock Braking System (ABS)",
    "Electronic Stability Program (ESP)",
  ];

  const A11 = [
    "Battery Management System (BMS)",
    "Electric Drive Motors",
    "Power Electronics (Inverter, Converter)",
    "Charging Systems (On-Board Charger, External Chargers)",
    "High Voltage Cables",
  ];

  const exp = [
    { label: "Fresher", value: 0 },
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
    { label: "4 Years", value: 4 },
    { label: "5 Years", value: 5 },
    { label: "6 Years", value: 6 },
    { label: "7 Years", value: 7 },
    { label: "8 Years", value: 8 },
    { label: "9 Years", value: 9 },
    { label: "10 Years", value: 10 },
    { label: "11 Years", value: 11 },
    { label: "12 Years", value: 12 },
    { label: "13 Years", value: 13 },
    { label: "14 Years", value: 14 },
    { label: "15 Years", value: 15 },
    { label: "16 Years", value: 16 },
    { label: "17 Years", value: 17 },
    { label: "18 Years", value: 18 },
    { label: "19 Years", value: 19 },
    { label: "20 Years", value: 20 },
    { label: "21 Years", value: 21 },
    { label: "22 Years", value: 22 },
    { label: "23 Years", value: 23 },
    { label: "24 Years", value: 24 },
    { label: "25 Years", value: 25 },
    { label: "26 Years", value: 26 },
    { label: "27 Years", value: 27 },
    { label: "28 Years", value: 28 },
    { label: "29 Years", value: 29 },
    { label: "30 Years", value: 30 },
  ];
   
  const [selectedA1, setSelectedA1] = useState([]);
  const [selectedA2, setSelectedA2] = useState([]);
  const [selectedA3, setSelectedA3] = useState([]);
  const [selectedA4, setSelectedA4] = useState([]);
  const [selectedA5, setSelectedA5] = useState([]);
  const [selectedA6, setSelectedA6] = useState([]);
  const [selectedA7, setSelectedA7] = useState([]);
  const [selectedA8, setSelectedA8] = useState([]);
  const [selectedA9, setSelectedA9] = useState([]);
  const [selectedA10, setSelectedA10] = useState([]);
  const [selectedA11, setSelectedA11] = useState([]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#182073] font-poppins">
        Section 1: Mentor Details
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          value={formData.name}
          placeholder="Enter your name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="number"
          value={formData.phone}
          placeholder="Enter your phone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Linkedin Profile
        </label>
        <input
          type="text"
          value={formData.link}
          placeholder="Enter your Linkedin profile link"
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>
      
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Experience in Years
                </label>
                <select
                  name="experience"
                  value={formData.exp}
                  onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                  className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="">Total Experience</option>
                  {exp?.map((experience, index) => (
                    <option
                      key={index}
                      value={experience.value}
                      aria-labelledby="dropdownHoverButton"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      {experience.label}
                    </option>
                  ))}
                </select>
              </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Brief Introduction/Bio
        </label>
        <textarea
          type="text"
          value={formData.exp}
          placeholder="Brief Introduction about yourself"
          onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>
      <label className="block text-sm font-medium mb-2">
        Select the skills in which you are an expert
      </label>
      <div className="p-4 grid grid-cols-2 gap-3">
        <MultiSelectDropdown
          options={A1}
          label="Exterior Components"
          selectedOptions={selectedA1}
          setSelectedOptions={(newSelectedOptions) => {
            setSelectedA1(newSelectedOptions);
            setFormData((prev) => ({ ...prev, a1: newSelectedOptions }));
          }}
        />
        <MultiSelectDropdown
          options={A2}
          label="Interior Components"
          selectedOptions={selectedA2}
          setSelectedOptions={setSelectedA2}
        />

        <MultiSelectDropdown
          options={A3}
          label="Lighting Systems"
          selectedOptions={selectedA3}
          setSelectedOptions={setSelectedA3}
        />

     <MultiSelectDropdown
          options={A4}
          label="Chassis and Suspension"
          selectedOptions={selectedA4}
          setSelectedOptions={setSelectedA4}
        />


<MultiSelectDropdown
          options={A5}
          label="Powertrain Components"
          selectedOptions={selectedA5}
          setSelectedOptions={setSelectedA5}
        />

<MultiSelectDropdown
          options={A6}
          label="Electrical and Electronics:"
          selectedOptions={selectedA6}
          setSelectedOptions={setSelectedA6}
        />

<MultiSelectDropdown
          options={A7}
          label="Body-in-White (BIW):"
          selectedOptions={selectedA7}
          setSelectedOptions={setSelectedA7}
        />

<MultiSelectDropdown
          options={A8}
          label="Plastics and Trims:"
          selectedOptions={selectedA8}
          setSelectedOptions={setSelectedA8}
        />

<MultiSelectDropdown
          options={A9}
          label="HVAC and Thermal Systems"
          selectedOptions={selectedA9}
          setSelectedOptions={setSelectedA9}
        />


<MultiSelectDropdown
          options={A10}
          label="Safety Systems:"
          selectedOptions={selectedA10}
          setSelectedOptions={setSelectedA10}
        />


<MultiSelectDropdown
          options={A11}
          label="Electric Vehicle (EV) Specific"
          selectedOptions={selectedA11}
          setSelectedOptions={setSelectedA11}
        />
      </div>
      
    <div className="grid grid-cols-2 gap-3">
      <div className="py-0">
          {selectedA1.length !== 0 ? <h3 className="text-sm text-gray-500">
            Selected Exterior Components:
          </h3> : "" }
          <div className="grid grid-cols-2 gap-2 py-2">
            {selectedA1.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-0">
          {selectedA2.length !== 0 ? <h3 className="text-sm text-gray-500">
            Selected Interior Components:
          </h3> : "" }
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA2.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
         
        <div className="py-0">
          {selectedA3.length !== 0 ? <h3 className="text-sm text-gray-500">
            Selected Lighting Systems:
          </h3> : "" }
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA3.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      
        <div className="py-0">
            {selectedA4.length !== 0 ? <h3 className="text-sm text-gray-500">
            Selected Chassis and Suspension Components:
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA4.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-0">
            {selectedA5.length !== 0 ? <h3 className="text-sm text-gray-500">
                Powertrain Components:
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA5.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-0">
            {selectedA6.length !== 0 ? <h3 className="text-sm text-gray-500">
                Electrical and Electronics:
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA6.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
   
        <div className="py-0">
            {selectedA7.length !== 0 ? <h3 className="text-sm text-gray-500">
                Body-in-White (BIW):
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA7.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-0">
            {selectedA8.length !== 0 ? <h3 className="text-sm text-gray-500">
                Plastics and Trims:
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA8.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-0">
            {selectedA9.length !== 0 ? <h3 className="text-sm text-gray-500">
                HVAC and Thermal Systems:
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA9.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
       

        <div className="py-0">
            {selectedA10.length !== 0 ? <h3 className="text-sm text-gray-500">
                Safety Systems:
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA10.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
    

        <div className="py-0">
            {selectedA11.length !== 0 ? <h3 className="text-sm text-gray-500">
                Electric Vehicle (EV) Specific Components:
          </h3> : "" }
         
          <div className="grid grid-cols-2 gap-1 py-2">
            {selectedA11.map((item, index) => (
              <div key={index} className="flex items-center justify-start">
                <span className="bg-gray-200 text-blue-400 text-sm font-semibold rounded-xl shadow-inner px-2 py-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      <button
        onClick={nextStep}
        className="-mt-0  px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default StepOne;
