"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    title: "",
    description: "",
    file: null,
  });
 const [load,setLoad] = useState(false);
 const router = useRouter();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();

    if (!formData.name || !formData.designation || !formData.title || !formData.description || !formData.file) {
      alert("All fields are required. Please fill in all fields.");
      setLoad(false); 
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("designation", formData.designation);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("file", formData.file);

    try {
        await axios.post("https://disenosys-dkhj.onrender.com/blog", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        alert("Blog created successfully!");
        router.push("/createblog")
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred. Please try again later.");
    }
    setLoad(false)
    setFormData({
        name: "",
        designation: "",
        title: "",
        description: "",
        file: null,
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Blog</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author Name
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-md border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500 sm:text-sm"
                placeholder="Enter author name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-md border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500 sm:text-sm"
                placeholder="Enter designation"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-md border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500  sm:text-sm"
              placeholder="Enter blog title"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Description
            </label>
            <textarea
              name="description"
              rows="6"
              className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-md border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500 sm:text-sm"
              placeholder="Write your blog here..."
              onChange={handleChange}
            ></textarea>
            <p className="text-sm text-gray-500 mt-2">
  To include hyperlinks in the description, use the format:
  <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">
    &lt;a href=&quot;your-url&quot; target=&quot;_blank&quot;
    class=&quot;text-blue-500&quot;&gt;Your Link Text&lt;/a&gt;
  </code>
  . Example:{" "}
              <a
                href="https://www.disenosys.com/"
                className="text-blue-500 underline"
                target="_blank"
              >
                Visit Example
              </a>
              .
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banner Image
            </label>
            <input
              type="file"
              name="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200"
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full text-lg font-semibold bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {load ? "Loading..." : "Create Blog" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
