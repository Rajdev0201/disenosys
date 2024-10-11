"use client";
import { useState } from 'react';

const ExternalCodeGenerator = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [message, setMessage] = useState('');


    const handleGenerateExternalCode = async () => {
        setMessage(''); 
        setGeneratedCode('');



        if (!month || !year) {
            alert("Please select both month and year.");
            return;
        }
    
        const res = await fetch('https://disenosys-1.onrender.com/api/admin/generate-external-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                month: parseInt(month) - 1, // Adjust for zero-based month index
                year: parseInt(year), 
            }),
        });
    
        const data = await res.json();
    
        if (data.code) {
            setGeneratedCode(data.code.code);
            setMessage(data.message);
        } else {
            setMessage(data.error || 'Failed to generate code');
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
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index} value={index + 1}>{new Date(0, index).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </select>

                    {/* Dropdown for Year */}
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="p-2 border border-gray-100 rounded focus:border-[#182073]"
                    >
                        <option value="">Select Year</option>
                        {Array.from({ length: 5 }, (_, index) => (
                            <option key={index} value={2024 + index}>{2024 + index}</option>
                        ))}
                    </select>

                    {/* Generate Code Button */}
                    <button
                        onClick={handleGenerateExternalCode}
                        className="bg-[#182073] text-white px-4 py-2 rounded"
                    >
                        Generate Code
                    </button>

                    {message && (
                        <div className="p-4 bg-blue-100 rounded text-blue-700">
                            <p>{message}</p>
                        </div>
                    )}

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
