import { CheckOut, Payment } from "@/app/Redux/action/createJob";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaRegMap,
  FaWallet,
  FaWhatsapp,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaXTwitter } from "react-icons/fa6";
import { IoRemoveCircle } from "react-icons/io5";
import { PiLinkSimpleBold } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";
import { TfiTimer } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const JobSidebar = ({
  level,
  jobPosted,
  jobExpire,
  location,
  salary,
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
  const dispatch = useDispatch();
  const title = "Job Application";
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [subscripeModel,setSubscripeModel] = useState(false)
  const {payment} = useSelector((state) => state.jobs); 
  const [tempUserData, setTempUserData] = useState({ name: "", email: "" });
  const amount = 200;
  const getUserName = localStorage.getItem("premium-applied");

  const router = useRouter();
  useEffect(() => {
    dispatch(Payment())
  },[dispatch,getUserName])


  const handleApplyNow = () => {
    if (!userData) {
      setModalOpen(true);
      return;
    }
  
    const Data = {
      userData,
      cartItems: { title, amount },
    };

    dispatch(CheckOut(Data));
  };

  const handleNext = () => {
    if (!tempUserData.name || !tempUserData.email) {
      toast.error("Please fill in all fields.");
      setModalOpen(true);
      return;
    }
  
    const matchedUser = payment?.find(
      (item) =>
        item?.customerDetails?.email === tempUserData.email &&
        item?.customerDetails?.name === tempUserData.name
    );
  
    if (matchedUser) {
      const appliedCount = matchedUser?.appliedCount || 0;
  
      // ✅ Redirect directly if already paid and eligible
      if (appliedCount < 5) {
        const sessionID = matchedUser?.sessionId || matchedUser?._id;
        toast.success("Redirecting to job form.");
        router.push(`/premium-form?orderId=${sessionID}`);
        return;
      }else{
        toast.warning("You have already applied for 5 jobs.");
        toast.info("Please subscribe to apply for more jobs.");
      }
    }
  
    // Otherwise, open 2nd modal to continue payment
    setModalOpen(false);
    setSubscripeModel(true);
  };
  

  const handleModalSubmit = () => {
    if (!tempUserData.name || !tempUserData.email) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    const matchedUser = payment?.find(
      (item) =>
        item?.customerDetails?.email === tempUserData.email &&
        item?.customerDetails?.name === tempUserData.name
    );
  
    setUserData(tempUserData);
    setModalOpen(false);
  
    if (matchedUser) {
      const appliedCount = matchedUser?.appliedCount || 0;
      const expiredAt =  matchedUser?.expiredAt;
      // Get the session ID from the matched user
      const sessionID = matchedUser?.sessionId || matchedUser?._id;
  
      if (appliedCount < 5 && expiredAt === false) {
        toast.success("Redirecting to job form.");
        router.push(`/premium-form?orderId=${sessionID}`);
        return;
      }
    }
  
    // If not eligible or no matched user, open payment checkout
    dispatch(
      CheckOut({
        userData: tempUserData,
        cartItems: { title, amount },
      })
    );
  };
  

  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const jobUrl = window.location.href;
  const handleShare = (platform) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          jobUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          jobUrl
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          jobUrl
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(jobUrl)}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="bg-white p-6 shadow-md border-2 border-gray-200 rounded-md space-y-4 lg:sticky top-0">
      
      <button
        className="block w-full text-center bg-blue-600 text-white py-2 rounded-md font-medium"
        onClick={handleApplyNow}
      >
      Apply Now
        
      </button>
      {modalOpen && (
        <div className="fixed inset-0 top-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
          <div className="bg-white p-6 rounded-lg w-80 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Enter Details</h2>
              <button onClick={() => setModalOpen(false)}>
                <IoRemoveCircle size={20} className="text-red-500" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Name"
              value={tempUserData.name}
              onChange={(e) =>
                setTempUserData({ ...tempUserData, name: e.target.value })
              }
              className="w-full p-2 border rounded-md outline-none border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <input
              type="mail"
              placeholder="Email"
              value={tempUserData.email}
              onChange={(e) =>
                setTempUserData({ ...tempUserData, email: e.target.value })
              }
              className="w-full p-2 border rounded-md outline-none border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-2 rounded-md "
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {subscripeModel && (
        <div className="fixed inset-0 top-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
          <div className="bg-white p-6 rounded-lg w-80 space-y-4">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Subscription</h2>
              <button onClick={() => setSubscripeModel(false)}>
                <IoRemoveCircle size={20} className="text-red-500" />
              </button>
            </div>
            <div class="rounded-2xl shadow-lg p-3 bg-indigo-500 text-gray-600 max-w-xs">
              <div class="relative flex flex-col items-center p-5 pt-10 bg-blue-100 rounded-xl">
                <span class="mt-[-12px] absolute top-0 right-0 flex items-center bg-indigo-500 rounded-l-full py-2 px-3 text-xl font-semibold text-amber-100">
                 ₹200 <small class="text-xs ml-1 text-white">/ month</small>
                </span>
                <p class="text-xl font-semibold text-blue-800 bg-indigo-200 px-2 py-1 rounded-lg">
                  Professional
                </p>
                <p class="text-center mt-3">
                  This plan is for those who have a team already and running a
                  large business.
                </p>
                <ul class="flex flex-col space-y-3 mt-4">
                  <li class="flex items-center space-x-2">
                    <span class="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span>
                      <strong class="font-semibold text-gray-800">20</strong>{" "}
                      team members
                    </span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span>
                      Plan
                      <strong class="font-semibold text-gray-800">
                        team meetings
                      </strong>
                    </span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span>File sharing</span>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleModalSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md "
            >
              Subscripe Now
            </button>
            </div>
            </div>
      )}
      <div className="grid grid-cols-2 gap-4 text-sm ">
        <div className="border-r-2 border-r-gray-200 space-y-1 flex flex-col items-center">
          <p className="text-gray-400">Salary (CTC)</p>
          <p className="font-semibold text-green-600">{salary}</p>
          <p className="text-gray-400">Yearly salary</p>
        </div>
        <div className="space-y-1 flex flex-col items-center">
          <FaRegMap size={30} color="blue" />
          <p className="text-gray-400">Job Location</p>
          <p>{location}</p>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="font-medium text-gray-800 text-lg">Job Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start">
            <CiCalendar size={30} color="blue" />
            <p className="text-gray-400">JOB POSTED:</p>
            <p className="text-gray-800">{jobPosted}</p>
          </div>
          <div className="flex flex-col items-start">
            <TfiTimer size={30} color="blue" />
            <p className="text-gray-400">JOB EXPIRE IN:</p>
            <p className="text-gray-800">{jobExpire}</p>
          </div>
          <div className="flex flex-col items-start">
            <SiLevelsdotfyi size={30} color="blue" />
            <p className="text-gray-400">JOB LEVEL:</p>
            <p className="text-gray-800">{level}</p>
          </div>
          <div className="flex flex-col items-start">
            <FaWallet size={30} color="blue" />
            <p className="text-gray-400">Pay:</p>
            <p className="text-gray-800">{formatSalaryRangeAfterTax(salary)}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-gray-500 text-sm mb-2">Share this job:</p>

        <div className="flex gap-4 items-center">
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-400/20 border border-blue-500 text-blue-600 hover:bg-blue-50 transition duration-150"
          >
            <PiLinkSimpleBold size={18} />
            <span className="text-sm font-semibold">Copy Link</span>
          </button>

          {/* Social Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleShare("facebook")}
              className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition"
            >
              <FaFacebookF size={14} className="text-blue-500" />
            </button>

            <button
              onClick={() => handleShare("twitter")}
              className="p-2 rounded-full bg-sky-500/10 hover:bg-sky-500/20 transition"
            >
              <FaXTwitter size={14} className="text-sky-500" />
            </button>

            <button
              onClick={() => handleShare("linkedin")}
              className="p-2 rounded-full bg-blue-700/10 hover:bg-blue-700/20 transition"
            >
              <FaLinkedinIn size={14} className="text-blue-700" />
            </button>

            <button
              onClick={() => handleShare("whatsapp")}
              className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 transition"
            >
              <FaWhatsapp size={14} className="text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSidebar;
