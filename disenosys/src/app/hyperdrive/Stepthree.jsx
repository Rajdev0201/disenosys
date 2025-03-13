"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { courseld } from '../Redux/action/Course';

const Stepthree = ({
    formData,
    setFormData,
    prevStep,
    handleSubmit,
    load,
    // isChecked,
    // setIsChecked,
}) => {
   
  const course = useSelector((state) => state.courseLD);
 const dispatch = useDispatch();

  useEffect(() => {
    dispatch(courseld());
  }, [dispatch]);


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const fileType = file.type;
        if (fileType === "application/pdf") {
          setFormData((prev) => ({ ...prev, file }));
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError("Unsupported file type. Please upload a PDF file.");
        }
      };
      
      const handleID = (e) => {
        const idProof = e.target.files[0];
        if (!idProof) return;
    
        const fileType = idProof.type;
        if (fileType === "application/pdf") {
          setFormData((prev) => ({ ...prev, idProof}));
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError("Unsupported file type. Please upload a PDF file.");
        }
      };
      
      const handleProfile = (e) => {
        const profile = e.target.files[0];
        if (!profile) return;
      
        // Validation for file type
        const fileType = profile.type;
        if (fileType.startsWith('application/pdf') || fileType.startsWith('image/') )  {
          setFormData((prev) => ({ ...prev, profile })); 
        } else {
          alert("Unsupported file type. Please upload a PDF file or Png file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };

  

      const handleTen = (e) => {
        const ten = e.target.files[0];
        if (!ten) return;
        const fileType = ten.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  ten})); 
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };


      const handleUg = (e) => {
        const ug = e.target.files[0]; 
        if (!ug) return;
      
        const fileType = ug.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  ug})); 
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };

      const handlePg = (e) => {
        const pg = e.target.files[0]; // Get the uploaded file from the event
        if (!pg) return;
      
        // Validation for file type
        const fileType = pg.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  pg})); // Assign the file to `formData.filePic`
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };
      const handlePlus = (e) => {
        const plustwo = e.target.files[0]; // Get the uploaded file from the event
        if (!plustwo) return;
      
        // Validation for file type
        const fileType = plustwo.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  plustwo})); // Assign the file to `formData.filePic`
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };
      const handleAfile = (e) => {
        const afile = e.target.files[0]; // Get the uploaded file from the event
        if (!afile) return;
      
        // Validation for file type
        const fileType = afile.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  afile})); // Assign the file to `formData.filePic`
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };
      const handleVoter = (e) => {
        const voter = e.target.files[0]; // Get the uploaded file from the event
        if (!voter) return;
      
        // Validation for file type
        const fileType = voter.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  voter})); // Assign the file to `formData.filePic`
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };

      
      const handlePan = (e) => {
        const pan = e.target.files[0]; // Get the uploaded file from the event
        if (!pan) return;
      
        // Validation for file type
        const fileType = pan.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  pan})); // Assign the file to `formData.filePic`
        } else {
          alert("Unsupported file type. Please upload a PDF file.")
          setError('Unsupported file type. Please upload an image.');
        }
      };
  
      
  return (
    <div className='flex flex-col space-y-3 '>
        <h1 className='text-lg font-sans font-bold'>Academic Details:</h1>
          <div className='grid lg:grid-cols-3 gap-2'>
          <div>
  <span className="text-sm text-red-500">Highest Qualification*</span>
  <select
    name="Edu"
    value={formData.Edu}
    onChange={(e) => setFormData({ ...formData, Edu: e.target.value })}
    className="w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
    required
  >
    <option value="">Select Qualification</option>
    {[
      "High School",
      "Diploma",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD",
      "Other"
    ].map((qualification, index) => (
      <option key={index} value={qualification}>
        {qualification}
      </option>
    ))}
  </select>
</div>

          <div>
          <span className="text-sm text-red-500">Passed Out Year *</span>
           <input 
            type='text'
          name='Passed'
          value={formData.Passed}
          onChange={(e) => setFormData({ ...formData, Passed: e.target.value })}
           className='w-full h-12  bg-blue-100 shadow-inner rounded-lg p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='Passed Out Year'
          required
          />
          </div>
          <div>
          <span className="text-sm text-red-500">Academy Name *</span>
          <input 
           type='text'
          name='Academy'
          value={formData.Academy}
          onChange={(e) => setFormData({ ...formData, Academy: e.target.value })}
          className='w-full rounded-lg  bg-blue-100 shadow-inner p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='Academy Name'
          required
          />
          </div>
          </div>
          <h1 className="text-lg font-sans font-bold">Are you an Indian citizen?</h1>
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="isIndia"
            value="yes"
            checked={formData.isIndia === "yes"} 
            onChange={(e) => setFormData({ ...formData, isIndia: e.target.value })}
            className=''
            required
          />
          Yes
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="isIndia"
            value="no"
            checked={formData.isIndia === "no"} 
            onChange={(e) => setFormData({ ...formData, isIndia: e.target.value })}
            required
          />
          No
        </label>
      </div>
    
          <>
          <h1 className='text-lg font-sans font-bold mt-5'>Documents to be submit:</h1>
          {formData.isIndia === "yes" && (
          <div className='grid lg:grid-cols-3 gap-2'>
            <div>
            <span className='text-sm text-red-500'>Passport Size photo*</span>
          <input 
          type='file'
          name='profile'
          onChange={handleProfile}
          className='w-full rounded-lg  bg-blue-100 shadow-inner p-3 text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='profile'
          required
          />
          </div>

          <div>
          <span className='text-sm text-red-500'>Updated Resume*</span>
           <input 
            type='file'
          name='file'
          accept=".pdf,.doc,.docx"
       
          onChange={handleFileUpload}
           className='w-full rounded-lg p-3 bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='resume'
          required
          />
          </div>

          <div>
          <span className='text-sm text-red-500'>Accadmic Proof 10th*</span>
           <input 
            type='file'
          name='ten'
          onChange={handleTen}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='10th'
          required
          />
          </div>

          <div>
          <span className='text-sm text-red-500'>Accadmic Proof 12th*</span>
           <input 
            type='file'
          name='plustwo'
          onChange={handlePlus}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='12th'
          required
          />
          </div>

          <div>
          <span className='text-sm text-red-500'>Accadmic Proof UG*</span>
           <input 
            type='file'
          name='ug'
          onChange={handleUg}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='ug'
          required
          />
          </div>

          <div>
          <span className='text-sm text-red-500'>Accadmic Proof PG*</span>
           <input 
            type='file'
          name='pg'
          onChange={handlePg}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='pg'
          required
          />
          </div>

          
          <div>
          <span className='text-sm text-red-500'>Aadhar Card*</span>
           <input 
            type='file'
          name='afile'
          onChange={handleAfile}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='aadhar'
          required
          />
          </div>

          <div>
          <span className='text-sm text-red-500'>Voter ID*</span>
           <input 
            type='file'
          name='voter'
          onChange={handleVoter}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='voter'
          required
          />
          </div>
       
          <div>
          <span className='text-sm text-red-500'>PAN Card*</span>
           <input 
            type='file'
          name='pan'
          onChange={handlePan}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='pan'
          required
          />
          </div>
          </div>
           )}
           { formData.isIndia === "no" && (
                 <div className='flex flex-col lg:flex-row gap-2'>
                 <div>
                 <span className="text-sm text-red-500">Passport Size Photo*</span>
                 <input
                   type="file"
                   name="profile"
                   onChange={handleProfile}
                   className="w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:outline-purple-500"
                   required
                 />
                 </div>
                 <div>
                 <span className="text-sm text-red-500">ID Proof*</span>
                 <input
                   type="file"
                   name="idProof"
                   onChange={handleID}
                   className="w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:outline-purple-500"
                   required
                 />
                 </div>
               </div>
           )}
          </>
     
          <h1 className='text-lg font-sans font-bold'>Course Details:</h1>
          <div className='grid lg:grid-cols-2 gap-2'>
            <div>
            <span className='text-sm text-red-500'>Registration Date*</span>
          <input 
          type='date'
          name='rdate'      
          value={formData.rdate}
         onChange={(e) => setFormData({ ...formData, rdate: e.target.value })}
          className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='Registration Date'
          required
          />
        </div>
        <div>
        <span className='text-sm text-red-500'>Course Joining Date*</span>
           <input 
            type='date'
          name='cdate'
          value={formData.cdate}
          onChange={(e) => setFormData({ ...formData, cdate: e.target.value })}
           className='w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500'
          placeholder='Course Joining Date'
          required
          />
           </div>
           <div>
  <label className="text-sm text-red-500">Course Name*</label>
  <select
    name="cname"
    value={formData.cname}
    onChange={(e) => setFormData({ ...formData, cname: e.target.value })}
    className="w-full rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  outline-none focus:outline-purple-500"
    required
  >
    <option value="" disabled>Select a course</option>
    {course?.data?.map((item, index) => (
                  <option key={item._id} value={item.course}>
                    {item.course}
                  </option>
                ))}
  </select>
</div>

          <div>
  <span className="text-sm text-red-500">Course Preference*</span>
  <select
    name="mode"
    value={formData.mode}
    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
    className="w-full h-12 rounded-lg p-3  bg-blue-100 shadow-inner text-gray-700 text-base  focus:border-none outline-none focus:outline-purple-500"
    required
  >
    <option value="">Select Course Mode</option>
    {["Live", "Pre-recorded"].map((mode, index) => (
      <option key={index} value={mode}>
        {mode}
      </option>
    ))}
  </select>
</div>

          </div>
          <div className='mt-4 flex justify-between'>
     <button
    onClick={prevStep}
    className=" px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600"
  >
    Back
  </button>
  <button
    onClick={handleSubmit}
    className=" px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
 {load ? "Loading..." : "Submit"}
  </button>
  </div>
    </div>
  )
}

export default Stepthree