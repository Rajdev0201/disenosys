"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice";
import axios from "axios";



const Settings = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.user?.userName || user?.user?.name || user?.user?.userName ,
    email: user?.user?.user?.userEmail || user?.user?.email || user?.user?.userEmail ,
    mobile:"",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });

 const token = user?.user?.token

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
  
    if (!token) {
      alert("User is not logged in. Please login again.");
      return;
    }
  
    try {
      const response = await axios.put(
        "https://disenosys-dkhj.onrender.com/api/v1/update-profile",
        { email: formData.email,mobile }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      localStorage.setItem("profile", JSON.stringify({ ...user, user: response.data.data }));
      console.log("API Response:", response.data); // Debugging

      if (response.data.success && response.data.user) { 
        const updatedUser = response.data.user;
  
        localStorage.setItem("profile", JSON.stringify(updatedUser));
        dispatch(setUser(updatedUser));
  
        alert("Profile updated successfully!");
    }
    } catch (error) {
      console.error("Error updating profile:", error);
  
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred while updating profile.");
      }
    }
  };
 
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (formData.oldPassword === formData.newPassword) {
      alert("New password cannot be the same as the old password!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await axios.put(
        "https://disenosys-dkhj.onrender.com/api/v1/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error changing password", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch("https://disenosys-dkhj.onrender.com/api/v1/delete-account", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          alert("Account deleted successfully!");
          localStorage.removeItem("profile");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error deleting account", error);
      }
    }
  };
  
  

  return (
    <div className="flex font-garet">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Settings</h2>

        <div className="mt-6 bg-white p-6 rounded-md shadow-inner">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <form onSubmit={handleProfileUpdate} className="mt-4 space-y-4">
          <div>
  <label className="block text-sm font-medium text-gray-700">Full Name</label>
  <input
    type="text"
    name="name"
    value={user?.user?.user?.userName || user?.user?.name || user?.user?.userName || ""}
    placeholder="Full Name"
    readOnly
    className="mt-1 p-2 w-full border rounded-md bg-gray-100 cursor-not-allowed"
  />
</div>


            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
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
          <form className="mt-4 space-y-4" onSubmit={handleChangePassword}>
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
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

