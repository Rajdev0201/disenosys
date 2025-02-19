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
  const [selectedCurriculumIdx, setSelectedCurriculumIdx] = useState(null);

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
  console.log(selectedOptions); // Logs the updated state after every change
}, [selectedOptions]);
console.log(selectedOptions)

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
    const currentCourse = courses?.find(
      (course) => course?.courseName === courseId
    );

    if (!currentCourse || !currentCourse.Curriculum) {
      console.error("No course or curriculum found.");
      alert("No course or curriculum found.");
      return;
    }
    console.log("Available Curriculums:", currentCourse?.Curriculum);
    const currentCurriculum = currentCourse?.Curriculum.find((curriculum) => {
      const subTopicsArray = curriculum?.subTopic
        ?.split(",")
        .map((item) => item.trim());
      console.log("Subtopics in curriculum:", subTopicsArray);

      return subTopicsArray?.includes(selectedSubtopic);
    });

    if (!currentCurriculum) {
      console.error(
        "Current curriculum is undefined for the selected subtopic:",
        selectedSubtopic
      );
      alert(
        "click on the first topic or previous topic in your current module and continue"
      );
      return;
    }

    console.log("Current Curriculum:", currentCurriculum);

    const subTopicsArray = currentCurriculum?.subTopic
      ?.split(",")
      .map((item) => item.trim());
    const subLinksArray = currentCurriculum?.subLinks
      ?.split(",")
      .map((item) => item.trim());

    if (!subTopicsArray || !subLinksArray) {
      console.error(
        "Subtopics or links are missing in the current curriculum."
      );
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

  const showQuizSection = (curriculumIdx) => {
    setSelectedCurriculumIdx(curriculumIdx);
    setShowQuiz(true);
    setSelectedSubtopic(null);
  };

  const handleOptionSelect = (moduleIndex, questionIndex, sentenceIdx, index, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [`${moduleIndex}-${questionIndex}-${sentenceIdx}-${index}`]: option,
    }));
  };



  const handleQuizSubmit = () => {
    const selectedCourse = courses?.find((course) => course.courseName === courseId);
    const currentModule = openAccordionIndex;
    const moduleQuestions = selectedCourse?.Curriculum?.[currentModule]?.questions;
  
    if (!moduleQuestions || moduleQuestions.length === 0) {
      alert("No questions found for this module.");
      return;
    }
  
    const newFeedback = {};
    let allCorrect = true;
  
    moduleQuestions.forEach((question, questionIndex) => {
      let userAnswer = "";
  
      if (question.type === "input") {
        question.questionText.split(",").forEach((sentence, sentenceIdx) => {
          sentence.split("input").forEach((part, index, array) => {
            const selectedKey = `${currentModule}-${questionIndex}-${sentenceIdx}-${index}`;
            userAnswer += (selectedOptions[selectedKey] || "").trim() + ",";
          });
        });
  
        // Remove trailing comma
        userAnswer = userAnswer.replace(/,$/, "");
      }
  
      console.log(`User Answer for Question ${questionIndex}: ${userAnswer}`);
  
      if (!userAnswer) {
        newFeedback[`${currentModule}-${questionIndex}`] = {
          message: "No answer provided.",
          color: "text-gray-600",
        };
        allCorrect = false;
        return;
      }
  
      // ✅ Filter out empty values from the user answer array
      const userAnswerArray = userAnswer
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
  
      console.log(`User Answer Array for Question ${questionIndex}:`, userAnswerArray);
  
      // ✅ Ensure correct answers are also formatted properly
      const correctAnswerArray = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.map((item) => item.trim())
        : [];
  
      console.log(`Correct Answer for Question ${questionIndex}:`, correctAnswerArray);
  
      // ✅ Check exact equality (ORDER matters)
      const isCorrect =
        JSON.stringify(userAnswerArray) === JSON.stringify(correctAnswerArray);
  
      if (isCorrect) {
        newFeedback[`${currentModule}-${questionIndex}`] = {
          message: "Correct!",
          color: "text-green-600",
        };
      } else {
        newFeedback[`${currentModule}-${questionIndex}`] = {
          message: "Wrong answer.",
          color: "text-red-600",
        };
        allCorrect = false;
      }
    });
  
    setFeedback(newFeedback);
  
    // Ensure all questions are answered
    const allQuestionsAnswered = moduleQuestions.every((_, index) => {
      const answer = selectedOptions[`${currentModule}-${index}`];
      return answer !== undefined && answer !== "";
    });
  
    if (allQuestionsAnswered) {
      if (allCorrect) {
        const nextModuleIndex = currentModule + 1;
        const updatedUnlockedModules = { ...unlockedModules, [nextModuleIndex]: true };
        setUnlockedModules(updatedUnlockedModules);
        localStorage.setItem("unlockedModules", JSON.stringify(updatedUnlockedModules));
  
        setTimeout(() => {
          setOpenAccordionIndex(nextModuleIndex);
          setSelectedOptions({});
          setFeedback({});
        }, 3000);
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
              {showQuiz && selectedCurriculumIdx !== null ? (
                <div>
                  <h4 className="font-bold text-xl">Quiz</h4>
                  <ul className="list-disc space-y-2 px-1">
                    {courses
                      ?.filter((course) => course.courseName === courseId)
                      ?.flatMap((course) => course.Curriculum)
                      ?.filter((_, idx) => idx === selectedCurriculumIdx)
                      ?.map((module, moduleIdx) => (
                        <div key={moduleIdx} className="my-4">
                          <h3 className="font-bold text-lg">
                            {module.moduleName}
                          </h3>
                          {module?.questions?.map((question, qIdx) => {
                            // const head = Array.isArray(question.head)
                            // ? question?.head[qIdx]
                            // : question?.head.split(",")[qIdx];
                            const questionText = Array.isArray(
                              question.questionText
                            )
                              ? question?.questionText
                              : question?.questionText?.split(",");
                            return (
                              <div key={qIdx} className="space-y-4 mb-2">
                                <div className="shadow-inner rounded-md p-4">
                                  <p className="font-semibold mb-2">
                                    {question.head}
                                  </p>
                                  <p className="font-semibold mb-2 text-red-500 text-sm">
                                    {!question?.sample ? (
                                        ""
                                    ): (
                                      <span> Sample Ans:{question?.sample} *</span>
                                    )
                                  }
                                  </p>
                                  
                                  <div className="space-y-2">
  {question.questionText.split(",").map((sentence, sentenceIdx) => (
    <p key={sentenceIdx} className="block">
      {sentence.split("input").map((part, index, array) => (
        <span key={index} className="inline">
          {part.trim()}
          {index < array.length - 1 && (
           <input
           type="text"
           value={selectedOptions[`${moduleIdx}-${qIdx}-${sentenceIdx}-${index}`] || ""}
           onChange={(e) =>
             handleOptionSelect(moduleIdx, qIdx, sentenceIdx, index, e.target.value)
           }
           placeholder="Type answer"
           className="border-2 border-sky-100 rounded-lg p-2 bg-blue-200 mx-2 w-56 text-black placeholder:text-gray-500 focus:outline-none"
         />
          )}
        </span>
      ))}
    </p>
  ))}
</div>

                                                             
                              </div>
                                {question.type === "input" ? (
                                  // <input
                                  //   type="text"
                                  //   value={
                                  //     selectedOptions[`${moduleIdx}-${qIdx}`] ||
                                  //     ""
                                  //   }
                                  //   onChange={(e) =>
                                  //     handleOptionSelect(
                                  //       moduleIdx,
                                  //       qIdx,
                                  //       e.target.value
                                  //     )
                                  //   }
                                  //   placeholder="Type the answer ex: a, b, c, d"
                                  //   className="border p-2 rounded bg-blue-50 w-3/4 text-black placeholder:text-gray-500 placeholder:italic"
                                  // />
                                  " "
                                ) : (
                                  question?.options?.map(
                                    (option, optionIdx) => (
                                      <label key={optionIdx} className="block">
                                        <input
                                          type="radio"
                                          name={`quiz-${moduleIdx}-${qIdx}`}
                                          value={option}
                                          checked={
                                            selectedOptions[
                                              `${moduleIdx}-${qIdx}`
                                            ] === option
                                          }
                                          onChange={() =>
                                            handleOptionSelect(
                                              moduleIdx,
                                              qIdx,
                                              option
                                            )
                                          }
                                        />
                                        {option}
                                      </label>
                                    )
                                  )
                                )}
                                {feedback[`${moduleIdx}-${qIdx}`] && (
                                  <p
                                    className={
                                      feedback[`${moduleIdx}-${qIdx}`].color
                                    }
                                  >
                                    {feedback[`${moduleIdx}-${qIdx}`].message}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
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
                    <p className="font-bold text-lg text-red-500 min-h-screen text-center flex justify-center">
                      Plesae select your curriculum and watch the videos
                    </p>
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
                            {/* Module-{idx + 1}:  */}
                            {item.titles}
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
                              onClick={() => showQuizSection(idx)}
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
