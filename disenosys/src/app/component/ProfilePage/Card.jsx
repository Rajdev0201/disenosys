import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { CiEdit } from 'react-icons/ci';
import EditProfileModal from './EditProfileModal'; 
import { setUser } from '@/app/Redux/features/authSlice.js';
import { getProfile } from "@/app/Redux/action/editProfile.js";
import { useDispatch, useSelector } from 'react-redux';

const Card = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  
  const userid = user?.user?._id;
  const profile = useSelector((state) => state.currentProfile); 

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userid) {
      dispatch(getProfile(userid));
    } else {
      console.error('User ID is undefined');
    }
  }, [dispatch, userid]);

  const profileName = profile?.name; 
  const profileTitle = profile?.title;

  return (
    <div>
      <div className="relative rounded-xl overflow-hidden flex flex-col items-center shadow-sm bg-white font-Roboto-light">
        <div className="h-32 w-full bg-[#182073]"></div>
        <div className="top-16 z-10 flex items-center flex-col gap-4 px-5 py-5">
          {profile ?
          <>
          <div className="-mt-20">
            <CgProfile size={90} className='text-blue-300' />
          </div>

          <div className="flex items-center flex-col">
            <p className="text-black font-Roboto-md">{profileName}</p>
            <p className="text-xs text-gray-500 font-medium">{profileTitle}</p>
          </div>
          </> 
          :
          <>
             <div className="-mt-20">
            <CgProfile size={90} className='text-blue-300' />
          </div>

          <div className="flex items-center flex-col">
            <p className="text-black font-Roboto-md">{user?.user?.userName}</p>
            <p className="text-xs text-gray-500 font-medium">NA</p>
          </div>
          </>
         }
          <div className="flex items-center gap-3">
            {user ? 
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#182073] transition-all gradient text-[15px] text-white px-3 py-[6px] rounded-sm flex items-center gap-1"
            >
              Edit Profile
              <CiEdit size={25} />
            </button>
            :
            <>
            <p className='text-gray-400 text-base'>Please sign in your account</p>
            </>
            }
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        valueName = {profileName}
        valueTitle = {profileTitle}
        userId={userid}
      />
    </div>
  );
}

export default Card;
