"use client"

import { useState } from "react";


const Settings = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="flex font-garet">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Settings</h2>

        <div className="mt-6 bg-white p-6 rounded-md shadow-inner">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <button type="submit" className="bg-[#182073] text-white px-4 py-2 rounded-md">
              Update Profile
            </button>
          </form>
        </div>

        <div className="mt-6 bg-white p-6 rounded-md shadow-inner">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <button type="submit" className="bg-[#182073] text-white px-4 py-2 rounded-md">
              Change Password
            </button>
          </form>
        </div>


        {/* <div className="mt-6 bg-white p-6 rounded-md shadow-lg">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <label className="flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span className="text-gray-700">Enable Email Notifications</span>
          </label>
        </div> */}

        <div className="mt-6 bg-white p-6 rounded-md shadow-inner border border-red-500">
          <h3 className="text-lg font-semibold text-red-500">Delete Account</h3>
          <p className="text-sm text-gray-600 mt-2">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

