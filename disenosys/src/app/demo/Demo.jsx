"use client"
// import React, { useState } from 'react';
// import axios from 'axios';

// const ResumeParser = () => {
//   const [parsedData, setParsedData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       // Send the file to the backend as multipart/form-data
//       const response = await axios.post('http://localhost:8000/parse-resume', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setParsedData(response.data);  // Set parsed data received from the backend
//     } catch (error) {
//       console.error('Error uploading and parsing file:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="resume-parser">
//       <h2>Resume Parser</h2>
//       <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileUpload} />
//       {isLoading && <p>Parsing resume...</p>}
//       {parsedData && (
//         <div>
//           <h3>Parsed Data:</h3>
//           <pre>{JSON.stringify(parsedData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeParser;

import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack"; 

const ResumeParser = () => {
    const [resumeData, setResumeData] = useState(null);
    const [error, setError] = useState(null);
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileType = file.type;

        if (fileType === "application/pdf") {
            parsePdf(file);
        } else {
            setError("Unsupported file type. Please upload a PDF file.");
        }
    };

    const parsePdf = async (file) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const typedArray = new Uint8Array(reader.result);
            try {
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                let extractedText = "";

                // Extract text from all pages
                for (let i = 0; i < pdf.numPages; i++) {
                    const page = await pdf.getPage(i + 1);
                    const textContent = await page.getTextContent();
                    extractedText += textContent.items
                        .map((item) => item.str)
                        .join(" ");
                }

                extractDetails(extractedText);
            } catch (err) {
                console.error("Error parsing PDF:", err);
                setError("Failed to parse PDF file.");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const extractDetails = (text) => {
        const name = text.match(/(?:Name|Full Name)[\s:]*([^\n]+)/i)?.[1]?.trim() || "N/A";
        console.log(name)
        const email =
            text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] ||
            "N/A";
        const phone =
            text.match(
                /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
            )?.[0] || "N/A";

        setResumeData({
            name,
            email,
            phone,
        });
    };

    return (
        <div>
            <h1>Resume Parser</h1>
            <input type="file" accept=".pdf" onChange={handleFileUpload} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {resumeData && (
                <div>
                    <h2>Parsed Data:</h2>
                    <pre>{JSON.stringify(resumeData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ResumeParser;




