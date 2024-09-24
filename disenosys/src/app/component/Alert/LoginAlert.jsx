import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const LoginAlert = () => {
  const [showAlert, setShowAlert] = useState(true); 

  return (
    <div className="fixed inset-x-0 bottom-5 flex justify-end z-50">
      <Transition
        show={showAlert}
        enter="transform transition duration-300 ease-out"
        enterFrom="scale-75 opacity-0 translate-y-5"
        enterTo="scale-100 opacity-100 translate-y-0"
        leave="transform transition duration-300 ease-in"
        leaveFrom="scale-100 opacity-100 translate-y-0"
        leaveTo="scale-75 opacity-0 translate-y-5"
      >
        <div className="flex items-center justify-between w-[400px] bg-[#182073] p-4 text-white font-poppins text-base rounded-lg shadow-lg shadow-gray-400">
          <span className="font-bold">Hey user, please login/register your account!</span>
          <button
            className="ml-4 hover:bg-gray-200 text-white rounded-md p-1 transition duration-300"
            onClick={() => setShowAlert(false)} 
          >
            <svg
              viewBox="0 0 384 512"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[15px] fill-gray-400"
            >
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default LoginAlert;
