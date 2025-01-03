"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchCourse } from "../Redux/action/Course.js";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { CiLock, CiUnlock } from "react-icons/ci";
import { payment } from "../Redux/action/Payment.js";
import { PiCheckCircleFill, PiVideoFill } from "react-icons/pi";
import "../home/Home.css";

const Recorded = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentSubTopicIndex, setCurrentSubTopicIndex] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [subLink, setSubLink] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [unlockedModules, setUnlockedModules] = useState(
    JSON.parse(localStorage.getItem("unlockedModules")) || { 0: true }
  );
  const [completedVideos, setCompletedVideos] = useState({});

  const dispatch = useDispatch();
  const courseRefs = useRef([]);
  const search = useSearchParams();
  const courseId = search.get("courseName");
  const pay = useSelector((state) => state.payment);
  const id = search.get("id");
  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses;
  // console.log("courses:", courses);

  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("completedVideos");
    if (storedData) {
      setCompletedVideos(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(payment());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("unlockedModules", JSON.stringify(unlockedModules));
  }, [unlockedModules]);

  useEffect(() => {
    if (courses && courses[0]?.Curriculum[0]?.subTopic && !selectedSubtopic) {
      setSelectedSubtopic(courses[0]?.Curriculum[0]?.subTopic[0]);
      setSubLink(courses[0]?.Curriculum[0]?.subLinks[0] || null);
      setCurrentSubTopicIndex(0);
    }
  }, [courses, selectedSubtopic]);

  const toggleAccordion = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);

      setTimeout(() => {
        const targetElement = courseRefs.current[index];

        if (targetElement) {
          // Scroll the section into view with smooth behavior
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Scroll to the first subtopic after the section is in view
          const firstSubtopic = targetElement.querySelector("li"); // Adjust to target the first subtopic
          if (firstSubtopic) {
            const offset = firstSubtopic.getBoundingClientRect().top; // Get the position of the first subtopic
            const scrollPosition = window.scrollY + offset - 200; // Adjust this value (-80) for the desired offset

            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
          }
        }
      }, 100);
    }
  };

  const handlesubTopicelect = (subTopic, subLink, index) => {
    console.log("Selected subTopic:", subTopic);
    console.log("Selected subLink:", subLink);
    setSelectedSubtopic(subTopic);
    setCurrentSubTopicIndex(index);
    setSubLink(subLink);
    setShowQuiz(false);
  };


  const nextVideo = () => {
    const currentCourse = courses?.find((course) => course?.courseName === courseId);
  
    if (!currentCourse || !currentCourse.Curriculum) {
      console.error("No course or curriculum found.");
      alert("No course or curriculum found.");
      return;
    }
    console.log("Available Curriculums:", currentCourse?.Curriculum);
    const currentCurriculum = currentCourse?.Curriculum.find((curriculum) => {
      const subTopicsArray = curriculum?.subTopic?.split(",").map(item => item.trim());
      console.log("Subtopics in curriculum:", subTopicsArray); 
  
      return subTopicsArray?.includes(selectedSubtopic);
    });
  
    if (!currentCurriculum) {
      console.error("Current curriculum is undefined for the selected subtopic:", selectedSubtopic);
      alert("click on the first topic or previous topic in your current module and continue");
      return;
    }
  
    console.log("Current Curriculum:", currentCurriculum);

    const subTopicsArray = currentCurriculum?.subTopic?.split(",").map(item => item.trim());
    const subLinksArray = currentCurriculum?.subLinks?.split(",").map(item => item.trim());
  
    if (!subTopicsArray || !subLinksArray) {
      console.error("Subtopics or links are missing in the current curriculum.");
      alert("Subtopics or links are missing.");
      return;
    }
  
    const currentSubTopicIndex = subTopicsArray.indexOf(selectedSubtopic);
  
    if (currentSubTopicIndex === -1) {
      console.error("Selected subtopic not found in the list of subtopics.");
      alert("Selected subtopic not found.");
      return;
    }

    const nextSubTopicIndex = currentSubTopicIndex + 1;
  
    if (nextSubTopicIndex >= subTopicsArray?.length) {
      console.warn("No more subtopics available.");
      alert("No more subtopics available.");
      return;
    }
  
    setCurrentSubTopicIndex(nextSubTopicIndex);
    setSelectedSubtopic(subTopicsArray[nextSubTopicIndex]);
    setSubLink(subLinksArray[nextSubTopicIndex]);
  
    console.log("Next Subtopic:", subTopicsArray[nextSubTopicIndex]);
    console.log("Next SubLink:", subLinksArray[nextSubTopicIndex]);
  };
  
  
  
  
  

  const handleVideoEnd = () => {
    setCompletedVideos((prev) => {
      const updatedVideos = {
        ...prev,
        [selectedSubtopic]: true,
      };
      localStorage.setItem("completedVideos", JSON.stringify(updatedVideos));
      return updatedVideos;
    });
    nextVideo();
  };



  
  

  const showQuizSection = () => {
    setShowQuiz(true);
    setSelectedSubtopic(null);
  };

  const handleOptionSelect = (moduleIndex, questionIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [`${moduleIndex}-${questionIndex}`]: option,
    }));
  };

  const handleQuizSubmit = () => {
    const currentModule = openAccordionIndex;
    const moduleQuestions = quizData[currentModule];
    const newFeedback = {};

    let allCorrect = true;

    moduleQuestions.forEach((question, questionIndex) => {
      const selected = selectedOptions[`${currentModule}-${questionIndex}`];
      const isCorrect = selected === question.correctAnswer;

      newFeedback[`${currentModule}-${questionIndex}`] = isCorrect
        ? { message: "Correct!", color: "text-green-600" }
        : { message: "Wrong answer.", color: "text-red-600" };

      if (!isCorrect) allCorrect = false;
    });

    setFeedback(newFeedback);

    const allQuestionsAnswered = moduleQuestions.every(
      (_, index) => selectedOptions[`${currentModule}-${index}`] !== undefined
    );

    if (allQuestionsAnswered) {
      if (allCorrect) {
        const nextModuleIndex = currentModule + 1;
        const updatedUnlockedModules = {
          ...unlockedModules,
          [nextModuleIndex]: true,
        };

        setUnlockedModules(updatedUnlockedModules);
        localStorage.setItem(
          "unlockedModules",
          JSON.stringify(updatedUnlockedModules)
        );

        setTimeout(() => {
          setOpenAccordionIndex(nextModuleIndex);
          setSelectedSubtopic(null);
          setSubLink(null);
          setShowQuiz(false);
          setFeedback({});
          setSelectedOptions({});
        }, 5000);
      } else {
        alert("Please answer all questions correctly to proceed.");
      }
    } else {
      alert("Please answer all questions before proceeding.");
    }
  };

  const quizData = [
    [
      {
        question: "Question 1 for Module 1?",
        options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
      {
        question: "Question 2 for Module 1?",
        options: ["Correct Answer", "Wrong 1", "Wrong 2", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
    ],

    [
      {
        question: "Question 1 for Module 1?",
        options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
      {
        question: "Question 2 for Module 1?",
        options: ["Correct Answer", "Wrong 1", "Wrong 2", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
    ],

    [
      {
        question: "Question 1 for Module 1?",
        options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
      {
        question: "Question 2 for Module 1?",
        options: ["Correct Answer", "Wrong 1", "Wrong 2", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
    ],

    [
      {
        question: "Question 1 for Module 1?",
        options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
      {
        question: "Question 2 for Module 1?",
        options: ["Correct Answer", "Wrong 1", "Wrong 2", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
    ],

    [
      {
        question: "Question 1 for Module 1?",
        options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
      {
        question: "Question 2 for Module 1?",
        options: ["Correct Answer", "Wrong 1", "Wrong 2", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
    ],
  ];
  const isCoursePaid = pay?.data?.some(
    (item) =>
      item._id === id &&
      item.lineItems.some(
        (lineItem) => lineItem.name === courseId && item.isActive
      )
  );
  console.log(isCoursePaid);
  return (
    <>
      {isCoursePaid ? (
        <div className="">
          {courses && (
            <div className="py-2 bg-[#182073] text-[#182073] rounded-md">
              <div className="p-3">
                <h3 className="text-2xl text-center font-bold text-white">
                  {courseId}
                </h3>
              </div>
            </div>
          )}
          <div className="flex">
            <div className="col-span-9 bg-white p-4 shadow-md rounded-md ml-1/4 w-3/4">
              {showQuiz ? (
                <div>
                  <h4 className="font-bold text-xl">Quiz</h4>
                  <ul className="list-disc space-y-2 px-1">
                    {quizData[openAccordionIndex]?.map((question, qIdx) => (
                      <li key={qIdx} className="my-4">
                        <p>{question.question}</p>
                        <ul className="space-y-1">
                          {question.options.map((option, optIdx) => (
                            <li key={optIdx} className="flex items-center">
                              <label className="flex items-center ">
                                <input
                                  type="radio"
                                  name={`quiz-${openAccordionIndex}-${qIdx}`}
                                  value={option}
                                  checked={
                                    selectedOptions[
                                      `${openAccordionIndex}-${qIdx}`
                                    ] === option
                                  }
                                  onChange={() =>
                                    handleOptionSelect(
                                      openAccordionIndex,
                                      qIdx,
                                      option
                                    )
                                  }
                                  className="mr-2 "
                                />
                                {option}
                              </label>
                            </li>
                          ))}
                        </ul>
                        {feedback[`${openAccordionIndex}-${qIdx}`] && (
                          <p
                            className={`mt-2 text-sm ${
                              feedback[`${openAccordionIndex}-${qIdx}`].color
                            }`}
                          >
                            {feedback[`${openAccordionIndex}-${qIdx}`].message}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleQuizSubmit}
                    className="bg-[#182073] text-white p-2 mt-4 rounded font-poppins"
                  >
                    Submit Quiz
                  </button>
                </div>
              ) : (
             <div className="video-container">
                {selectedSubtopic && subLink ? (
                    <div>
                      <h4 className="font-bold text-xl">{selectedSubtopic}</h4>
                      <video
                        key={subLink}
                        width="100%"
                        height="600px"
                        controls
                        onEnded={handleVideoEnd}
                        disablePictureInPicture
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <source src={subLink} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                  <p className="font-bold text-lg text-red-500 min-h-screen text-center flex justify-center">Plesae select your curriculum and watch the videos</p>
                )}
              </div>
              )}
            </div>

            <div className="col-span-3 h-screen overflow-y-auto p-4 bg-gray-100 w-1/4 sticky top-0">
              <h1 className="text-[#182073] font-bold text-xl sm:text-2xl md:text-3xl font-poppins">
                Course Curriculum
              </h1>
              {courses
                ?.filter((course) => course.courseName === courseId)
                ?.map((course, courseIdx) => (
                  <div key={courseIdx}>
                    {course?.Curriculum?.map((item, idx) => (
                      <div
                        key={idx}
                        ref={(el) => (courseRefs.current[idx] = el)}
                      >
                        <button
                          onClick={() => toggleAccordion(idx)}
                          className="w-full text-left bg-gray-50 my-2 p-2 rounded-md hover:bg-gray-100 flex items-center justify-between"
                          disabled={!unlockedModules[idx]}
                        >
                          <span className="font-bold text-lg font-poppins">
                            Module-{idx + 1}: {item.title}
                          </span>
                          <span className="text-[#182073]">
                            {unlockedModules[idx] ? (
                              <CiUnlock className="text-green-800" size={25} />
                            ) : (
                              <CiLock className="text-red-800" size={25} />
                            )}
                          </span>
                        </button>
                        {openAccordionIndex === idx && (
                          <ul className="list-disc space-y-2 px-4 w-full">
                            {(Array.isArray(item.subTopic)
                              ? item?.subTopic
                              : item?.subTopic?.split(",")
                            )?.map((subTopic, subIdx) => {
                              const subLink = Array.isArray(item.subLinks)
                                ? item.subLinks[subIdx]
                                : item?.subLinks?.split(",")[subIdx];
                              return (
                                <li key={subIdx} className="flex items-center">
                                  <div className="flex items-center gap-2 w-full h-12">
                                    <PiVideoFill className="w-6 h-6" />
                                    <span
                                      className="hover:cursor-pointer flex items-center flex-1 text-gray-700 hover:text-blue-700 font-poppins"
                                      onClick={() =>
                                        handlesubTopicelect(
                                          subTopic,
                                          subLink,
                                          subIdx
                                        )
                                      }
                                    >
                                      {subTopic.trim()}

                                      {completedVideos[subTopic] && (
                                        <PiCheckCircleFill className="text-green-500 ml-2 w-6 h-6 absolute right-8" />
                                      )}
                                    </span>
                                  </div>
                                </li>
                              );
                            })}

                            <button
                              onClick={showQuizSection}
                              className="text-blue-600 mt-4 underline"
                            >
                              Take Quiz
                            </button>
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Sorry!</h2>
            <p className="text-gray-800 mb-4">
              It seems like you haven&apos;t purchased this course yet. Access
              to the content is restricted to paid users only. Please do not
              attempt to bypass access — your learning journey with Disenosys
              awaits with a simple subscription!
            </p>
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
              onClick={() => router.push("/course")}
            >
              Visit Course
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Recorded;
