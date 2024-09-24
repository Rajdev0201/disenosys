import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { IoMdAlert } from 'react-icons/io';
import Modal from "../Modal";
const LoginAlert = () => {
  const [showAlert, setShowAlert] = useState(true); 

//   const handleLinkClick = () => {
//     setShowAlert(false)
//   }

  return (
    <div className="fixed inset-x-0 top-30 flex justify-center z-50">
      <Transition
        show={showAlert}
        enter="transform transition duration-300 ease-out"
        enterFrom="scale-75 opacity-0 translate-y-5"
        enterTo="scale-100 opacity-100 translate-y-0"
        leave="transform transition duration-300 ease-in"
        leaveFrom="scale-100 opacity-100 translate-y-0"
        leaveTo="scale-75 opacity-0 translate-y-5"
      >
   
<div
  id="toast-notification"
  class="w-full max-w-xs p-4 h-48 text-gray-900 bg-[#182073] rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
  role="alert"
>
  <div class="flex items-center mb-3">
    <span class="mb-1 text-base font-semibold text-white font-poppins dark:text-white"
      >Auth notification</span>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0  hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500  dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-notification"
      aria-label="Close"
    >
    <IoMdAlert size={20} className='text-[182073]'/>
    </button>
  </div>
  <div class="flex items-center justify-center mt-8">
    <div class="relative inline-block shrink-0">
      <div
        class="w-20 h-20 rounded-full bg-[#057FE3] mb-2 flex items-center justify-center text-[#182073] font-bold text-xl"
      >
        D
      </div>
      <span
        class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full"
      >
        <svg
          class="w-3 h-3 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 18"
          fill="currentColor"
        >
          <path
            d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
            fill="currentColor"
          ></path>
          <path
            d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
            fill="currentColor"
          ></path>
        </svg>
        <span class="sr-only">Message icon</span>
      </span>
    </div>
    <div class="ms-3 text-sm font-normal flex flex-col">
      <div class=" font-semibold text-white text-base dark:text-white">
        Hello user!
      </div>
      <div class="text-base font-normal text-white font-poppins">Please Signin/Register</div>
      <span class="text-xs font-medium text-[#057FE3]  dark:text-blue-500"
        >with your account</span>
            {/* <div className='w-24 h-4 mt-2'>
    <Modal/>
    </div> */}
    </div>
  </div>
</div>
 
      </Transition>
    </div>
  );
};

export default LoginAlert;
