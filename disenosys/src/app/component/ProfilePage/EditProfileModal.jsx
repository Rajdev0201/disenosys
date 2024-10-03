// EditProfileModal.js
import React, { useState } from 'react';
import { editProfile } from '../../Redux/action/editProfile.js';
import { useDispatch } from 'react-redux';
const EditProfileModal = ({ isOpen, onClose,userId,valueName,valueTitle}) => {


    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [name,setName] = useState("")
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("title", title);
    dispatch(editProfile(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-[#182073]">Edit Profile</h2>
        <form onSubmit={handleSubmit}>

        <div className="mb-4">
            <label className="block mb-1">Upload Photo</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-gray-300 rounded p-2 w-full"
          
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder={valueName}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
   
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder={valueTitle}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
           
            />
          </div>
          <button type="submit" className="bg-[#182073] text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onClose} className="ml-2 text-gray-500">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
