"use client"
import React from "react";

const RecentCard = () => {
    const data  = [
        {
            text: "First Text",
            key: "applied"
        },
        {
            text: "Second Text",
            key: "applied"
        },
        {
            text: "Third Text",
            key: "applied"
        }
    ];

    return (
        <div className="bg-white shadow-md rounded-md p-4 h-48">
            <h4 className="text-lg font-semibold text-[#182073] font-poppins">Recent History</h4>
            <div className="flex flex-col">
                {data.map((item, i) => (
                    <div className="flex items-center justify-between mt-5" key={i}>
                        <h4 className="text-gray-400">{item?.text}</h4>
                        <h5 className="text-gray-600">{item.key}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentCard;
