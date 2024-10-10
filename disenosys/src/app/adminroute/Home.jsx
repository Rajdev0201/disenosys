"use client";
import { useState } from 'react';

const AdminPanel = () => {
    const [college, setCollege] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    const handleGenerateCode = async () => {
        const res = await fetch('http://localhost:8000/api/admin/generate-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ college, userType: 'college' }),
        });
        const data = await res.json();
        setGeneratedCode(data.code.code);
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='px-6 py-6 bg-white shadow-lg rounded-sm max-w-md w-full'>
                <h4 className='text-[#182073] font-medium text-xl font-poppins text-center'>Admin Panel - Generate Code</h4>
                <div className="flex flex-col space-y-4 mt-4">
                    <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="Enter College Name"
                        className="p-2 border border-gray-100 rounded focus:border-[#182073]"
                    />
                    <button
                        onClick={handleGenerateCode}
                        className="bg-[#182073] text-white px-4 py-2 rounded"
                    >
                        Generate Code
                    </button>

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

export default AdminPanel;
