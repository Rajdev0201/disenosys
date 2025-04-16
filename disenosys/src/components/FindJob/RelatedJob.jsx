import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const RelatedJobCard = ({ title, type, company, location, salary }) => {
    return (
        <div className="bg-white border-2 border-gray-200 shadow-md p-4 rounded-md flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <h2 className="font-semibold text-sm">{title}</h2>
      <div className="text-xs flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-white ${type === 'FULL-TIME' ? 'bg-green-600' : type === 'INTERNSHIP' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
          {type}
        </span>
        <span className="text-gray-500">{salary}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-700">
      <FcGoogle size={20} className="cursor-pointer text-gray-400 hover:text-gray-700"/>
        <span>{company}</span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-[12px]" />
          <span>{location}</span>
        </div>
        <MdAdsClick  className="cursor-pointer text-gray-400 hover:text-gray-700" />
      </div>
    </div>
    );
  };
  
  export default RelatedJobCard;
