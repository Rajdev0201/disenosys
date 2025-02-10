import React from 'react'

const Stepthree = ({
    formData,
    setFormData,
    prevStep,
    handleSubmit,
    load,
    // isChecked,
    // setIsChecked,
}) => {

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const fileType = file.type;
        if (fileType === "application/pdf") {
          setFormData((prev) => ({ ...prev, file }));
        } else {
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
          setError('Unsupported file type. Please upload an image.');
        }
      };

  

      const handleTen = (e) => {
        const ten = e.target.files[0]; // Get the uploaded file from the event
        if (!ten) return;
      
        // Validation for file type
        const fileType = ten.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  ten})); // Assign the file to `formData.filePic`
        } else {
          setError('Unsupported file type. Please upload an image.');
        }
      };


      const handleUg = (e) => {
        const ug = e.target.files[0]; // Get the uploaded file from the event
        if (!ug) return;
      
        // Validation for file type
        const fileType = ug.type;
        if (fileType.startsWith('application/pdf')) {
          setFormData((prev) => ({ ...prev,  ug})); // Assign the file to `formData.filePic`
        } else {
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
          setError('Unsupported file type. Please upload an image.');
        }
      };
  
      
  return (
    <div className='flex flex-col space-y-3 '>
        <h1 className='text-lg font-sans font-bold'>Academic Details:</h1>
          <div className='grid grid-cols-3 gap-2'>
          <input 
          type='text'
          name='Edu'
          value={formData.Edu}
          onChange={(e) => setFormData({ ...formData, Edu: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Highest Qualification'
          required
          />
           <input 
            type='text'
          name='Passed'
          value={formData.Passed}
          onChange={(e) => setFormData({ ...formData, Passed: e.target.value })}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Passed Out Year'
          required
          />
          <input 
           type='text'
          name='Academy'
          value={formData.Academy}
          onChange={(e) => setFormData({ ...formData, Academy: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Academy Name'
          required
          />
          </div>
          <h1 className='text-lg font-sans font-bold'>Documents to be submit:</h1>
          <div className='grid grid-cols-3 gap-2'>
            <div>
          <input 
          type='file'
          name='profile'
       
          onChange={handleProfile}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='profile'
          required
          />
          <span className='text-sm text-red-500'>Passport Size photo*</span>
          </div>
          <div>
           <input 
            type='file'
          name='file'
          accept=".pdf,.doc,.docx"
       
          onChange={handleFileUpload}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='resume'
          required
          />
             <span className='text-sm text-red-500'>Updated Resume*</span>
          </div>
          <div>
           <input 
            type='file'
          name='ten'
          onChange={handleTen}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='10th'
          required
          />
             <span className='text-sm text-red-500'>Accadmic Proof 10th*</span>
          </div>
          <div>
           <input 
            type='file'
          name='plustwo'
          onChange={handlePlus}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='12th'
          required
          />
             <span className='text-sm text-red-500'>Accadmic Proof 12th*</span>
          </div>
          <div>
           <input 
            type='file'
          name='ug'
          onChange={handleUg}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='ug'
          required
          />
             <span className='text-sm text-red-500'>Accadmic Proof UG*</span>
          </div>

          <div>
           <input 
            type='file'
          name='pg'
          onChange={handlePg}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='pg'
          required
          />
             <span className='text-sm text-red-500'>Accadmic Proof PG*</span>
          </div>

          
          <div>
           <input 
            type='file'
          name='afile'
          onChange={handleAfile}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='aadhar'
          required
          />
             <span className='text-sm text-red-500'>Aadhar Card*</span>
          </div>

          <div>
           <input 
            type='file'
          name='voter'
          onChange={handleVoter}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='voter'
          required
          />
             <span className='text-sm text-red-500'>Voter ID*</span>
          </div>
       
          <div>
           <input 
            type='file'
          name='pan'
          onChange={handlePan}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='pan'
          required
          />
             <span className='text-sm text-red-500'>PAN Card*</span>
          </div>
          </div>
          <h1 className='text-lg font-sans font-bold'>Course Details:</h1>
          <div className='grid grid-cols-3 gap-2'>
            <div>
          <input 
          type='date'
          name='rdate'      
          value={formData.rdate}
         onChange={(e) => setFormData({ ...formData, rdate: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Registration Date'
          required
          />
                    <span className='text-sm text-red-500'>Registration Date*</span>
        </div>
        <div>
           <input 
            type='date'
          name='cdate'
          value={formData.cdate}
          onChange={(e) => setFormData({ ...formData, cdate: e.target.value })}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Course Joining Date'
          required
          />
           <span className='text-sm text-red-500'>Course Joining Date*</span>
           </div>
           <div>
          <input 
           type='text'
          name='cname'
          value={formData.cname}
          onChange={(e) => setFormData({ ...formData, cname: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Course Name'
          required
          />
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