"use client"
import React from 'react'

const Stepone = ({nextStep,formData,setFormData}) => {
  return (
    <div>
        <div className='flex flex-col space-y-3 '>
            <h1 className='text-lg font-sans font-bold'>Student Details:</h1>
            <div className='grid grid-cols-2 gap-2'>
              <input 
              type='text'
              name='fname'
              value={formData.fname}
              onChange={(e) => setFormData({ ...formData, fname : e.target.value })}
              className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='First Name'
              required
              />
               <input 
               type='text'
              name='lname'
              value={formData.lname}
              onChange={(e) => setFormData({ ...formData, lname : e.target.value })}
               className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Last Name'
              required
              />
              <div>
               <input 
               type='date'
               name='dob'
               value={formData.dob}
               onChange={(e) => setFormData({ ...formData, dob : e.target.value })}
              className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='DOB'
              required
              />
                           <span className='text-sm text-red-500'>Date Of Birth*</span>
              </div>

              <div>
               <input 
               type='text'
              name='gender'
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender : e.target.value })}
              className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Gender'
              required
              />
              </div>
            </div>
            <h1 className='text-lg font-sans font-bold'>Address Details:</h1>
              <input 
              type='text'
              name='permanent'
              value={formData.permanent}
              onChange={(e) => setFormData({ ...formData, permanent: e.target.value })}
              className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Permanent Address'
              required
              />
               <input 
              type='text'
              name='communication'
              value={formData.communication}
              onChange={(e) => setFormData({ ...formData, communication : e.target.value })}
              className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Communication Address'
              required
              />
               <h1 className='text-lg font-sans font-bold'>Contact Details:</h1>
               <div className='grid grid-cols-2 gap-2'>
              <input 
              type='text'
              name='no1'
              value={formData.no1}
              onChange={(e) => setFormData({ ...formData, no1 : e.target.value })}
              className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Personal Mobile No 1'
              required
              />
               <input 
                type='text'
              name='no2'
              value={formData.no2}
              onChange={(e) => setFormData({ ...formData, no2 : e.target.value })}
               className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Personal Mobile No 2'
              required
              />
              <input 
               type='text'
              name='emg'
              value={formData.emg}
              onChange={(e) => setFormData({ ...formData, emg : e.target.value })}
              className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Emergency Contact No'
              required
              />
               <input 
                type='email'
                name='email'
                value={formData.email}
              onChange={(e) => setFormData({ ...formData, email : e.target.value })}
               className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
              placeholder='Personal Mail ID'
              required
              />
              </div>
         </div>
         <button
        onClick={nextStep}
        className="mt-4 flex justify-end items-end px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  )
}

export default Stepone