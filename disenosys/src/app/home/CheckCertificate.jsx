"use client";
import React, { useState } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";

const CheckCertificate = () => {
    const [udin, setUdin] = useState("");
    const [certificate, setCertificate] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleSubmit = async () => {
        try {
            const res = await axios.get(`https://disenosys-dkhj.onrender.com/udinget?udin=${udin}`);
            setCertificate(res.data.data); 
            setError(""); 
            setIsModalOpen(true); 
        } catch (err) {
            setCertificate(null);
            setError("No certificate found for this UDIN");
        }
    };

    return (
        <div className='lg:mx-auto container flex flex-col space-y-4 items-center justify-center font-garet relative'>
            <h1 className="text-2xl font-semibold">Certificate Verification</h1>
            <div className="border-2 border-gray-300 rounded-md shadow-md flex flex-col w-full lg:w-1/4 p-6 space-y-4">
                <input
                    type="text"
                    value={udin}
                    className="bg-blue-100 shadow-inner outline-none p-2 rounded-md text-gray-800"
                    placeholder="Enter Certificate Number"
                    onChange={(e) => setUdin(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-[#0d1039] text-white text-lg shadow-inner rounded-md p-1"
                >
                    Verify
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {isModalOpen && certificate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg lg:w-1/2 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-3 text-red-500 font-bold text-xl"
                        >
                           <MdCancel className="text-red-700"/>
                        </button>
                        <h2 className="text-xl font-semibold text-center mb-4">Certificate Details</h2>
                        <p><strong>UDIN:</strong> {certificate.Udin}</p>
                        <p><strong>Name:</strong> {certificate.name}</p>
                        <p><strong>Course Name:</strong> {certificate.course}</p>
                        {certificate.url ? (
    <iframe
        src={`${certificate.url}#toolbar=0`}
        width="100%"
        height="500px"
        className="border"
    ></iframe>
) : (
    <p className="text-red-500">PDF not available</p>
)}

                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckCertificate;
