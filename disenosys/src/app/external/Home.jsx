"use client";
import { useState } from 'react';

const ExternalCodeGenerator = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    const handleGenerateExternalCode = async () => {
        if (!month || !year) {
            alert("Please select both month and year.");
            return;
        }
    
        const res = await fetch('https://disenosys-1.onrender.com/api/admin/generate-external-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ month: parseInt(month), year: parseInt(year), userType: 'external' }), // Include userType here
        });
        const data = await res.json();
    
        if (data.code) {
            setGeneratedCode(data.code.code);
        } else {
            alert('Error generating code');
        }
    };
    
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='px-6 py-6 bg-white shadow-lg rounded-sm max-w-md w-full'>
                <h4 className='text-[#182073] font-medium text-xl font-poppins text-center'>
                    External User - Generate Code
                </h4>
                <div className="flex flex-col space-y-4 mt-4">
                    {/* Dropdown for Month */}
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="p-2 border border-gray-100 rounded focus:border-[#182073]"
                    >
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    {/* Dropdown for Year */}
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="p-2 border border-gray-100 rounded focus:border-[#182073]"
                    >
                        <option value="">Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>

                    {/* Generate Code Button */}
                    <button
                        onClick={handleGenerateExternalCode}
                        className="bg-[#182073] text-white px-4 py-2 rounded"
                    >
                        Generate Code
                    </button>

                    {/* Display Generated Code */}
                    {generatedCode && (
                        <div className="p-4 bg-green-100 rounded text-green-700">
                            <p>Generated Code: <strong>{generatedCode}</strong></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExternalCodeGenerator;
