"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchCourse } from "../Redux/action/Course.js";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { CiLock, CiUnlock } from "react-icons/ci";
import { payment } from "../Redux/action/Payment.js";

const Recorded = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [feedback, setFeedback] = useState({});
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [unlockedModules, setUnlockedModules] = useState(
    JSON.parse(localStorage.getItem("unlockedModules")) || { 0: true }
  );

  const dispatch = useDispatch();
  const courseRefs = useRef([]);
  const search = useSearchParams();
  const courseId = search.get("courseName");
  console.log(courseId)
  const pay = useSelector((state) => state.payment);
  const id = search.get("id");
  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses;
  
  const router = useRouter();
  
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(payment());
  }, [dispatch]);


  useEffect(() => {
    localStorage.setItem("unlockedModules", JSON.stringify(unlockedModules));
  }, [unlockedModules]);


  
  useEffect(() => {
    if (courses && courses[0]?.Curriculum[0]?.subTopics && !selectedSubtopic) {
      setSelectedSubtopic(courses[0].Curriculum[0].subTopics[0]);
    }
  }, [courses, selectedSubtopic]);
  

  const toggleAccordion = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null); // Close the accordion if it's already open
    } else {
      setOpenAccordionIndex(index); // Open the clicked accordion
  
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
  

  const handleSubtopicSelect = (subTopic) => {
    setSelectedSubtopic(subTopic);
    setShowQuiz(false);
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
            localStorage.setItem("unlockedModules", JSON.stringify(updatedUnlockedModules));

            setTimeout(() => {
                setOpenAccordionIndex(nextModuleIndex);
                setSelectedSubtopic(null);
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
  const isCoursePaid = pay?.data?.some((item) => item._id === id && item.lineItems.some((lineItem) => lineItem.name === courseId && item.isActive));
 console.log(isCoursePaid)
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
                              selectedOptions[`${openAccordionIndex}-${qIdx}`] === option
                            }
                            onChange={() =>
                              handleOptionSelect(openAccordionIndex, qIdx, option)
                            }
                            className="mr-2 "
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {feedback[`${openAccordionIndex}-${qIdx}`] && (
    <p className={`mt-2 text-sm ${feedback[`${openAccordionIndex}-${qIdx}`].color}`}>
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
          selectedSubtopic && (
            <div>
              <h4 className="font-bold text-xl">
                {selectedSubtopic}
              </h4>
              <iframe
                width="100%"
                height="600"
                src="https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dapilmiei&player[showLogo]=false"
                title={selectedSubtopic}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )
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
                <div key={idx} ref={(el) => (courseRefs.current[idx] = el)}>
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left bg-gray-50 my-2 p-2 rounded-md hover:bg-gray-100 flex  items-center justify-between"
                    disabled={!unlockedModules[idx]}
                  >
                    <span className="font-bold text-lg font-poppins">
                      Module-{idx + 1}: {item.title}
                    </span>
                    <span className="text-[#182073]">
                      {unlockedModules[idx] ? <CiUnlock className="text-green-800" size={25}/> : <CiLock  className="text-red-800" size={25}/>}
                    </span>
                  </button>
                  {openAccordionIndex === idx && (
                    <ul className="list-disc space-y-2 px-4">
                      {(Array.isArray(item.subTopics)
                        ? item.subTopics
                        : item.subTopics.split(",")
                      ).map((subTopic, subIdx) => (
                        <li key={subIdx} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 mr-2 w-4 h-4 hover:cursor-pointer"
                            onChange={() => handleSubtopicSelect(subTopic)}
                            checked={selectedSubtopic === subTopic}
                          />
                          <span className="hover:cursor-pointer"  onClick={() => handleSubtopicSelect(subTopic)}>{subTopic.trim()}</span>
                        </li>
                      ))}
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
     )
     :
     (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
    <h2 className="text-2xl font-bold text-red-600 mb-4">Sorry!</h2>
    <p className="text-gray-800 mb-4">
      It seems like you haven&apos;t purchased this course yet. Access to the content is restricted to paid users only. Please do not attempt to bypass access — your learning journey with Disenosys awaits with a simple subscription!
    </p>
    <button
      className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
      onClick={() => router.push('/course')}
    >
      Visit Course
    </button>
  </div>
</div>

     )
    }
    </>
  );
};

export default Recorded;
