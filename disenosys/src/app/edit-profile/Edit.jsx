"use client"
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/features/authSlice";
import avatar from "../assests/profile/testi.jpg"
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditProfile = () => {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "999999999",
        location: "India",
        about:"",
      });
      
      useEffect(() => {
        if (user?.user) {
          setFormData({
            name: user?.user?.user?.userName || user?.user?.name  || "",
            email: user?.user?.user?.userEmail || user?.user?.email || "",
            mobile: "999999999",
            location: "India",
          });
        }
      }, [user]); 


  useEffect(() => {
      const storedUser = localStorage.getItem("profile");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }, [dispatch]);

    const token = user?.user?.token

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfileImage(imageUrl);
  //   }
  // };

  const handleProfileUpdate = async (e) => {
      e.preventDefault();
    
      if (!token) {
        alert("User is not logged in. Please login again.");
        return;
      }
    
      try {
        const response = await axios.put(
          "https://disenosys-dkhj.onrender.com/api/v1/update-profile",
          { email: formData.email,mobile:formData.mobile,location:formData.location }, 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        localStorage.setItem("profile", JSON.stringify({ ...user, user: response.data.data }));
  
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


    const handleCancel = () => {
        router.push("/");
    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FAFBFF] p-4 font-garet">
      <div className=" grid lg:grid-cols-2 gap-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl h-full relative">
        <button className="absolute top-4 right-4 text-white hover:text-gray-800 bg-red-500 rounded-full shadow-2xl p-2 transition" onClick={handleCancel}>
          <IoClose size={20} />
        </button>
       <form onSubmit={handleProfileUpdate}>
        <div className="flex items-center space-x-6 ">
          <div className="relative">
            <label htmlFor="profilePic" className="cursor-pointer">
              <Image
                src={avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
              {/* <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
                <FiEdit2 size={14} className="text-gray-600" />
              </div> */}
            </label>
            {/* <input
              type="file"
              id="profilePic"
              className="hidden"
              onChange={handleImageChange}
            /> */}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">{formData.name}</h2>
            <p className="text-gray-500">{formData.email}</p>
          </div>
        </div>
       
        <div className="mt-16 space-y-10">
            <div className="flex justify-between items-center border-b pb-2 p-2">
              <label className="text-gray-500 capitalize">Name</label>
              <input
                type="text"
                value={user?.user?.user?.userName || user?.user?.name || user?.user?.userName }
                readOnly
                className="text-white font-garet text-left outline-none w-1/2 bg-blue-500 rounded-lg shadow-lg p-2"
              />
            </div>

          {["email", "mobile", "location","about"].map((field, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2 p-2">
              <label className="text-gray-500 capitalize">{field.replace("_", " ")}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="text-white font-garet text-left outline-none w-1/2 bg-blue-500 rounded-lg shadow-lg p-2"
              />
            </div>
          ))}
        </div>


        <button className="mt-6 w-44 bg-blue-600 hover:bg-blue-700 text-white font-medium  py-2 rounded-lg transition" type="submit">
          Save Change
        </button>
        </form>
      </div>


       <div className="bg-black p-6 rounded-xl shadow-lg w-full max-w-xl h-full relative">
           <div className="flex items-center justify-center flex-col border-b border-gray-300">
            <Image src ={avatar} alt="Profile" className="w-28 h-28 rounded-xl ull object-cover border-2 border-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">{formData.name.toUpperCase()}</h2>
           </div>

           <div className="flex flex-col space-y-4 mt-12 px-12">
         <p className="text-gray-400">Email: <span className="text-white">{formData.email}</span></p>
         <p className="text-gray-400">Mobile: <span className="text-white">{formData.mobile}</span></p>
         <p className="text-gray-400">Location: <span className="text-white">{formData.location}</span></p>
         <p className="text-gray-400">About: <span className="text-white">{formData.about || "waiting to fill it"}.</span></p>
           </div>
           <div className="lg:absolute bottom-0 left-0 right-0 bg-blue-500 w-full text-white p-6 rounded-t-lg  font-semibold text-center text-lg">Disenosys</div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
