"use client"
import JobDetailCard from "../../../components/FindJob/JobDetailsCard";
import JobSidebar from "../../../components/FindJob/SideBar";
import RelatedJobCard from "../../../components/FindJob/RelatedJob";
import Footer from "../../../components/FindJob/Footer";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "@/app/Redux/action/createJob";
import { useEffect } from "react";


const JobDetails = () => {
  const {slug} = useParams();
  const {jobs,loading} = useSelector((state) => state.jobs); 
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getJob())
  },[dispatch]);

  const RealtedJob  = jobs?.jobs?.filter((job) => job.title !== decodeURIComponent(slug));
  const data = RealtedJob?.slice(0,3);
  return (
    <div className="flex flex-col min-h-screen font-garet">
      <div className="flex justify-between items-center mb-2 bg-blue-400 p-2">
        <h1 className="text-md lg:text-3xl text-white font-medium mx-auto">Job Details - {decodeURIComponent(slug)}</h1>
        {/* <Image src={logo} alt="logo" className="w-44 object-cover" /> */}
      </div>
      {jobs?.jobs?.filter((job) => job.title ===  decodeURIComponent(slug)).map((job, id) => (
      <>
      <div key={id} className="flex flex-col lg:flex-row px-6 lg:px-20 py-8 gap-10 flex-grow">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <JobDetailCard {...job}/>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <JobSidebar {...job}/>
        </div>
      </div>

        
      <section className="px-6 lg:px-20 pb-12">
        <h3 className="text-xl font-semibold mb-6">Related Jobs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((job, index) => (
            <RelatedJobCard key={index} {...job} />
          ))}
        </div>
      </section>

      <Footer />
      </>
      ))}
    </div>
  );
};

export default JobDetails;
