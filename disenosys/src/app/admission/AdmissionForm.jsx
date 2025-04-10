"use client"
import Link from "next/link";
import { useState } from "react";

const AdmissionForm = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", course: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [alert,setAlert] = useState(false);

  const handleSubmit = (e) => {
    setAlert(true);
    e.preventDefault();
    // alert("Form submitted!");
    // backend logic here
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-garet">
        {alert && ( 
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              <h1 className="text-lg font-semibold font-garet">
                This is not open yet. Please wait for the opening date.
              </h1>
              <Link href="/" className="text-blue-500 underline mt-2 block">
                Go back to Home page
                </Link>
            </div>
          </div>
        )}
      <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Admission Form</h2>
      <form onSubmit={handleSubmit} className="grid gap-6">
        {["name", "email", "phone", "dob"].map((field) => (
          <input
            key={field}
            type={field === "dob" ? "date" : "text"}
            name={field}
            placeholder={`Enter your ${field}`}
            value={form[field]}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-3 rounded focus:outline-blue-500"
          />
        ))}

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          required
          className="border border-gray-300 px-4 py-3 rounded"
        >
          <option value="">Select a course</option>
          <option value="mern">MERN Stack</option>
          <option value="python">Python & AI</option>
          <option value="ds">Data Science</option>
        </select>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded hover:opacity-90"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
