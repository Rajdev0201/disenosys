"use client";
import { useState } from "react";

const AdminPanel = () => {
  const [college, setCollege] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateCode = async () => {
    setMessage("");
    setGeneratedCode("");

    if (!college) {
      alert("Please enter college name or college code");
    }
    if (!city) {
      alert("Please enter college city");
    }

    if (!country) {
        alert("Please enter college country");
      }
  

    const res = await fetch(
      "https://disenosys-dkhj.onrender.com/api/admin/generate-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ college, city, country, userType: "college" }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setGeneratedCode(data.code.code);
      setMessage(data.message);
    } else {
      setMessage(data.error || "Failed to generate code");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-12">
      <div className="px-6 py-6 bg-white shadow-lg rounded-sm max-w-md w-full">
        <h4 className="text-[#182073] font-medium text-xl font-poppins text-center">
          Admin Panel - Generate Code
        </h4>
        <div className="flex flex-col space-y-4 mt-4">
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="Enter College Full name"
            className="p-2 border border-gray-100 rounded focus:border-[#182073]"
            required
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter College City"
            className="p-2 border border-gray-100 rounded focus:border-[#182073]"
            required
          />

          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter College Country"
            className="p-2 border border-gray-100 rounded focus:border-[#182073]"
            required
          />

          <button
            onClick={handleGenerateCode}
            className="bg-[#182073] text-white px-4 py-2 rounded"
          >
            Generate Code
          </button>

          {message && (
            <div className="p-4 bg-blue-100 rounded text-blue-700">
              <p>{message}</p>
            </div>
          )}

          {generatedCode && (
            <div className="p-4 bg-green-100 rounded text-green-700">
              <p>
                Generated Code: <strong>{generatedCode}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default AdminPanel;
