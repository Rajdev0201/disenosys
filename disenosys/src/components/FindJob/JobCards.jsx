import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const JobCard = ({
  title,
  type,
  companyName,
  location,
  salary,
  logo,
  fun,
}) => {
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
    <>
    <div
      className="bg-white border-2 border-gray-200 shadow-md p-4 rounded-md flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => fun(title)}
    >
      <h2 className="font-semibold text-sm">{title}</h2>
      <div className="text-xs flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded text-white ${
            type === "Full-Time"
              ? "bg-green-600"
              : type === "Internship"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        >
          {type}
        </span>
        <span className="text-gray-500">
          {formatSalaryRangeAfterTax(salary)}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-700">
        <img
          src={logo}
          className="cursor-pointer text-gray-400  hover:text-gray-700 h-12 w-12 "
        />
        <span>{companyName}</span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-[12px]" />
          <span>{location}</span>
        </div>
        <MdAdsClick className="cursor-pointer text-gray-400 hover:text-gray-700" />
      </div>
    </div>
    
    </>
  );
};

export default JobCard;
