"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Online } from '../Redux/action/onlineStd';
import { useSearchParams } from 'next/navigation';
import { FaEye } from 'react-icons/fa';
import Image from 'next/image';
import StudentApplicationForm from './Pdf';

const Details = () => {
    const {online,loading} = useSelector((state) => state.online);
    const dispatch = useDispatch();
    const search = useSearchParams();
    const courseId = search.get("profileId");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPdf, setPdf] = useState(false);
    const [is1,setIs1] = useState(false);
    const [is2,setIs2] = useState(false);
    const [is3,setIs3] = useState(false);
    const [is4,setIs4] = useState(false);
    const [is5,setIs5] = useState(false);
    const [is6,setIs6] = useState(false);
    const [is7,setIs7] = useState(false);
    const [is8,setIs8] = useState(false);

    const openModalPdf = () => {
      setPdf(true);
    };
  
    const closeModalPdf = () => {
      setPdf(false);
    };

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    
    const openModal1 = () => {
        setIs1(true);
      };
    
      const closeModal1 = () => {
        setIs1(false);
      };

      const openModal2 = () => {
        setIs2(true);
      };
    
      const closeModal2 = () => {
        setIs2(false);
      };

      const openModal3 = () => {
        setIs3(true);
      };
    
      const closeModal3 = () => {
        setIs3(false);
      };

      const openModal4 = () => {
        setIs4(true);
      };
    
      const closeModal4 = () => {
        setIs4(false);
      };

      const openModal5 = () => {
        setIs5(true);
      };
    
      const closeModal5 = () => {
        setIs5(false);
      };

      const openModal6 = () => {
        setIs6(true);
      };
    
      const closeModal6 = () => {
        setIs6(false);
      };

      const openModal7 = () => {
        setIs7(true);
      };
    
      const closeModal7 = () => {
        setIs7(false);
      };
     
      const openModal8 = () => {
        setIs8(true);
      };
    
      const closeModal8 = () => {
        setIs8(false);
      }; 
     

    useEffect(() => {
        dispatch(Online());
      }, [dispatch])
    
  return (
    <div className='px-24 py-12 flex justify-center items-center mx-auto flex-col min-h-screen'>
      {loading && <div className='font-bold text-red-500 flex items-center justify-center font-garet'>Loading...</div>}
        {online?.data?.filter((data) => data._id === courseId)?.map((data,i) => (
          <>
       <h1 className='text-2xl font-garet font-bold text-white mb-4'>Documents</h1>
          {data.isIndia === "yes" ? (
            <div key={i} className='grid grid-cols-4 border-2 border-gray-200 shadow-md p-4 gap-x-4 gap-y-3 rounded-3xl'>
                  <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal}
          
        >
         Resume <FaEye className="text-white w-4 h-4"/> 
        </button>
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal1}
        >
          10th<FaEye className="text-white w-4 h-4"/>
        </button>
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal2}
        >
          12th <FaEye className="text-white w-4 h-4"/>
        </button>
        {data?.Edu === "Bachelor's Degree" && 
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal3}
        >
          UG <FaEye className="text-white w-4 h-4"/>
        </button>
          }
        {data?.Edu === "Master's Degree" &&
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal4}
        >
          PG <FaEye className="text-white w-4 h-4"/>
        </button>
          }
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal5}
        >
          Aadhar<FaEye className="text-white w-4 h-4"/>
        </button>
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal6}
        >
          Voter ID<FaEye className="text-white w-4 h-4"/>
        </button>
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal7}
        >
          PAN <FaEye className="text-white w-4 h-4"/>
        </button>
      
                 {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>

            <div className="w-11/12 h-full flex justify-center items-center mt-6">
              {data?.file.endsWith(".pdf") ? (
                <iframe
                  src={data?.file}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
              ) : (
                <Image
                  src={data?.file}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}

{isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4 right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.file.endsWith(".pdf") ? (
                <iframe
                  src={data?.file}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.file}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}

{is1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal1}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.ten.endsWith(".pdf") ? (
                <iframe
                  src={data?.ten}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.ten}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}

             
{is2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal2}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.plustwo.endsWith(".pdf") ? (
                <iframe
                  src={data?.plustwo}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.plustwo}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}

{is3 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal3}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.ug.endsWith(".pdf") ? (
                <iframe
                  src={data?.ug}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.ug}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
          </div>
        </div>
        </div>
             )}

{is4 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal4}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.pg.endsWith(".pdf") ? (
                <iframe
                  src={data?.pg}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.pg}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}

{is5 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal5}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.afile.endsWith(".pdf") ? (
                <iframe
                  src={data?.afile}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.afile}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}

{is6 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal6}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.voter.endsWith(".pdf") ? (
                <iframe
                  src={data?.voter}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.voter}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}

             
{is7 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal7}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.pan.endsWith(".pdf") ? (
                <iframe
                  src={data?.pan}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.pan}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}
            
            </div>
          ):(
            <div key={i} className='grid grid-cols-4 border-gray-200 shadow-md p-4 gap-x-4 gap-y-3 rounded-md'>
                  <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex justify-center items-center gap-2 rounded-md shadow-inner w-44"
          onClick={openModal8}
          
        >
         ID-Proof <FaEye className="text-white w-4 h-4"/> 
        </button>

        {is8 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4  right-0 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal8}
            >
              Close
            </button>

            <div className="w-11/12  h-full flex justify-center items-center mt-6">
            {data?.idProof.endsWith(".pdf") ? (
                <iframe
                  src={data?.idProof}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
            ) : (
                <Image
                  src={data?.idProof}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
        
             )}
        </div>
          )}
          <hr/>
            <StudentApplicationForm data = {data} isPdf={isPdf} openModalPdf={openModalPdf} closeModalPdf={closeModalPdf}/>
          </>
        ))}
    </div>
  )
}

export default Details