"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, setStudent } from "../Redux/features/studentSlice";
import axios from "axios";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) ||
      Array(questions.length).fill({ status: "unanswered" })
  );

  const [globalTimeRemaining, setGlobalTimeRemaining] = useState(() => {
    const startTime = localStorage.getItem("startTime");
    if (startTime) {
      const now = new Date();
      const elapsedTime = now - new Date(startTime);
      const remainingTime = Math.max(1800 - elapsedTime / 1000, 0); 
      return remainingTime;
    }
    return 1800; 
  });
  
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [quizFinished, setQuizFinished] = useState(() => {
    return localStorage.getItem("quizFinished") === "true";
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const student = useSelector((state) => state?.student?.student?.user);

  useEffect(() => {
    const storedUser = localStorage.getItem("student");
    if (!storedUser || storedUser === "undefined") {
      alert("You must be logged in to access this quiz.");
      router.push("/exam");
    } else {
      try {
        dispatch(setStudent(JSON.parse(storedUser)));
  
        // Set startTime only if it's not already set
        if (!localStorage.getItem("startTime")) {
          const now = new Date();
          localStorage.setItem("startTime", now.toISOString());
        }
      } catch (error) {
        console.error("Error parsing stored student:", error);
      }
    }
  }, [dispatch, router]);
  
  useEffect(() => {
    const startTime = new Date(localStorage.getItem("startTime"));
    const examDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
    let alertShown = false;
  
    const timer = setInterval(() => {
      const now = new Date();
      const timeElapsed = now - startTime;
      const timeRemaining = Math.max((examDuration - timeElapsed) / 1000, 0); // Convert to seconds
  
      if (timeRemaining <= 0) {
        clearInterval(timer);
        handleFinish();
      } else {
        setGlobalTimeRemaining(timeRemaining);
        localStorage.setItem("globalTimeRemaining", timeRemaining);
  
        if (timeRemaining <= 300 && !alertShown) {
          alert("You have only 5 minutes left!");
          alertShown = true;
        }
      }
    }, 1000);
  
    return () => clearInterval(timer);
  }, [quizFinished]);
  

  const formatTime = (timeInSeconds) => {
    const totalSeconds = Math.floor(timeInSeconds); 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60; 
  
    
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    return `${minutes}:${formattedSeconds}`;
  };
  

  const handleAnswerClick = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer.isCorrect;
    const updatedAnswers = [...answers];

    // Update status for the current question
    updatedAnswers[currentQuestionIndex] = {
      answer: selectedAnswer.text,
      isCorrect,
      status: isCorrect ? "correct" : "wrong",
    };

    // If the question was skipped, change the status from "skipped"
    if (updatedAnswers[currentQuestionIndex].status === "skipped") {
      updatedAnswers[currentQuestionIndex].status = isCorrect
        ? "correct"
        : "wrong";
    }

    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      handleNext();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex);
    }
  };

  useEffect(() => {
    const currentAnswer = answers[currentQuestionIndex];

    
    if (currentAnswer?.status === "skipped") {
      setSelectedAnswer(null); 
    } else {

      if (currentAnswer?.answer) {
        const matchingOption = questions[currentQuestionIndex].options.find(
          (option) => option.text === currentAnswer.answer
        );
        setSelectedAnswer(matchingOption || null);
      } else {
        setSelectedAnswer(null);
      }
    }
  }, [currentQuestionIndex]);

  const handleAnswerChange = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      if (nextIndex < questions.length) {
        localStorage.setItem("currentQuestionIndex", nextIndex);
        return nextIndex;
      } else {
        return prevIndex;
      }
    });
  };

  const handleSkipClick = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      ...updatedAnswers[currentQuestionIndex],
      status: "skipped",
    };
    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
    setSelectedAnswer(null);
    handleNext();
  };

  const handleRevisitSkippedQuestion = (index) => {
    const updatedAnswers = [...answers];
    // Allow changing the status and selected answer when revisiting
    setCurrentQuestionIndex(index);
    const skippedAnswer = updatedAnswers[index];
    if (skippedAnswer?.status === "skipped") {
      setSelectedAnswer(null); // Reset for a new selection
    } else {
      // Set selected answer if the question was already answered
      const matchingOption = questions[index].options.find(
        (option) => option.text === skippedAnswer.answer
      );
      setSelectedAnswer(matchingOption || null);
    }
  };


  const handleClick = (index) => {
    setCurrentQuestionIndex(index); // Update the current index
    handleRevisitSkippedQuestion(index); // Call the provided function
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex - 1);
    }
  };

  const calculateResult = () => {
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const totalScore = correctAnswers * 2;
    const percentage = (correctAnswers / questions.length) * 100;
    return {
      correct: correctAnswers,
      wrong: answers.filter((answer) => answer.status === "wrong").length,
      skipped: answers.filter((answer) => answer.status === "skipped").length,
      totalScore,
      percentage: percentage.toFixed(2),
    };
  };

  const handleFinish = async () => {
    const confirmSubmit = window.confirm("Do you want to submit the exam?");
    if (confirmSubmit) {
      setShowResultPopup(true);
      localStorage.setItem("quizFinished", "true");
      setQuizFinished(true);
      const result = calculateResult();

      try {
        const response = await axios.post(
          "https://disenosys-dkhj.onrender.com/api/student/updateStudentQuiz",
          {
            studentId: student._id,
            // quizResults: answers,
            totalScore: result.totalScore,
            percentage: result.percentage,
          }
        );
        console.log(response);
        localStorage.removeItem("startTime");
        localStorage.removeItem("globalTimeRemaining");
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("answers");
        localStorage.removeItem("quizFinished")
        // if (response.status === 200) {
        //   alert("Quiz submitted successfully!");
        // }
      } catch (error) {
        console.error("Error submitting quiz results", error);
      }
    }
  };

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const closePopupAndRedirect = () => {
    setShowResultPopup(false);
    localStorage.removeItem("globalTimeRemaining");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("answers");
    localStorage.removeItem("quizFinished");
    localStorage.removeItem("startTime");
    dispatch(LogOut());
    router.push("/");
  };

  return (
    <div className="flex flex-wrap mt-8">
      {quizFinished ? (
        // Show only the result popup if quiz is finished
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold">Quiz Completed!</h2>
          <p className="mt-4 text-xl">
            Your Result: {calculateResult().percentage}%
          </p>
          <button
            onClick={closePopupAndRedirect}
            className="bg-[#182073] hover:bg-white text-white hover:text-[#182073] font-semibold py-2 px-4 rounded"
          >
            Back Home
          </button>
        </div>
      ) : (
        currentQuestionIndex < questions.length && (
          <>
            <div className="w-full lg:w-6/12 p-4">
              <h2 className="text-2xl font-bold">
                {questions[currentQuestionIndex].question}
              </h2>
              <div className="mt-4 space-y-7">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 mt-2"
                    >
                      <input
                        type="radio"
                        name={`answer-${currentQuestionIndex}`}
                        value={option.text}
                        checked={selectedAnswer?.text === option.text}
                        onChange={() => handleAnswerChange(option)}
                        className="form-radio h-4 w-4 text-[#182073] accent-[#182073]"
                        disabled={
                          answers[currentQuestionIndex]?.status === "correct" ||
                          answers[currentQuestionIndex]?.status === "wrong"
                        }
                      />
                      <span className="text-gray-800">{option.text}</span>
                    </label>
                  )
                )}
              </div>
              <div className="mt-10">
                <button
                  onClick={handleAnswerClick}
                  className={`bg-[#182073] text-white font-semibold py-2 px-4 rounded mr-4 ${
                    selectedAnswer !== null ||
                    answers[currentQuestionIndex].status === "skipped"
                      ? "hover:bg-white hover:text-[#182073]"
                      : ""
                  }`}
                  disabled={
                    selectedAnswer === null &&
                    answers[currentQuestionIndex].status !== "skipped"
                  }
                >
                  Submit
                </button>
                <button
                  onClick={handleSkipClick}
                  className="bg-[#182073] hover:bg-white text-white hover:text-[#182073] font-semibold py-2 px-4 rounded mr-4"
                  disabled={
                    answers[currentQuestionIndex].status !== "unanswered"
                  }
                >
                  Skip
                </button>
              </div>
            </div>

            <div className="w-full lg:w-6/12 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </h3>
                <div className="p-2 rounded-lg text-center bg-[#182073] text-white">
                  <p className="font-bold text-xl">
                    {formatTime(globalTimeRemaining)}
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 shadow-sm rounded">
                <h3 className="text-lg font-semibold">Answer Status</h3>
                <div className="flex flex-wrap mt-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-full text-white font-bold m-1 ${
              currentQuestionIndex === index ? 'bg-blue-500' : 'bg-[#182073]'
            }`}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

                {/* <div className="flex flex-wrap mt-4">
  {answers.map((answer, index) => (
    <button
      key={index}
      className={`w-10 h-10 rounded-full text-white font-bold m-1 ${answer.isFinished ? 'bg-green-500' : 'bg-[#182073]'}`}
      onClick={() => handleRevisitSkippedQuestion(index)}
    >
      {answer.isFinished ? (
        <span className="material-icons">done</span> // Replace with your preferred icon
      ) : (
        index + 1
      )}
    </button>
  ))}
</div> */}

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handleFinish}
                    className="bg-blue-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded"
                  >
                    Finish
                  </button>
                  <div>
                    <button
                      onClick={handlePrevious}
                      className="bg-[#182073] hover:bg-white text-white hover:text-[#182073] font-semibold py-2 px-4 rounded mr-4"
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-[#182073] hover:bg-white text-white hover:text-[#182073] font-semibold py-2 px-4 rounded"
                      disabled={currentQuestionIndex >= questions.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}

      {showResultPopup && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-center mb-6">
              Quiz Results
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#182073] text-white">
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Correct Answers</td>
                    <td className="border px-4 py-2">
                      {calculateResult().correct}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Wrong Answers</td>
                    <td className="border px-4 py-2">
                      {calculateResult().wrong}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Skipped</td>
                    <td className="border px-4 py-2">
                      {calculateResult().skipped}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Score</td>
                    <td className="border px-4 py-2">
                      {calculateResult().totalScore}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Percentage</td>
                    <td className="border px-4 py-2">
                      {calculateResult().percentage}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={closePopupAndRedirect}
                className="bg-[#182073] hover:bg-white text-white hover:text-[#182073] font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
