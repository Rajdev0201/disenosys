"use client";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";

const Results = () => {
  const router = useRouter();
  const catiaPercentage = localStorage.getItem("catiaPercentage") || 0;
  const productPercentage = localStorage.getItem("productPercentage") || 0;
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  const catia = clamp(parseInt(catiaPercentage, 10), 0, 100);
  const product = clamp(parseInt(productPercentage, 10), 0, 100);
  const calculateYourScore = (catia, product) => (catia + product) / 2;
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const createStrokeDashoffset = (score) =>
    circumference - (score / 100) * circumference;
  const yourScore = calculateYourScore(catia, product);
  const getCEFRLevel = (score) => {
    if (score < 10) return "A1-Foundation";
    if (score < 30) return "A2-Trainee";
    if (score < 50) return "B1-Practitioner";
    if (score < 75) return "B2-Specialist";
    if (score < 90) return "C1-Expert";
    if (score < 100) return "C2-Master";
  };
  const [showPopup, setShowPopup] = useState(false);

  const getLevelText = (score) => {
    if (score < 10) {
      return (
        <>
          Your score indicates that your level is in the range of{" "}
          <strong>A1 Foundation</strong>, demonstrating a basic understanding of{" "}
          <strong>Automotive Product Development</strong> concepts and
          entry-level skills. You are just starting your journey in this field
          and can further build your knowledge and expertise.
        </>
      );
    }
    if (score < 30) {
      return (
        <>
          Your score indicates that your level is in the range of{" "}
          <strong>A2 Trainee</strong>, showing a fundamental grasp of{" "}
          <strong>Automotive Product Development</strong> with emerging skills
          in design and development. You are progressing but still have room for
          growth to reach higher proficiency levels.
        </>
      );
    }
    if (score < 50) {
      return (
        <>
          Your score indicates that your level is in the range of{" "}
          <strong>B1 Practitioner</strong>, reflecting intermediate proficiency
          in <strong>Automotive Product Development</strong>. You have practical
          skills and a reasonable understanding of software tools and industry
          concepts, but there’s potential for refinement.
        </>
      );
    }
    if (score < 75) {
      return (
        <>
          Your score indicates that your level is in the range of{" "}
          <strong>B2 Specialist</strong>, showcasing solid proficiency in{" "}
          <strong>Automotive Product Development</strong>. You have strong
          domain knowledge and are capable of handling more complex tasks
          independently.
        </>
      );
    }
    if (score < 90) {
      return (
        <>
          Your score indicates that your level is in the range of{" "}
          <strong>C1 Expert</strong>, representing advanced proficiency in{" "}
          <strong>Automotive Product Development</strong>. You exhibit
          exceptional skills, a deep understanding of tools, and expertise that
          allows you to contribute significantly to projects and teams.
        </>
      );
    }
    if (score < 100) {
      return (
        <>
          Your score indicates that your level is in the range of{" "}
          <strong>C2 Master</strong>, denoting unparalleled expertise in{" "}
          <strong>Automotive Product Development</strong>. You possess mastery
          of domain concepts and tools, enabling you to lead projects and
          innovate in the automotive industry.
        </>
      );
    }
  };

  const catiaText = (score) => {
    if (score < 10) {
      return (
        <>
          Your score indicates a basic understanding of <strong>CATIA</strong>.
          You can navigate the interface and create simple sketches but lack
          proficiency in advanced tools and workflows.
        </>
      );
    }
    if (score < 30) {
      return (
        <>
          Your score reflects limited practical experience in{" "}
          <strong>CATIA</strong>. You can perform basic 3D modeling and execute
          guided design tasks with assistance.
        </>
      );
    }
    if (score < 50) {
      return (
        <>
          Your score demonstrates proficiency in executing standard design tasks
          independently in <strong>CATIA</strong>. You are skilled in part
          design, assemblies, and basic surface modeling.
        </>
      );
    }
    if (score < 75) {
      return (
        <>
          Your score indicates strong problem-solving skills in{" "}
          <strong>CATIA</strong>. You can efficiently handle complex designs,
          including advanced surfacing and large assemblies.
        </>
      );
    }
    if (score < 90) {
      return (
        <>
          Your score shows expertise in specialized <strong>CATIA</strong>{" "}
          domains. You can innovate, optimize workflows, and solve intricate
          design challenges independently.
        </>
      );
    }
    if (score < 100) {
      return (
        <>
          Your score represents mastery of <strong>CATIA</strong>. You
          demonstrate visionary skills, lead projects, develop advanced
          solutions, and mentor others to achieve excellence.
        </>
      );
    }
  };

  const productText = (score) => {
    if (score < 10) {
      return (
        <>
          Your score indicates a basic understanding of{" "}
          <strong>Product Development</strong>. You are familiar with
          fundamental concepts but have limited application in real-world
          scenarios.
        </>
      );
    }
    if (score < 30) {
      return (
        <>
          Your score reflects limited practical experience in{" "}
          <strong>Product Development</strong>. You can assist with guided tasks
          like creating simple BOMs or preliminary designs.
        </>
      );
    }
    if (score < 50) {
      return (
        <>
          Your score demonstrates proficiency in executing standard{" "}
          <strong>Product Development</strong> tasks independently. You can
          create production-ready designs following industry guidelines.
        </>
      );
    }
    if (score < 75) {
      return (
        <>
          Your score indicates strong problem-solving skills in{" "}
          <strong>Product Development</strong>. You are adept at complex tasks
          such as DFMEA, GD&T, and integration within development cycles.
        </>
      );
    }
    if (score < 90) {
      return (
        <>
          Your score shows expertise in specialized{" "}
          <strong>Product Development</strong> areas such as BIW, trims, or
          powertrain. You can deliver innovative solutions and improve processes
          effectively.
        </>
      );
    }
    if (score < 100) {
      return (
        <>
          Your score represents mastery in <strong>Product Development</strong>.
          You exhibit visionary skills, lead global projects, set industry
          benchmarks, and mentor teams toward success.
        </>
      );
    }
  };

  // const handleCancel = () => {
  //   setShowPopup(false);
  //   alert("You canceled sharing your score.");
  // };

  const yourLevel = getCEFRLevel(yourScore);
  const explained = getLevelText(yourScore);
  const catiaExplained = catiaText(yourScore);
  const productExplained = productText(yourScore);
  const [level, description] = yourLevel.split(" ");

  console.log("Sharing post with score:", yourScore);
  const [accessToken, setAccessToken] = useState("");
  const [userUrn, setUserUrn] = useState("");
  const [showFetchProfilePopup, setShowFetchProfilePopup] = useState(false);
  const [showSharePostPopup, setShowSharePostPopup] = useState(false);
  const [share,setShare] = useState(false)
  const link = "https://www.disenosys.com/quicktest";
  // Start the LinkedIn OAuth flow

  useEffect(() => {
    if (!accessToken && !share) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [accessToken]);

  const startLinkedInAuth = async () => {
    try {
      const { data } = await axios.get(
        "https://disenosys-1.onrender.com/exam/auth"
      );
      window.location.href = data.url;
    } catch (error) {
      console.error("Error starting LinkedIn auth:", error);
    }
  };

  // Exchange authorization code for an access token
  const exchangeCodeForToken = async (code) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-1.onrender.com/exam/get-access-token",
        {
          code,
        }
      );

      if (data && data.accessToken) {
        setAccessToken(data.accessToken);
        alert("Access token obtained successfully!");
        setShowFetchProfilePopup(true);
      } else {
        console.error("Access token not obtained");
      }
    } catch (error) {
      console.error(
        "Error exchanging code for token:",
        error.response?.data || error.message
      );
    }
  };

  const getProfile = async () => {
    if (!accessToken) return;

    try {
      const { data } = await axios.get(
        "https://disenosys-1.onrender.com/exam/profile",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setUserUrn(data.profile.sub);
      console.log("Profile data:", data.profile.sub);
      setShowFetchProfilePopup(false);
      setShowSharePostPopup(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  //   if (!accessToken || !userUrn) {
  //     alert("Please fetch your profile first!");
  //     return;
  //   }

  //   const postBody = {
  //     author: `urn:li:person:${userUrn}`,
  //     lifecycleState: "PUBLISHED",
  //     specificContent: {
  //       "com.linkedin.ugc.ShareContent": {
  //         shareCommentary: {
  //           text: `I scored ${yourScore}% in my recent quiz! #quiz #Learning`,
  //         },
  //         shareMediaCategory: "ARTICLE",
  //         media: [
  //           {
  //             status: "READY",
  //             description: {
  //               text: "Check out my score and learn more about automotive design quiz.",
  //             },
  //             originalUrl: "https://www.disenosys.com/quicktest",
  //             title: {
  //               text: "CEFR Quiz Score",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
  //   };

  //   try {
  //     await axios.post(
  //       "https://disenosys-1.onrender.com/exam/share",
  //       postBody,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     );
  //     alert("Post shared successfully!");
  //     setShowSharePostPopup(false);
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Error sharing post:", error);
  //   }
  // };

  const sharePost = async () => {
    const imageUrl = "https://via.placeholder.com/800x400.png?text=Dummy+Image";

    const postBody = {
      imageUrl: imageUrl, // Image URL to be sent to the backend
      // commentary: `I scored ${yourScore}% in my recent automotive product development quiz! #quiz #Learning ${link}`,
      commentary: `Exciting Milestone Achieved!

I am thrilled to share that I have successfully completed the Global Product Development Excellence (GPDX) exam with a score of ${yourScore}%!

The GPDX exam serves as a powerful tool for evaluating CATIA proficiency and product development knowledge. It's an excellent way for students and professionals to showcase their abilities to potential employers, particularly in an industry that increasingly values skilled automotive designers.

A special thank you to #Disenosys for providing this opportunity. Their dedication to bridging the skills gap in automotive design has been instrumental in advancing careers and developing industry-ready professionals.

Take up the mock GPDX exam here: ${link}

#GPDX #automotive #design #exam #CATIA`,
      userUrn: userUrn,
      yourScore: yourScore,
      yourlevel: yourLevel,
    };

    try {
      // Send the post data to your backend
      await axios.post(
        "https://disenosys-1.onrender.com/exam/share",
        postBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Post shared successfully with image!");
      // router.push("/results");
      // setAccessToken("")
      setShowSharePostPopup(false);
      setShare(true);
    } catch (error) {
      console.error("Error sharing post with image:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  return (
    <>
      <Head>
        <meta property="og:title" content="Take the CEFR Quiz!" />
        <meta
          property="og:description"
          content="Find out your CEFR level by taking this quick quiz!"
        />
        <meta
          property="og:image"
          content="https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fl.8f3043b1.jpg&w=3840&q=75"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://www.disenosys.com/quicktest" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-blue-100 flex justify-center items-center font-poppins lg:p-4">
        <div className="grid lg:grid-cols-2 w-full max-w-4xl">
          <div className="flex flex-col items-center bg-white rounded-md shadow-md lg:ml-24  lg:w-80 lg:h-96">
            <div className="bg-[#182073] w-full p-6 text-center flex flex-col items-center">
              <p className="text-lg font-semibold text-white">Your Score:</p>
              <p className="text-xl font-bold text-white">{yourLevel}</p>
              <div className="flex items-center justify-center w-28 h-28 mt-5">
                <svg
                  height={radius * 2}
                  width={radius * 2}
                  className="absolute transform -rotate-90"
                >
                  <circle
                    stroke="gray"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <circle
                    stroke="orange"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={createStrokeDashoffset(yourScore)}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                </svg>
                <span className="text-3xl font-bold text-white">
                  {yourScore}%
                </span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-md mb-2 font-bold font-poppins">
                Share your score
              </p>
              <div className="flex space-x-2 justify-center mb-4 lg:mb-0">
                <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-transform transform hover:scale-110">
                  <FaFacebook className="w-6 h-6" />
                </button>
                {!accessToken || accessToken ? (
                  <button
                    className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-transform transform hover:scale-110"
                    onClick={startLinkedInAuth}
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </button>
                ) : (
                  <>
                    {showFetchProfilePopup && (
                      <div className="fixed top-0 left-0 right-0 font-poppins bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded-md text-gray-800 shadow-md max-w-sm w-full">
                          <h2 className="text-lg font-bold text-gray-600 mb-4">
                          Just One More Step Ahead to Show the World You Are an Improved Design Engineer!
                          </h2>
                          <button
                            onClick={getProfile}
                            className="bg-[#182073] hover:bg-blue-700 text-white font-medium py-2 px-4 mt-4 rounded-md"
                          >
                            Continue 
                          </button>
                        </div>
                      </div>
                    )}

                    {showSharePostPopup && (
                      <div className="fixed top-0 left-0 right-0 font-poppins bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded-md shadow-md max-w-sm w-full">
                        <span className="font-bold text-xl text-green-400">Confirmation</span>
                          <h2 className="text-lg text-gray-600 font-bold mb-4">
                           Nicely done! The post is ready to reach your network.
                          </h2>
                          <div className="flex justify-center">
                          <button
                            onClick={sharePost}
                            className="bg-[#182073] gap-2 flex items-center hover:bg-blue-700 text-white font-medium py-2 mt-4 px-4 rounded-md"
                          >
                            Share Post<FaLinkedin className="w-5 h-5" />
                          </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-transform transform hover:scale-110">
                  <FaWhatsappSquare className="w-6 h-6" />
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-transform transform hover:scale-110">
                  <IoLinkSharp className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {showPopup && !accessToken && (
            <div className="fixed inset-0 bg-black bg-opacity-50 font-poppins flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Show Off Your Achievement
                </h2>
                <p className="text-gray-600 mb-6">
                  Share your GPDX score on LinkedIn now and let the world know
                  you&apos;re advancing in the automotive industry!
                </p>
                <div className="flex justify-center">
                  <button
                    className="bg-[#182073] text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={startLinkedInAuth}
                  >
                    Continue
                  </button>
                  {/* <button
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                onClick={handleCancel}
              >
                Cancel
              </button> */}
                </div>
              </div>
            </div>
          )}

          {/* Column 2 */}
          <div className="space-y-6 mt-1 lg:mt-0 lg:w-[500px]">
            {/* Your Score Explained */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-semibold">Your score explained</h3>
              <p className="text-sm text-gray-600 mt-2">{explained}</p>
            </div>

            {/* Reading and Listening Scores */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <div className="mb-4">
                <div className="flex justify-between items-center gap-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center w-20 h-20 mt-2">
                      <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="absolute transform -rotate-90"
                      >
                        <circle
                          stroke="gray"
                          fill="transparent"
                          strokeWidth={stroke}
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                        <circle
                          stroke="orange"
                          fill="transparent"
                          strokeWidth={stroke}
                          strokeDasharray={circumference}
                          strokeDashoffset={createStrokeDashoffset(catia)}
                          strokeLinecap="round"
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                      </svg>
                      <span className="text-2xl font-bold text-orange-600">
                        {catia}%
                      </span>
                    </div>
                    <div className="flex text-center">
                      <span className="font-bold text-md font-poppins mt-3">
                        {level}
                      </span>
                      <span className="font-bold text-md font-poppins">
                        {description}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-orange-600">
                      CATIA Score
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {catiaExplained}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center gap-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center w-20 h-20  mt-2">
                      <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="absolute transform -rotate-90"
                      >
                        <circle
                          stroke="gray"
                          fill="transparent"
                          strokeWidth={stroke}
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                        <circle
                          stroke="orange"
                          fill="transparent"
                          strokeWidth={stroke}
                          strokeDasharray={circumference}
                          strokeDashoffset={createStrokeDashoffset(product)}
                          strokeLinecap="round"
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                      </svg>
                      <span className="text-2xl font-bold text-orange-600">
                        {product}%
                      </span>
                    </div>
                    <div className="flex text-center">
                      <span className="font-bold text-md font-poppins  mt-3">
                        {level}
                      </span>
                      <span className="font-bold text-md font-poppins">
                        {description}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-orange-600">
                      Product Development Score
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {productExplained}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Comparison Table */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                Score comparison table
              </h3>
              <div className="grid grid-cols-4 text-center">
                <div>
                  <p className="font-bold text-gray-600">Level</p>
                  <p className="text-gray-600">BF SET</p>
                </div>
                <div>
                  <p className="font-bold text-gray-600">Level</p>
                  <p className="text-gray-600">0-30%</p>
                </div>
                <div>
                  <p className="font-bold text-gray-600">Intermediate</p>
                  <p className="text-gray-600">31-75%</p>
                </div>
                <div>
                  <p className="font-bold text-gray-600">Advanced</p>
                  <p className="text-gray-600">76-100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
