"use client"
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/FindJob/JobCards";
import SearchBar from "../../components/FindJob/SearchBar";
import logo from "../assests/profile/logo.jpg";
import Image from "next/image";
import { useEffect } from "react";
import { getJob } from "../Redux/action/createJob";
import { useRouter } from "next/navigation";



const JobListPage = () => {
  const {jobs,loading} = useSelector((state) => state.jobs); 
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(jobs)
  useEffect(() => {
    dispatch(getJob())
  },[dispatch]);

  const goToDescriptionPage = (slug) => {
    router.push(`/job-details/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen px-4 sm:px-6 lg:px-20 pt-6 font-garet">
      <div className="flex justify-between items-center mb-2 bg-blue-400">
        <h1 className="text-3xl text-white font-medium mx-auto">Start Your Career Journey</h1>
        <Image src={logo} alt="logo" className="w-1/4 object-cover" />
      </div>

      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {jobs?.jobs?.map((job, index) => (
          <JobCard key={index} {...job} fun = {goToDescriptionPage} load ={loading} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 mb-4">
        <ul className="flex items-center gap-2 text-sm">
          <li className="cursor-pointer text-gray-400 hover:text-black">&lt;</li>
          {[1, 2, 3, 4, 5].map((num) => (
            <li
              key={num}
              className={`px-3 py-1 rounded-full ${num === 1 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              {num < 10 ? `0${num}` : num}
            </li>
          ))}
          <li className="cursor-pointer text-gray-400 hover:text-black">&gt;</li>
        </ul>
      </div>
    </div>
  );
};

export default JobListPage;
