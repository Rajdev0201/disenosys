"use client"
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/FindJob/JobCards";
import logo from "../assests/profile/logo.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getJob } from "../Redux/action/createJob";
import { useRouter } from "next/navigation";
import { FaSearchengin } from "react-icons/fa";



const JobListPage = () => {
  const {jobs,loading} = useSelector((state) => state.jobs); 
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const totalPages = jobs?.pages || 1;

  const [fliter,setFilter] = useState([]);
  const [search,setSearch] = useState("");
  useEffect(() => {
    const filterData =  jobs?.jobs?.filter((item) => {
      const title = item?.title?.toLowerCase().includes(search.toLowerCase()) || "";
      const companyName = item?.companyName?.toLowerCase().includes(search.toLowerCase())  || "";
      const location = item?.location?.toLowerCase().includes(search.toLowerCase()) || "";
      const type = item?.type?.toLowerCase().includes(search.toLowerCase())  || "";
      return (
        title||
        companyName||
        location||
        type
      );
     })
     setFilter(filterData)
  },[search,jobs])

  const handlePageClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  useEffect(() => {
    dispatch(getJob())
  },[dispatch]);

  const goToDescriptionPage = (slug) => {
    router.push(`/job-details/${encodeURIComponent(slug)}`);
  };

   const Reset = () => {
    setSearch("");
   }
  return (
    <div className="bg-[#f9f9f9] min-h-screen px-4 sm:px-6 lg:px-20 pt-6 font-garet">
      <div className="flex justify-between items-center mb-2 bg-blue-400 rounded-md">
        <h1 className="text-md lg:text-3xl text-white font-medium mx-auto">Start Your Career Journey</h1>
        <Image src={logo} alt="logo" className="w-12 lg:w-52 object-cover" />
      </div>
      {/* <SearchBar job={jobs}/> */}

      <div className="grid grid-cols-12 gap-2 p-4 bg-white shadow-md rounded-md">
        <div className="col-span-12 sm:col-span-6 lg:col-span-11">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Job title, Position, Keyword..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
        />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-1">
        <button className="bg-blue-400 text-white px-3 py-2 text-base rounded-md hover:bg-blue-700" onClick={Reset}>
          {search ? "Reset":
            <FaSearchengin size={20} color="white"/>
          }
        </button>
        </div>
      </div>
      {!loading ? (
       <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {fliter?.map((job, index) => (
          <JobCard key={index} {...job} filterData={fliter} fun = {goToDescriptionPage} />
        ))}
      </div>
      <div className="flex justify-center mt-8 mb-4">
        {fliter?.length &&(
        <ul className="flex items-center gap-2 text-sm">
          <li
            onClick={() => handlePageClick(page - 1)}
            className="cursor-pointer text-gray-400 hover:text-black"
          >
            &lt;
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <li
              key={num}
              onClick={() => handlePageClick(num)}
              className={`px-3 py-1 rounded-full cursor-pointer ${
                num === page ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {num < 10 ? `0${num}` : num}
            </li>
          ))}
          <li
            onClick={() => handlePageClick(page + 1)}
            className="cursor-pointer text-gray-400 hover:text-black"
          >
            &gt;
          </li>
        </ul>
        )}
      </div>
       </>
      ) : (
        <p className="text-center text-red-500 font-bold flex justify-center items-center min-h-screen font-garet">
          Loading....
        </p>
      )}
    </div>
  );
};

export default JobListPage;
