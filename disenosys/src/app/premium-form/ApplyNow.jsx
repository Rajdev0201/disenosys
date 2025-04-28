"use client";
import React, { useEffect, useRef, useState } from 'react';
import { createPremiumList } from '../Redux/action/createJob';
import { useDispatch, useSelector } from 'react-redux';
import { Payment } from '../Redux/action/createJob';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiUserCheck } from 'react-icons/fi';
const ApplyNow = () => {
  const {payment} = useSelector((state) => state.jobs);
  const search = useSearchParams("");
  const sessionId = search.get('orderId');
  const fileInputRef = useRef(null);
  const initialState ={
    name: '',
    phone: '',
    jobs:'',
    sessionId: '',
    dob: '',
    gender: '',
    linkedin: '',
    portfolio: '',
    qualification: '',
    specialization: '',
    college: '',
    yearOfPassing: '',
    currentJob: '',
    experience: '',
    previousCompany: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    preferredLocation: '',
    resume: null,
    email: '',
    native: '',
    message: ''
  }
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Payment())
  },[dispatch])
 
  useEffect(() => {
    const jobIds = payment
      .filter((data) => data.sessionId === sessionId)
      .map((data) => data._id);

      if (jobIds.length > 0) {
        setFormData((prev) => ({
          ...prev,
          jobs: jobIds[0], // set the actual jobId after getting it
        }));
      }
  
    const findName =  payment
    .filter((data) => data.sessionId === sessionId)
    .map((data) => data.customerDetails.name);

    setFormData((prev) => ({
      ...prev,
      name: findName[0] ,
      sessionId: sessionId,
  }))

  }, [payment, sessionId]);

 
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    dispatch(createPremiumList(data,router))

    // Reset form
    setFormData(initialState);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    } 
  }
  return (
    <div className="bg-[#FBFBFB] min-h-screen font-garet">
      {payment?.filter((data,i) => (
         data.sessionId === sessionId)).map((data,i) => (
          data.isPaid && (
      <div className="container mx-auto" key={i}>
        <div className="flex flex-col lg:flex-row justify-between items-center py-3 border-b-2 border-gray-200">
          <h1 className="text-md lg:text-2xl font-medium text-blue-500 flex gap-2 items-center">
            Premium Job Application
            <span className="w-2 h-2 mx-2 mt-1 animate-pulse bg-green-500 ring-2 ring-blue-100 shadow-xl rounded-full"></span>
          </h1>
          <h4 className="font-semibold text-sm lg:text-lg text-gray-700 flex items-center gap-2">Welcome - {data.customerDetails.name}<FiUserCheck size={20} color='blue'/></h4>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-3xl shadow-inner p-10 mt-8">
      <div className="flex flex-col gap-4">

    <label className="font-semibold">Full Name</label>
    <input type="text" name="name" value={data.customerDetails.name} required placeholder={data.customerDetails.name}   disabled className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed" />

    <label className="font-semibold">Phone</label>
    <input type="text" name="phone" value={formData.phone} onChange={handleChange}  required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
   
    <label className="font-semibold">Email</label>
    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Native</label>
    <input type="text" name="native" value={formData.native} onChange={handleChange} placeholder="Enter Your Native" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Date of Birth</label>
    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Gender</label>
    <select name="gender" value={formData.gender} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
      <option value="Prefer not to say">Prefer not to say</option>
    </select>

    <label className="font-semibold">LinkedIn Profile</label>
    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Portfolio / Website</label>
    <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Highest Qualification</label>
    <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Specialization</label>
    <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </div>

  {/* Right Column */}
  <div className="flex flex-col gap-4">
    <label className="font-semibold">College / University</label>
    <input type="text" name="college" value={formData.college} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Year of Passing</label>
    <input type="number" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Current Job Title</label>
    <input type="text" name="currentJob" value={formData.currentJob} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Years of Experience</label>
    <input type="text" name="experience" value={formData.experience} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Previous Company</label>
    <input type="text" name="previousCompany" value={formData.previousCompany} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Current CTC (LPA)</label>
    <input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Expected CTC</label>
    <input type="text" name="expectedCTC" value={formData.expectedCTC} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Notice Period</label>
    <input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Preferred Job Location</label>
    <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="font-semibold">Upload Resume (PDF)</label>
    <input type="file" name="resume" accept="application/pdf"  onChange={handleChange} ref={fileInputRef}
     className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200 " required />

    <label className="font-semibold">Additional Message</label>
    <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Any message for the recruiter..."></textarea>
  </div>

  <div className="col-span-1 md:col-span-2 text-center mt-4">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 font-medium rounded-xl shadow-md">Submit</button>
  </div>
</form>

      </div>
       )
    ))}
    </div>
  );
};

export default ApplyNow;
