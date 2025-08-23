"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, setStudent } from "../Redux/features/studentSlice";
import axios from "axios";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const lastWarnRef = useRef("");
   const lastSaveDbRef = useRef({ reason: null, time: null });
  const terminatedRef = useRef(false);
  const lastSeenRef = useRef(Date.now());
  const missCountRef = useRef(0);
  const downStreakRef = useRef(0);
  const awayStreakRef = useRef(0);
  const [reason, setReason] = useState([]);
  const [status, setStaus] = useState("successfully completed");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("examData")) || [];
    if (stored) {
    setReason(stored.reason); 
    setStaus(stored.status);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("examData", JSON.stringify({ reason, status }));
  }, [reason, status]);

  const addActivity = (reason) => {
  const now = Date.now();

  // Allow same reason only if 5 seconds have passed
  if (
    lastSaveDbRef.current.reason !== reason ||
    now - lastSaveDbRef.current.time > 5000
  ) {
    lastSaveDbRef.current = { reason, time: now };

    setReason((prev) => [
      ...prev,
      { reason, time: new Date().toISOString() },
    ]);
  }
};
 

  const [debug, setDebug] = useState({
    camera: "off",
    faces: 0,
    gaze: "-",
    absentSec: 0,
    lastSeenSec: 0,
  });

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

      try {
        // Check permission state before requesting
        if (navigator.permissions) {
          const result = await navigator.permissions.query({ name: "camera" });

          if (result.state === "denied") {
            toast.warn("Please allow camera access to continue the exam.");
            router.push("/exam");
            return; // stop further execution
          }
        }

        // Request access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setDebug((d) => ({ ...d, camera: "on" }));
            videoRef.current.play();
          };
        }
      } catch (e) {
        toast.warn("Please allow camera access to continue the exam.");
        router.push("/exam");
      }
    };

    loadModels();
  }, []);

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

  const alertShown = useRef(false);

  useEffect(() => {
    const savedStartTime = Number(localStorage.getItem("startTime"));
    const startTime = savedStartTime ? savedStartTime : Date.now();
    const examDuration = 30 * 60 * 1000; // 30 minutes

    const timer = setInterval(() => {
      const now = Date.now();
      const timeElapsed = now - startTime;
      const timeRemaining = Math.max((examDuration - timeElapsed) / 1000, 0);

      if (timeRemaining <= 0) {
        clearInterval(timer);
        handleFinish();
      } else {
        setGlobalTimeRemaining(timeRemaining);
        localStorage.setItem("globalTimeRemaining", timeRemaining);

        if (timeRemaining <= 300 && !alertShown.current) {
          alert("You have only 5 minutes left!");
          alertShown.current = true;
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const addWarning = (msg) => {
    // if (force) {
    //   toast.warn(`⚠️ ${msg}`, {
    //     position: "top-center",
    //     autoClose: 4000,
    //   });
    //   return;
    // }

    if (lastWarnRef.current !== msg) {
      lastWarnRef.current = msg;
      toast.warn(`⚠️ ${msg}`, {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  //   const addViolation = () => {
  //  if (terminatedRef.current) return; // prevent multiple alerts
  // terminatedRef.current = true; // lock termination
  //  const result = calculateResult();
  //  console.log(result)
  // fetch("http://localhost:8000/api/student/terminate", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     _id: student._id,
  //     // totalScore: result.totalScore,
  //     // percentage: result.percentage,
  //     reason:"Suspicious activity",
  //     status: "Terminated",
  //   }),
  // });

  // // toast.warning(`Exam terminated: ${reason}`);
  // // window.location.href = "/exam-terminated"; // force exit page
  //   };

  useEffect(() => {
    const TICK_MS = 2000; // check every 2s
    const ABSENT_LIMIT_S = 60; // 1 minute
    const DOWN_NEED_STREAK = 5; // must be detected 3 ticks in a row (~6s)
    const AWAY_NEED_STREAK = 3; // same
    // const H_LEFT = 0.45;    // left threshold
    // const H_RIGHT = 0.55;   // right threshold
    const H_LEFT = 0.45; // left threshold
    const H_RIGHT = 0.55; //right

    const tick = async () => {
      if (!videoRef.current) return;

      const opts = new faceapi.TinyFaceDetectorOptions({
        inputSize: 160,
        scoreThreshold: 0.5,
      });

      const dets = await faceapi
        .detectAllFaces(videoRef.current, opts)
        .withFaceLandmarks();

      // defaults for panel
      let gaze = "-";
      let faces = dets.length;
      // face not seen
      if (faces === 0) {
        addWarning("Face not detected! Please sit in a well-lit area.");
        addActivity("Face not detected! Please sit in a well-lit area.");
        setStaus("Suspicious activity");
        missCountRef.current += 1;
        const absentSec = missCountRef.current * (TICK_MS / 1000);
        if (absentSec >= ABSENT_LIMIT_S) {
          addActivity("Face not detected! Please sit in a well-lit area.");
        }
        return;
      }

      // face seen -> reset absence
      missCountRef.current = 0;
      lastSeenRef.current = Date.now();

      if (faces > 1) {
        setDebug({
          camera: "on",
          faces,
          gaze: "multiple",
          absentSec: 0,
          lastSeenSec: 0,
        });
        addWarning("Multiple faces detected!");
        addActivity("Multiple faces detected!");
        setStaus("Suspicious activity");
        return;
      }

      // exactly one face -> landmarks based checks
      const landmarks = dets[0].landmarks;

      // --- looking down (very simple heuristic) ---
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();
      const avgY = (leftEye[0].y + rightEye[0].y) / 2;

      const vh = videoRef.current.videoHeight || 360; // guard if not ready
      const down = avgY > vh * 0.55; // tweak 0.55–0.60 as needed
      if (down) {
        downStreakRef.current += 1;
      } else {
        downStreakRef.current = 0;
      }
      if (downStreakRef.current >= DOWN_NEED_STREAK) {
        gaze = "down";
        setDebug({
          camera: "on",
          faces,
          gaze,
          absentSec: 0,
          lastSeenSec: 0,
        });
        addWarning("Looking down (possible phone use)");
        addActivity("Looking down (possible phone use)");
        setStaus("Suspicious activity");
        return;
      }

      // --- looking left/right (nose average X across landmarks) ---
      const nose = landmarks.getNose();
      const avgX = nose.reduce((s, p) => s + p.x, 0) / (nose.length || 1);
      const vw = videoRef.current.videoWidth || 480;

      let away = false;
      if (avgX < vw * H_LEFT) {
        gaze = "left";
        away = true;
      } else if (avgX > vw * H_RIGHT) {
        gaze = "right";
        away = true;
      } else {
        away = false;
      }

      if (away) {
        awayStreakRef.current += 1;
      } else {
        awayStreakRef.current = 0;
      }

      if (awayStreakRef.current >= AWAY_NEED_STREAK) {
        setDebug({
          camera: "on",
          faces,
          gaze,
          absentSec: 0,
          lastSeenSec: 0,
        });
        addWarning(`You're moving too far (${gaze}). Please stay centered`);
        addActivity(`You're moving too far (${gaze}). Please stay centered`);
        // addViolation();
        return;
      }

      // update panel when normal
      setDebug({
        camera: "on",
        faces,
        gaze: gaze === "-" ? "forward" : gaze,
        absentSec: 0,
        lastSeenSec: 0,
      });
    };

    const id = setInterval(tick, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const handleFinish = async () => {
    const confirmSubmit = window.confirm("Do you want to submit the exam?");
    if (confirmSubmit) {
      setShowResultPopup(true);
      localStorage.setItem("quizFinished", "true");
      setQuizFinished(true);
      const result = calculateResult();

      try {
        await axios.post(
          "https://disenosys-dkhj.onrender.com/api/student/updateStudentQuiz",
          {
            studentId: student._id,
            // quizResults: answers,
            totalScore: result.totalScore,
            percentage: result.percentage,
            reason: reason,
            status: status,
          }
        );

        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }

        localStorage.removeItem("startTime");
        localStorage.removeItem("globalTimeRemaining");
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("answers");
        localStorage.removeItem("quizFinished");
        localStorage.removeItem("examData");
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
    localStorage.removeItem("examData");
    dispatch(LogOut());
    router.push("/");
  };

  return (
    <>
      <div className="fixed top-2 left-4 font-garet">
        <video ref={videoRef} autoPlay playsInline width="200" height="200" />
      </div>
      <div className="flex flex-col justify-end fixed top-2 font-garet right-4 border bg-red-400 text-white p-2 rounded-md shadow-md">
        <div className="font-semibold mb-1 text-center">Proctor Status</div>
        <div className="text-sm">
          Camera: <b>{debug.camera}</b>
        </div>
        <div className="text-sm">
          Faces: <b>{debug.faces}</b>
        </div>
        <div className="text-sm">
          Gaze: <b>{debug.gaze}</b>
        </div>
        {/* <div>Absent (sec): <b>{debug.absentSec}</b></div>
    <div>Last seen (sec): <b>{debug.lastSeenSec}</b></div> */}
      </div>
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
                            answers[currentQuestionIndex]?.status ===
                              "correct" ||
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
                          answer.status === "correct"
                            ? "bg-green-500"
                            : answer.status === "wrong"
                            ? "bg-red-500"
                            : answer.status === "skipped"
                            ? "bg-yellow-500"
                            : "bg-[#182073]"
                        }`}
                        onClick={() => handleRevisitSkippedQuestion(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col lg:flex-row lg:justify-between">
                    <button
                      onClick={handleFinish}
                      className="bg-blue-500 hover:bg-blue-300 mb-2 lg:mb-0 text-white font-semibold p-1 lg:py-2 lg:px-4 rounded"
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
    </>
  );
};

export default Quiz;
