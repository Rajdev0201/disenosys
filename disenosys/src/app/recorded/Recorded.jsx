"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchCourse } from "../Redux/action/Course.js";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { CiLock, CiUnlock } from "react-icons/ci";
import { payment } from "../Redux/action/Payment.js";
import { PiCheckCircleFill, PiVideoFill } from "react-icons/pi";
import "../home/Home.css";
import Review from "./Review.jsx";
import { MdVideoLibrary } from "react-icons/md";
import { CgArrowTopRightO } from "react-icons/cg";

const Recorded = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentSubTopicIndex, setCurrentSubTopicIndex] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [subLink, setSubLink] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCurriculumIdx, setSelectedCurriculumIdx] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const search = useSearchParams();
  const courseId = search.get("courseName");
  const [isLoading, setIsLoading] = useState(true);
const [isCoursePaid, setIsCoursePaid] = useState(false);

  const [unlockedModules, setUnlockedModules] = useState(
    JSON.parse(localStorage.getItem(`unlockedModules${courseId}`)) || {
      0: true,
    }
  );
  const [completedVideos, setCompletedVideos] = useState({});

  const dispatch = useDispatch();
  const courseRefs = useRef([]);
  const pay = useSelector((state) => state.payment);
  const id = search.get("id");
  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses;

  const router = useRouter();

  useEffect(() => {
    if (openAccordionIndex !== null) {
      const storageKey = `completedVideos${openAccordionIndex}`;
      const storedVideos = JSON.parse(localStorage.getItem(storageKey)) || {};
      setCompletedVideos(storedVideos); // Load completed videos for the module
    }
  }, [openAccordionIndex]); // Runs when module changes

  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(payment());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      `unlockedModules${courseId}`,
      JSON.stringify(unlockedModules)
    );
  }, [unlockedModules]);

  useEffect(() => {
  }, [selectedOptions]);

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
    setSelectedSubtopic(subTopic);
    setCurrentSubTopicIndex(index);
    setSubLink(subLink);
    setShowQuiz(false);
  };


  const nextVideo = () => {
    const currentModule = openAccordionIndex;
    const currentCourse = courses?.find(
      (course) => course?.courseName === courseId
    );

    if (!currentCourse || !currentCourse.Curriculum) {
      alert("No course or curriculum found.");
      return;
    }

    // ✅ Explicitly find the correct curriculum for the current module
    const currentCurriculum = currentCourse?.Curriculum.find(
      (curriculum, index) => index === currentModule
    );

    if (!currentCurriculum) {
      alert(
        "Click on the first topic or previous topic in your current module and continue."
      );
      return;
    }

    // ✅ Ensure subTopicsArray and subLinksArray are extracted from the correct curriculum
    const subTopicsArray = currentCurriculum?.subTopic
      ?.split(",")
      .map((item) => item.trim());

    const subLinksArray = currentCurriculum?.subLinks
      ?.split(",")
      .map((item) => item.trim());

    if (!subTopicsArray || !subLinksArray) {
      alert("Subtopics or links are missing.");
      return;
    }

    // ✅ Find the index of the current subtopic in the correct curriculum
    const currentSubTopicIndex = subTopicsArray.indexOf(selectedSubtopic);

    if (currentSubTopicIndex === -1) {
      alert("Selected subtopic not found.");
      return;
    }

    const nextSubTopicIndex = currentSubTopicIndex + 1;

    const questionsArray = currentCurriculum?.questions || [];

    // ✅ Ensure correct subLinks array is used
    const subLink = Array.isArray(currentCurriculum.subLinks)
      ? currentCurriculum.subLinks
      : currentCurriculum.subLinks.split(",");

    // ✅ Fetch completed videos for the current module
    const completedVideosForModule =
      JSON.parse(localStorage.getItem(`completedVideos${currentModule}`)) || {};

    const allCompleted = subLink.every((link) =>
      Object.keys(completedVideosForModule).some(
        (key) => key.includes(link) && completedVideosForModule[key]
      )
    );


    // ✅ Ensure all subtopics are completed before unlocking the next module
    if (
      nextSubTopicIndex >= subTopicsArray.length &&
      questionsArray.length === 0 &&
      allCompleted
    ) {
      const nextModuleIndex = currentModule + 1;
      const updatedUnlockedModules = {
        ...unlockedModules,
        [nextModuleIndex]: true,
      };

      setUnlockedModules(updatedUnlockedModules);
      localStorage.setItem(
        `unlockedModules${courseId}`,
        JSON.stringify(updatedUnlockedModules)
      );

      alert("Successfully! You got next module access.");
      return;
    }

    // ✅ Ensure state updates correctly with the correct subtopic and sublink
    setCurrentSubTopicIndex(nextSubTopicIndex);
    setSelectedSubtopic(subTopicsArray[nextSubTopicIndex] || ""); // Prevent undefined
    setSubLink(subLinksArray[nextSubTopicIndex] || ""); // Prevent undefined
  };

  const handleVideoEnd = (subLink) => {
    if (openAccordionIndex === null || subLink === null) return;

    const storageKey = `completedVideos${openAccordionIndex}`;

    setCompletedVideos((prev) => {
      const previousModuleData =
        JSON.parse(localStorage.getItem(storageKey)) || {};

      const updatedVideos = {
        ...previousModuleData,
        ...prev, 
        [subLink]: true, 
      };

      localStorage.setItem(storageKey, JSON.stringify(updatedVideos));

      return updatedVideos;
    });

    nextVideo();
  };

  const showQuizSection = (curriculumIdx) => {
    setSelectedCurriculumIdx(curriculumIdx);
    setShowQuiz(true);
    setSelectedSubtopic(null);
  };

  const handleQuizSubmit = () => {
    const selectedCourse = courses?.find(
      (course) => course.courseName === courseId
    );
    const currentModule = openAccordionIndex;
    const moduleQuestions =
      selectedCourse?.Curriculum?.[currentModule]?.questions;

    const newFeedback = {};
    let allCorrect = true;

    moduleQuestions.forEach((question, questionIndex) => {
      let userAnswerArray = [];

      if (question.type === "input") {
        question.questionText.split(",").forEach((sentence, sentenceIdx) => {
          sentence.split("input").forEach((_, index) => {
            const selectedKey = `${courseId}-${currentModule}-${questionIndex}-${sentenceIdx}-${index}`;
            const userInput = selectedOptions[selectedKey]?.trim() || "";
        

            if (userInput) {
              userAnswerArray.push(userInput);
            }
          });
        });
      }

      const correctAnswerArray = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.map((item) => item.trim().toLowerCase())
        : [];


      if (userAnswerArray.length !== correctAnswerArray.length) {
        allCorrect = false;
      }

      const isCorrect =
        JSON.stringify(userAnswerArray) === JSON.stringify(correctAnswerArray);

      newFeedback[`${currentModule}-${questionIndex}`] = {
        message: isCorrect ? "Correct!" : "Wrong answer.",
        color: isCorrect ? "text-green-600" : "text-red-600",
      };

      if (!isCorrect) allCorrect = false;
    });

    setFeedback(newFeedback);

    if (!allCorrect) {
      alert("Please answer all questions correctly to proceed.");
      return;
    }
    const nextModuleIndex = currentModule + 1;
    const updatedUnlockedModules = {
      ...unlockedModules,
      [nextModuleIndex]: true,
    };

    setUnlockedModules(updatedUnlockedModules);
    localStorage.setItem(
      `unlockedModules${courseId}`,
      JSON.stringify(updatedUnlockedModules)
    );

    setTimeout(() => {
      setOpenAccordionIndex(nextModuleIndex);
      setSelectedOptions({});
      setFeedback({});
    }, 500);
  };

  useEffect(() => {
    if (pay?.data) {
      const coursePaid = pay.data.some(
        (item) =>
          item._id === id &&
          item.lineItems.some(
            (lineItem) => lineItem.name === courseId && item.isActive
          )
      );
      setIsCoursePaid(coursePaid);
      setIsLoading(false); 
    }
  }, [pay, id, courseId]);

  return (
    <>
      {courses ? (
        <div className="">
          {courses && (
            <div className="py-2  bg-[#0d1039] rounded-md">
              <div className="p-3">
                <h3 className="text-2xl text-center font-bold text-white font-garet">
                  {courseId}
                </h3>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-row font-garet">
            <div className="col-span-12 lg:col-span-9 bg-white p-4  overscroll-none shadow-md rounded-md ml-1/4 w-full lg:w-3/4">
              {showQuiz && openAccordionIndex !== null ? (
                <div>
                  <h4 className="font-bold text-xl">Quiz</h4>
                  <ul className="list-disc space-y-2 px-1">
                    {courses
                      ?.filter((course) => course.courseName === courseId)
                      ?.map((course) =>
                        course.Curriculum.map((module, originalModuleIdx) => {
                          // Ensure we only process the selected module
                          if (
                            openAccordionIndex !== null &&
                            originalModuleIdx !== openAccordionIndex
                          ) {
                            return null;
                          }

                          return (
                            <div key={originalModuleIdx} className="my-4">
                              {/* <h3 className="font-bold text-lg">Module: {originalModuleIdx}</h3> */}
                              <div className="flex justify-end">
                                <button
                                  onClick={() => setShowModal(true)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-2"
                                >
                                  Click Info*
                                </button>
                              </div>
                              {showModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                                      <h2 className="text-lg font-bold">
                                        Quiz Instructions
                                      </h2>
                                      <button
                                        onClick={() => setShowModal(false)}
                                        className="text-red-500 text-xl"
                                      >
                                        &times;
                                      </button>
                                    </div>

                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                      <li>
                                        ⚡ Input format: Ensure all answers
                                        follow the specified format.
                                      </li>
                                      <li>
                                        ⏳ No time limit, but answer carefully.
                                      </li>
                                      <li>
                                        ✔️ Click{" "}
                                        <span className="font-bold">
                                          Submit
                                        </span>{" "}
                                        after answering all questions.
                                      </li>
                                      <li>
                                        📌 If unsure, refer to the{" "}
                                        <span className="font-bold">
                                          Sample Answer
                                        </span>{" "}
                                        provided.
                                      </li>
                                      <li>
                                        🔍 After submission, incorrect answers
                                        will be marked{" "}
                                        <span className="text-red-600">
                                          Wrong Answered
                                        </span>
                                        , and correct answers will be marked{" "}
                                        <span className="text-green-600">
                                          Correct Answered
                                        </span>
                                        .
                                      </li>
                                      <li>
                                        🔄 Match the Following questions will
                                        display sample text above the question.
                                      </li>
                                      <li>
                                        🚀 Once all answers are correct, the
                                        next module will unlock for you to
                                        continue learning.
                                      </li>
                                      <li>
                                        🎉{" "}
                                        <span className="font-bold text-blue-500">
                                          Happy Learning!
                                        </span>
                                      </li>
                                    </ul>

                                    <div className="mt-4 text-right">
                                      <button
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {module?.questions?.map((question, qIdx) => {
                                return (
                                  <div key={qIdx} className="space-y-4 mb-2">
                                    <div className="rounded-xl border border-gray-200 shadow-sm bg-white font-garet p-4">
                                      <p className="font-semibold mb-2">
                                        {question.head}
                                      </p>
                                      <p className="font-semibold mb-2 text-red-500 text-sm">
                                        {!question?.sample ? (
                                          ""
                                        ) : (
                                          <span>
                                            {" "}
                                            Sample Ans: {question?.sample} *
                                          </span>
                                        )}
                                      </p>

                                      <div className="space-y-3">
                                        {question?.questionText
                                          ?.split(",")
                                          .map((sentence, sentenceIdx) => (
                                            <p
                                              key={sentenceIdx}
                                              className="block"
                                            >
                                              {sentence
                                                .split("input")
                                                .map((part, index, array) => {
                                                  const inputKey = `${courseId}-${originalModuleIdx}-${qIdx}-${sentenceIdx}-${index}`;
                                                  const currentValue =
                                                    selectedOptions[inputKey] ||
                                                    "";

                                                  return (
                                                    <span
                                                      key={index}
                                                      className="inline"
                                                    >
                                                      {part.trim()}
                                                      {index <
                                                        array.length - 1 && (
                                                        <input
                                                          type="text"
                                                          value={
                                                            selectedOptions[
                                                              inputKey
                                                            ] || ""
                                                          } // Ensure input value is updated correctly
                                                          onChange={(e) => {
                                                            const newValue =
                                                              e.target.value.toLowerCase();
                                                            setSelectedOptions(
                                                              (prev) => ({
                                                                ...prev,
                                                                [inputKey]:
                                                                  newValue,
                                                              })
                                                            );
                                                          }}
                                                          placeholder="Type answer"
                                                          className="border-2 border-sky-100 rounded-lg p-2 bg-blue-200 mx-2 w-56 text-black placeholder:text-gray-500 focus:outline-none"
                                                        />
                                                      )}
                                                    </span>
                                                  );
                                                })}
                                            </p>
                                          ))}
                                      </div>
                                    </div>
                                    {feedback[
                                      `${originalModuleIdx}-${qIdx}`
                                    ] && (
                                      <p
                                        className={
                                          feedback[
                                            `${originalModuleIdx}-${qIdx}`
                                          ].color
                                        }
                                      >
                                        {
                                          feedback[
                                            `${originalModuleIdx}-${qIdx}`
                                          ].message
                                        }
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })
                      )}
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
                        onEnded={() => handleVideoEnd(subLink)}
                        disablePictureInPicture
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <source src={subLink} type="video/mp4" />
                      </video>
                    </div>
                  ) : (


                    <div
  role="alert"
  class="bg-black text-indigo-100 font-bold text-md lg:text-lg lg:min-h-screen flex justify-center items-center text-center p-4 rounded-md shadow-inner"
>
  <div class="flex flex-col items-center">
    <span class="flexś uppercase px-2 py-1 text-xs font-bold mb-2">
    <MdVideoLibrary className="w-24 h-24"/>
    </span>
    <p className="flex gap-2 items-center">Please select your curriculum and watch the videos <CgArrowTopRightO className="w-6 h-6 bg-white text-green-600 shadow-inner rounded-full"/></p>
  </div>
</div>

                  )}
                </div>
              )}
            </div>

            <div className="col-span-12 lg:col-span-3 lg:h-screen  lg:overflow-y-auto p-4 bg-gray-100 w-full lg:w-1/4 lg:sticky top-0">
              <h1 className="text-[#0d1039] font-semibold text-xl sm:text-xl md:text-2xl font-garet">
                Course Curriculum
              </h1>
              {courses
                ?.filter((course) => course.courseName === courseId)
                ?.map((course, courseIdx) => (
                  <>
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
                            <span className="font-medium text-lg font-garet">
                              {/* Module-{idx + 1}:  */}
                              {item.titles}
                            </span>
                            <span className="text-[#182073]">
                              {unlockedModules[idx] ? (
                                <CiUnlock
                                  className="text-green-800"
                                  size={25}
                                />
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
                                  <li
                                    key={subIdx}
                                    className="flex items-center"
                                  >
                                    <div className="flex items-center gap-2 w-full h-12">
                                      <PiVideoFill className="w-6 h-6" />
                                      <span
                                        className={`hover:cursor-pointer flex items-center font-garet flex-1 
                                   hover:text-blue-700 ${
                                     selectedSubtopic === subTopic
                                       ? "text-blue-700"
                                       : "text-gray-800"
                                   }`}
                                        onClick={() =>
                                          handlesubTopicelect(
                                            subTopic,
                                            subLink,
                                            subIdx
                                          )
                                        }
                                      >
                                        {subTopic.trim()}

                                        {completedVideos[subLink] && (
                                          <PiCheckCircleFill className="text-green-500 ml-2 w-6 h-6 relative lg:absolute lg:right-3  right-0" />
                                        )}
                                      </span>
                                    </div>
                                  </li>
                                );
                              })}
                              {item?.questions ? (
                                <button
                                  onClick={() => showQuizSection(idx)}
                                  className="text-blue-600 mt-4 underline"
                                >
                                  Take Quiz
                                </button>
                              ) : (
                                // <button
                                //   onClick={noQuiz}
                                //   className="bg-blue-600 mt-4 p-2 text-white rounded-md flex items-center gap-2"
                                // >
                                //   Next Video <FaDiagramNext className="" />
                                // </button>
                                ""
                              )}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    <Review courseId={course._id} />
                  </>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div class="flex-col gap-4 w-full flex items-center justify-center min-h-screen">
          <div class="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              class="animate-ping"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
            </svg>
          </div>
        </div>
      )}

{!isCoursePaid && !isLoading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
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
