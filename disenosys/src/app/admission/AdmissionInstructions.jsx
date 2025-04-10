const AdmissionInstructions = () => {
    return (
      <div className="max-w-5xl mx-auto py-12 px-6 font-garet">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">How to Apply</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our admission process is simple and student-friendly. Fill out the form with accurate details, select your desired course, and submit. You’ll receive a confirmation and our team will reach out shortly.
        </p>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Fill out the personal and academic information.</li>
          <li>Select the course you are interested in.</li>
          <li>Upload documents (if applicable).</li>
          <li>Wait for our team to contact you with next steps.</li>
        </ul>
      </div>
    );
  };
  
  export default AdmissionInstructions;
  