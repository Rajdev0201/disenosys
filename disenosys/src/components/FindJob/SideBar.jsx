import { CiCalendar } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaRegMap, FaTwitter, FaWallet } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";
import { TfiTimer } from "react-icons/tfi";

const JobSidebar = ({ 
  title,
  type,
  level,
  companyName,
  location,
  salary,
  load,}) => {

    const formatSalaryRangeAfterTax = (salaryString) => {
      const match = salaryString.match(/(\d+(\.\d+)?)\s*lakh/i);
      if (!match) return salaryString;
  
      const annualSalary = parseFloat(match[1]) * 100000;
  
      // Simple tax calculation (New Regime FY 2024–25)
      const calculateTax = (income) => {
        let tax = 0;
  
        const slabs = [
          { limit: 300000, rate: 0 },
          { limit: 600000, rate: 0.05 },
          { limit: 900000, rate: 0.1 },
          { limit: 1200000, rate: 0.15 },
          { limit: 1500000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ];
  
        let previousLimit = 0;
        for (const slab of slabs) {
          if (income > slab.limit) {
            tax += (slab.limit - previousLimit) * slab.rate; // 3lakh - 0 * 0 = 0 , 5>6
            previousLimit = slab.limit;
          } else {
            tax += (income - previousLimit) * slab.rate; // 5 - 3 * 0.5
            break;
          }
        }
  
        return tax;
      };
  
      const annualTax = calculateTax(annualSalary);
      const annualInHand = annualSalary - annualTax;
      const lowMonthly = Math.round((annualInHand / 12) * 0.9);
      const highMonthly = Math.round(annualInHand / 12);
  
      const formatINR = (amount) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(amount);
  
      return `${formatINR(lowMonthly)} - ${formatINR(highMonthly)}`;
    };


    return (
      <div className="bg-white p-6 shadow-md border-2 border-gray-200 rounded-md space-y-4 lg:sticky top-12">
        <a href="#" className="block w-full text-center bg-blue-600 text-white py-2 rounded-md font-medium">Apply Now</a>
  
        <div className="grid grid-cols-2 gap-4 text-sm ">
          <div className="border-r-2 border-r-gray-200 space-y-1 flex flex-col items-center">
            <p className="text-gray-400">Salary (USD)</p>
            <p className="font-semibold text-green-600">{salary}</p>
            <p className="text-gray-400">Yearly salary</p>
          </div>
          <div className="space-y-1 flex flex-col items-center">
          <FaRegMap size={30} color="blue"/>
            <p className="text-gray-400">Job Location</p>
            <p>{location}</p>
          </div>
        </div>
  
        <div className="border-t pt-4 space-y-2">
            <h3 className="font-medium text-gray-800 text-lg">Job Overview</h3>
           <div className="grid grid-cols-2 gap-4">
           <div className="flex flex-col items-start"> 
           <CiCalendar size={30} color="blue"/>
            <p className="text-gray-400">JOB POSTED:</p>
            <p className="text-gray-800">14 Jan, 2024</p>
            </div>
            <div className="flex flex-col items-start"> 
            <TfiTimer size={30} color="blue"/>
            <p className="text-gray-400">JOB EXPIRE IN:</p>
            <p className="text-gray-800">14 Jan, 2024</p>
            </div>
            <div className="flex flex-col items-start">
            <SiLevelsdotfyi size={30} color="blue" />
            <p className="text-gray-400">JOB LEVEL:</p>
            <p className="text-gray-800">{level}</p>
            </div>
            <div className="flex flex-col items-start"> 
            <FaWallet  size={30} color="blue"/>
            <p className="text-gray-400">EXPERIENCE:</p>
            <p className="text-gray-800">{formatSalaryRangeAfterTax(salary)}</p>
            </div>
          </div>
        </div>
  
        <div className="pt-4 border-t">
          <p className="text-gray-500 text-sm mb-2">Share this job:</p>
          <div className="flex gap-4 items-center">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-400/20 border border-blue-500 text-blue-600 hover:bg-blue-50 transition duration-150">
        <PiLinkSimpleBold size={18} />
        <span className="text-sm font-semibold">Copy Link</span>
      </button>

      {/* Social Buttons */}
      <div className="flex gap-2">
        <button className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition">
          <FaFacebookF size={14} className="text-blue-500" />
        </button>
        <button className="p-2 rounded-full bg-sky-500/10 hover:bg-sky-500/20 transition">
          <FaTwitter size={14} className="text-sky-500" />
        </button>
        <button className="p-2 rounded-full bg-blue-700/10 hover:bg-blue-700/20 transition">
          <FaLinkedinIn size={14} className="text-blue-700" />
        </button>
      </div>
    </div>
        </div>
      </div>
    );
  };
  
  export default JobSidebar;
  