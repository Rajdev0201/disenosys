import React from 'react'

const Steptow = ({nextStep,prevStep, formData, setFormData,}) => {
  return (
    <div>
    <div className='flex flex-col space-y-3 '>
        <h1 className='text-lg font-sans font-bold'>Personal Details:</h1>
        <div className='grid grid-cols-3 gap-2'>
          <input 
          type='text'
          name='panno'
          value={formData.panno}
          onChange={(e) => setFormData({ ...formData, panno: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='PAN No'
          required
          />
           <input 
           type='text'
          name='aadharno'
          value={formData.aadharno}
          onChange={(e) => setFormData({ ...formData, aadharno: e.target.value })}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Aadhar No'
          required
          />
          <input 
          type='text'
          name='blood'
          value={formData.blood}
          onChange={(e) => setFormData({ ...formData, blood: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Blood Group'
          required
          />
           <input 
           type='text'
          name='father'
          value={formData.father}
          onChange={(e) => setFormData({ ...formData, father: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Father Name'
          required
          />
             <input 
          type='text'
          name='mother'
          value={formData.mother}
          onChange={(e) => setFormData({ ...formData, mother: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Mother Name'
          required
          />
           <input 
          type='text'
          name='marital'
          value={formData.marital}
          onChange={(e) => setFormData({ ...formData, marital: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Marital Status'
          required
          />
           <input 
          type='text'
          name='spouse'
          value={formData.spouse}
          onChange={(e) => setFormData({ ...formData, spouse: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Spouse Status'
          required
          />
        </div>
        <h1 className='text-lg font-sans font-bold'>Nominee Details:</h1>
         
           <div className='grid grid-cols-2 gap-2'>
            <div >
          <input 
          type='text'
          name='n1'
          value={formData.n1}
          onChange={(e) => setFormData({ ...formData, n1: e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Nominee Name'
          required
          />
          </div>
          <div className='-mt-6'>
          <span className='text-sm text-red-500'>Nominee Date Of Birth*</span>
           <input 
            type='date'
          name='ndob'
          value={formData.ndob}
          onChange={(e) => setFormData({ ...formData, ndob: e.target.value })}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Nominee DOB'
          required
          />
          </div>
          <input 
           type='text'
          name='nrealtion'
          value={formData.nrealtion}
          onChange={(e) => setFormData({ ...formData, nrealtion : e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Nominee Relationship'
          required
          />
           <input 
            type='email'
            name='naddress'
            value={formData.naddress}
            onChange={(e) => setFormData({ ...formData, naddress : e.target.value })}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Nominee Address'
          required
          />
          </div>

          <h1 className='text-lg font-sans font-bold'>Personal Bank Account Details:</h1>
          <div className='grid grid-cols-2 gap-2'>
          <input 
          type='text'
          name='bank'
          value={formData.bank}
          onChange={(e) => setFormData({ ...formData, bank : e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Bank Name'
          required
          />
           <input 
            type='text'
          name='branch'
          value={formData.branch}
          onChange={(e) => setFormData({ ...formData, branch : e.target.value })}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='Branch'
          required
          />
          <input 
           type='text'
          name='Ac'
          value={formData.Ac}
          onChange={(e) => setFormData({ ...formData, Ac : e.target.value })}
          className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='A/c No'
          required
          />
           <input 
            type='text'
            name='IFSC'
            value={formData.IFSC}
            onChange={(e) => setFormData({ ...formData, IFSC : e.target.value })}
           className='w-full rounded-lg p-3 text-gray-700 text-base border-2 border-gray-300 focus:border-none outline-none focus:outline-purple-500'
          placeholder='IFSC Code'
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
    onClick={nextStep}
    className=" px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
    Next
  </button>
  </div>
</div>
  )
}

export default Steptow