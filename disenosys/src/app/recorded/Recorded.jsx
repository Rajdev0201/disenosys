"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchCourse } from "../Redux/action/Course.js";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

const Recorded = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [feedback, setFeedback] = useState({});
  const dispatch = useDispatch();
  const courseRefs = useRef([]);
  const search = useSearchParams();
  const courseId = search.get("courseName");

  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses;

  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
    setCurrentSection(null); // Reset section when toggling accordion
  };

  const handleOptionSelect = (moduleIndex, questionIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [`${moduleIndex}-${questionIndex}`]: option,
    }));

    const correctAnswer = quizData[moduleIndex][questionIndex].correctAnswer;
    setFeedback((prev) => ({
      ...prev,
      [`${moduleIndex}-${questionIndex}`]:
        option === correctAnswer
          ? "Correct!"
          : `Wrong! Correct answer: ${correctAnswer}`,
    }));
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
      {
        question: "Question 2 for Module 1?",
        options: ["Correct Answer", "Wrong 1", "Wrong 2", "Wrong 3"],
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
        question: "Question 1 for Module 2?",
        options: ["Wrong 1", "Correct Answer", "Wrong 2", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
      {
        question: "Question 2 for Module 2?",
        options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
        correctAnswer: "Correct Answer",
      },
    ],
    [
        {
          question: "Question 1 for Module 2?",
          options: ["Wrong 1", "Correct Answer", "Wrong 2", "Wrong 3"],
          correctAnswer: "Correct Answer",
        },
        {
          question: "Question 2 for Module 2?",
          options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
          correctAnswer: "Correct Answer",
        },
      ],
      [
        {
          question: "Question 1 for Module 2?",
          options: ["Wrong 1", "Correct Answer", "Wrong 2", "Wrong 3"],
          correctAnswer: "Correct Answer",
        },
        {
          question: "Question 2 for Module 2?",
          options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
          correctAnswer: "Correct Answer",
        },
      ],
      [
        {
          question: "Question 1 for Module 5?",
          options: ["Wrong 1", "Correct Answer", "Wrong 2", "Wrong 3"],
          correctAnswer: "Correct Answer",
        },
        {
          question: "Question 2 for Module 5?",
          options: ["Wrong 1", "Wrong 2", "Correct Answer", "Wrong 3"],
          correctAnswer: "Correct Answer",
        },
      ],
  ];

  return (
    <div className="">
      {courses && (
        <div className=" py-4 bg-[#182073] text-[#182073] rounded-md ring-2 ring-red-300">
          <div className="p-10">
            <h3 className="text-4xl text-center font-bold text-white">
              {courseId}
            </h3>
          </div>
        </div>
      )}
      <div>
        {courses
          ?.filter((course) => course.courseName === courseId)
          ?.map((course, courseIdx) => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0 lg:p-24">
                <div className="p-6 container mx-auto">
                  <h1 className="text-[#182073] font-bold text-xl sm:text-2xl md:text-3xl font-poppins">
                    Course Overview
                  </h1>
                  <p className="leading-7 text-start font-poppins pt-3 text-base md:text-lg text-gray-500">
                    {course.description}
                  </p>
                </div>
                <div className="p-6">
                  <iframe
                    src="https://www.youtube.com/embed/your-video-link"
                    title="Course Overview"
                    className="w-full h-64"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* {course?.Curriculum?.map((item, idx) => (
  <div className="mt-4  grid grid-cols-3" key={idx}>
    <div className="flex-1 bg-white border border-gray-300 p-4 shadow-md rounded-md min-h-full">
      <ul className="list-disc space-y-2 px-1">
        {item.subTopics &&
          (Array.isArray(item.subTopics)
            ? item.subTopics
            : item.subTopics.split(",")
          ).map((subTopic, subIdx) => (
            <li
              key={subIdx}
              className="text-md font-semibold font-poppins"
            >
              {subIdx === 0 ? (
                <span className="">{subTopic.trim()}</span>
              ) : (
                subTopic.trim()
              )}
            </li>
          ))}
      </ul>
    </div>
  </div>
))} */}


              <div key={courseIdx} className="px-24 py-10 mb-6">
                {course?.Curriculum?.map((item, idx) => (
                  <div key={idx} ref={(el) => (courseRefs.current[idx] = el)}>
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left bg-gray-50 my-2 p-2 mt-4 rounded-md hover:bg-gray-100 focus:outline-none flex items-center justify-between"
                    >
                      <span className="font-bold text-lg font-poppins">
                        Module-{idx + 1}: {item.title}
                      </span>
                      <span className="text-[#182073]">
                        {openAccordionIndex === idx ? "▲" : "▼"}
                      </span>
                    </button>

                    {openAccordionIndex === idx && (
                      <div
                        className={`mt-4 gap-3 grid grid-cols-1 md:grid-cols-2`}
                      >
                        {/* Video Column */}
                        <div className="bg-white border border-gray-300 p-4 shadow-md rounded-md">
                          <h4 className="font-bold">Video</h4>
                          <iframe
                            width="100%"
                            height="315"
                            src="https://youtu.be/5wVWjFVw1kY?feature=shared"
                            title="Dummy Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        {/* Quiz Column */}
                        <div className="bg-white border border-gray-300 p-4 shadow-md rounded-md">
                          <h4 className="font-bold">Quiz</h4>
                          <ul className="list-disc space-y-2 px-1">
                            {quizData[idx]?.map((question, qIdx) => (
                              <li key={qIdx} className="my-4">
                                <p>{question.question}</p>
                                <ul className="list-disc space-y-1">
                                  {question.options.map((option, optIdx) => (
                                    <li
                                      key={optIdx}
                                      className="flex items-center"
                                    >
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`quiz-${idx}-${qIdx}`}
                                          value={option}
                                          checked={
                                            selectedOptions[
                                              `${idx}-${qIdx}`
                                            ] === option
                                          }
                                          onChange={() =>
                                            handleOptionSelect(
                                              idx,
                                              qIdx,
                                              option
                                            )
                                          }
                                          className="mr-2"
                                        />
                                        {option}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                {feedback[`${idx}-${qIdx}`] && (
                                  <p className="mt-2 text-sm text-green-600">
                                    {feedback[`${idx}-${qIdx}`]}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Recorded;
