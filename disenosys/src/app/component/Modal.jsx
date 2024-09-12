"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { LuUser2 } from "react-icons/lu";
import Authentication from "../auth/Auth.jsx"
import { AiOutlineClose } from "react-icons/ai";
import "./Modal.css";

const MyModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const appElement = document.getElementById("root");
    if (appElement) {
      Modal.setAppElement(appElement);
    } else {
      console.error("Root element not found");
    }
  }, []);

  return (
    <div className="">

  
<div
  class="max-w-44 bg-transparent items-center justify-center flex border-2 border-white shadow-lg hover:bg-[#182073] text-white hover:text-white duration-300 cursor-pointer active:scale-[0.98]"
>
  <button class="px-5 py-2 flex items-center"onClick={openModal}>
  <LuUser2 size={20} className=" mx-1" />
  <span className="text-center">Login</span>
  </button>
</div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-4/12 animate-slideIn mt-12"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button
          onClick={closeModal}
          className="bg-[#38C3E2] text-white px-3 py-3 rounded-full mb-44 ml-20  absolute -top-7 -right-8  "
        >
          <AiOutlineClose size={30} />
        </button>
        <Authentication />
      </Modal>
    </div>
  );
};
export default MyModal;