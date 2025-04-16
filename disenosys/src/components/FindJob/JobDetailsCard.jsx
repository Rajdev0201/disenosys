import { FcGoogle } from "react-icons/fc";
const JobDetailCard = () => {
    return (
      <div className="bg-white p-6 shadow rounded-md">
        <div className="flex items-center gap-4 mb-4">
        <FcGoogle size={50} className="cursor-pointer text-gray-400 hover:text-gray-700"/>
          <div>
            <h2 className="text-xl font-semibold">Senior UX Designer</h2>
            <p className="text-sm text-gray-500">at Facebook</p>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full mr-2">FULL-TIME</span>
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">Featured</span>
          </div>
        </div>
  
        <div>
          <h4 className="text-md font-medium mb-2">Job Description</h4>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            We&apos;re a Shopify Plus agency, and we partner with brands to help them grow...
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!
          Here at Velstar, we don&apos;t just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.
          </p>
  
          <h4 className="text-md font-medium mb-2">Requirements</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
            <li>Great troubleshooting and analytical skills</li>
            <li>Experience with React, REST APIs, etc.</li>
            {/* Add more */}
          </ul>
  
          <h4 className="text-md font-medium mb-2">Benefits</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Work from home Fridays</li>
            <li>Annual leave, birthday leave</li>
            {/* Add more */}
          </ul>
        </div>
      </div>
    );
  };
  
  export default JobDetailCard;
  