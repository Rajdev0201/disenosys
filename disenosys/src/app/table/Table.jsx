"use client"
import React from "react";

const ComparisonChart = () => {
  return (
    <div className="container mx-auto p-4 mt-36">
         <h2 className="text-3xl font-medium mb-4 font-garet">Comparison Chart</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Certification Programs (Live)</th>
              <th className="p-3 border">Pre-Recorded Training</th>
              <th className="p-3 border">PG Diploma (Body in White-BIW)</th>
              <th className="p-3 border">PG Diploma (Plastic Trims)</th>
              <th className="p-3 border">Masters</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["No. of Job Referrals", "-", "None", "5", "5", "Unlimited"],
              ["Validity", "-", "Unlimited", "One Year", "One Year", "Lifetime"],
              ["Onsite Opportunities", "-", "No", "No", "No", "Yes"],
              ["Program Duration","-", "Varies",  "4 Months", "4 Months", "8 Months"],
              ["No. of Industry Projects", "-", "None", "15", "15", "31"],
              ["Internship Certificate", "-","None",  "3 Months", "3 Months", "6 Months"],
              ["LMS Access", "-", "Lifetime", "6 Months", "6 Months", "Lifetime"],
              ["No. of Certifications",  "-", "None", "6", "6", "10"],
              ["Program Fee", "INR 27,000 - INR 36,000", "INR 15,000 - INR 30,000", "INR 1,40,000", "INR 1,40,000", "INR 2,40,000"],
            ].map((row, index) => (
              <tr key={index} className="border">
                {row.map((cell, i) => (
                  <td key={i} className="p-3 border text-center font-garet bg-blue-50">{cell}</td>
                ))}
              </tr>
            ))}
            {[
              "DSST01 - CATIA V5 Designer",
              "DSST02 - Advanced CATIA Surfacing",
              "DSPT04 - CATIA V5 Surface Remastering",
              "DSPT01 - Fundamentals of Plastic Trims",
              "DSPT02 - Closed Volume & Engr Features",
              "DSBW01 - Fundamentals of BIW",
              "DSBW02 - BIW Brackets & Reinforcements",
              "DSPT03 - CATIA V5 Solid Remastering",
              "DSCD01 - Concept Design & Mastersections",
            ].map((course, index) => (
              <tr key={index} className="border">
                <td className="p-3 border text-start bg-blue-50 font-garet">{course}</td>
                {["INR 36,000", "❌", "✅", "✅", "✅"].map((cell, i) => (
                  <td
                    key={i}
                    className={`p-3 border text-center ${
                      cell === "✅" ? "text-green-500" : cell === "❌" ? "text-red-500" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonChart;
