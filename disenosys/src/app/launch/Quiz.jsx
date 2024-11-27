"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const QuizScreen = ({ questions }) => {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0
  );

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) ||
      Array(questions?.length || 0).fill({ status: "unanswered" })
  );

  const [globalTimeRemaining, setGlobalTimeRemaining] = useState(() => {
    const startTime = localStorage.getItem("startTime");
    if (startTime) {
      const now = new Date();
      const elapsedTime = now - new Date(startTime);
      const remainingTime = Math.max(450 - elapsedTime / 1000, 0);
      return remainingTime;
    }
    return 450;
  });

  useEffect(() => {
    if (!localStorage.getItem("startTime")) {
      const now = new Date();
      localStorage.setItem("startTime", now.toISOString());
    }
  }, []);

  useEffect(() => {
    const startTime = new Date(localStorage.getItem("startTime"));
    const examDuration = 450 * 1000;

    const timer = setInterval(() => {
      const now = new Date();
      const timeElapsed = now - startTime;
      const timeRemaining = Math.max((examDuration - timeElapsed) / 1000, 0);

      setGlobalTimeRemaining(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(timer);
        handleFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleAnswerChange = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an option before proceeding.");
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      answer: selectedAnswer.text,
      isCorrect: selectedAnswer.isCorrect,
    };

    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers));

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      localStorage.setItem("currentQuestionIndex", nextIndex);
      setSelectedAnswer(null);
    } else {
      handleFinish();
    }
  };

  const calculateResult = () => {
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const totalScore = correctAnswers * 10;
    const percentage = (correctAnswers / questions.length) * 100;
    localStorage.setItem("totalScoreCatia", totalScore);
    localStorage.setItem("catiaPercentage", percentage.toFixed(2));
    return {
      totalScore,
      percentage: percentage.toFixed(2),
    };
  };

  const handleFinish = async () => {
    // const result = calculateResult();
    calculateResult();

    alert("Catia Quiz submitted successfully! Proceed to the next section.");
    router.push("/launch2");
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#182073] rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-20 flex flex-row justify-center gap-2  items-center mb-4 space-y-2">
        <div className="w-3/4 md:w-3/4 h-1.5 bg-gray-300 rounded-full relative">
          <div
            className="h-1.5 bg-[#182073] rounded-full"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        <h1 className="text-lg font-semibold text-white rounded px-3 py-1 bg-[#182073]">
          {formatTime(globalTimeRemaining)}
        </h1>
      </div>

      <div className="bg-[#D0D2E3] h-screen flex flex-col items-center pt-20 border-4 border-t-[#182073]">
        <div className="bg-[#E7E8F1] shadow-lg rounded-lg w-11/12 sm:w-3/4 md:w-2/5 lg:w-1/3 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {questions[currentQuestionIndex].question}
          </h2>

          <div className="flex flex-col space-y-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center bg-white border ${
                  selectedAnswer === option
                    ? "border-[#182073] border-4 bg-[#182073] text-white"
                    : "border-gray-300"
                } rounded-lg py-2 px-4`}
                onClick={() => handleAnswerChange(option)}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  className="form-radio  text-[#182073] accent-[#182073] w-4 h-4 mr-4"
                  checked={selectedAnswer === option}
                  readOnly
                />
                <label className="text-gray-700">{option.text}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-[#182073] text-white font-semibold py-2 px-8 rounded-lg hover:bg-[#0f1852] transition"
            onClick={handleNext}
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizScreen;
