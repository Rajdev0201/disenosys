"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import d from "../assests/profile/d.avif";
import { SiGooglemeet } from "react-icons/si";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { block, payment, takenAmt } from "../Redux/action/consult.js";
import { AiOutlineCheck, AiOutlineFileDone } from "react-icons/ai";

const Consultation = () => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );
  const dispatch = useDispatch();
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  useEffect(() => {
    dispatch(takenAmt())
  },[dispatch])

  const consult = useSelector((state) => state?.consult?.amt);
  const price = consult?.[0]?.amt; 
  const daysUntilFriday = (5 - today.getDay() + 7) % 7; 
  const comingFriday = new Date(today);
  comingFriday.setDate(today.getDate() + daysUntilFriday);
  const fridayDate = comingFriday.toISOString().split("T")[0];

 
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Kolkata");
  const [timezones, setTimezones] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const paid = useSelector((state) => state.consult);
  const checkout = paid.checkout;
  const blockDate = paid.block;
  const [bookedSlots, setBookedSlots] = useState([]);


  blockDate?.data?.map((block) => {
    console.log(
      `Block Start: ${new Date(block.startTimeUTC)} - Block End: ${new Date(
        block.endTimeUTC
      )}`
    );
  });



  useEffect(() => {
    dispatch(payment());
    dispatch(block());
  }, [dispatch]);

  useEffect(() => {
    const booked = checkout?.data?.map((item) => {
      return {
        date: item?.customerDetails?.bookeddate,
        time: item?.customerDetails?.bookedtime,
      };
    });
    setBookedSlots(booked);
  }, [paid]);

  useEffect(() => {
    const apiKey = "9RXLN3DZKG5A";
    axios
      .get(
        `https://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`
      )
      .then((response) => {
        const formattedZones = response.data.zones.map((zone) => {
          const offsetHours = zone.gmtOffset / 3600;
          const offsetSign = offsetHours >= 0 ? "+" : "-";
          const formattedOffset = `GMT${offsetSign}${Math.abs(offsetHours)
            .toString()
            .padStart(2, "0")}:00`;
          return {
            value: zone.zoneName,
            label: `(${formattedOffset}) ${zone.countryName}, ${
              zone.zoneName.split("/")[1]?.replace("_", " ") || ""
            } (${zone.abbreviation || ""})`,
          };
        });
        setTimezones(formattedZones);
        setSelectedTimezone("Asia/Kolkata");
      })
      .catch((error) => console.error("Error fetching timezones:", error));
  }, []);

  useEffect(() => {
    generateTimeSlots();
  }, [selectedTimezone, selectedDate]);

  blockDate?.data?.map((block, index) => {
    const startTime = new Date(block.startTimeUTC);
    const endTime = new Date(block.endTimeUTC);

    const formattedStartTime = startTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedEndTime = endTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = startTime.toLocaleDateString("en-US");

    // console.log(
    //   `Blocked Date: ${formattedDate}, Block Start: ${formattedStartTime} - Block End: ${formattedEndTime}`
    // );
  });


  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(10, 0, 0, 0);
    endTime.setHours(19, 45, 0, 0);

    while (startTime <= endTime) {
      const timeInSelectedTimezone = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: selectedTimezone,
      }).format(startTime);

      const slotDate = selectedDate;
      const slotTime = timeInSelectedTimezone;

      const isBooked = bookedSlots?.some(
        (slot) => slot?.date === slotDate && slot?.time === slotTime
      );

      const isBlocked = blockDate?.data?.some((block) => {
        const blockStartUTC = new Date(block.startTimeUTC);
        const blockEndUTC = new Date(block.endTimeUTC);

        const blockStartLocal = new Date(
          blockStartUTC.toLocaleString("en-US", { timeZone: selectedTimezone })
        );
        const blockEndLocal = new Date(
          blockEndUTC.toLocaleString("en-US", { timeZone: selectedTimezone })
        );

        const slotDateTime = new Date(`${slotDate} ${slotTime}`);
        return slotDateTime >= blockStartLocal && slotDateTime < blockEndLocal;
      });

      if (!isBooked && !isBlocked) {
        slots.push(timeInSelectedTimezone);
      }

      startTime.setMinutes(startTime.getMinutes() + 15);
    }

    setTimeSlots(slots);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || !selectedTimezone) {
      alert("Please select all fields");
      return;
    }

    const endTime = getEndTime(selectedTime);
    const url = `/confirmation?date=${encodeURIComponent(
      selectedDate
    )}&time=${encodeURIComponent(selectedTime)} - ${encodeURIComponent(
      endTime
    )}&timezone=${encodeURIComponent(selectedTimezone)}`;
    router.push(url);
  };

  const getEndTime = (time) => {
    const [hour, minutePart] = time.split(":");
    let minutes = parseInt(minutePart.slice(0, 2), 10);
    let period = minutePart.slice(3);

    minutes += 15;
    if (minutes >= 60) {
      minutes -= 60;
      let hourNum = parseInt(hour, 10) + 1;
      if (hourNum === 12) period = period === "AM" ? "PM" : "AM";
      if (hourNum > 12) hourNum = 1;
      return `${hourNum}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
    return `${hour}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className="bg-black h-full">
      <div className="grid grid-cols-1 lg:grid-cols-[700px_600px] px-0 lg:px-24 py-2 lg:py-24 gap-4 mt-16 font-garet">
        <div className="bg-white rounded-lg shadow-lg h-auto">
        {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              <h1 className="text-lg font-semibold font-garet">
                This is not open yet. Please wait for the opening date.
              </h1>
            </div>
          </div> */}
          <div className="bg-gray-200 rounded-lg shadow-lg flex justify-between items-center p-12">
            <h2 className="text-md lg:text-3xl w-44 lg:w-96 font-bold  lg:ml-10 text-[#182073]">
              Job Consultation for Freshers in Auto Design
            </h2>
            <Image
              src={d}
              alt="Consultation Image"
              className="w-20 h-20 lg:w-28 lg:h-28 rounded-full ring ring-2 ring-[#182073]"
            />
          </div>
          <div className="flex w-full justify-center border-b-2 items-center">
            <div className="p-4 border-r-2 border-gray-200 rounded w-[300px] text-center">
              <h2 className="border-2 lg:mr-16 border-gray-700 rounded-full p-2 text-sm font-bold ">
                <span className="line-through ">₹ 1,999</span>{" "}
                  {price > 0 ? (
                <b className="text-[#182073] text-lg">₹{price}+</b>
                  ) : (
                    <b className="text-[#182073] text-lg">₹{price}</b>
                  )}
              </h2>
            </div>
            <div className="p-4 w-[260px] text-start lg:text-center">
              <h2 className="gap-2 rounded-full p-2 text-md lg:text-xl font-bold  text-[#182073] flex items-center">
                <SiGooglemeet className="text-[#182073] w-10 h-10 lg:w-6 lg:h-6" />
                15 mins meeting
              </h2>
            </div>
          </div>

          <div className="px-16 py-4 text-lg  font-medium text-gray-500 space-y-4">
            <p>
              Dive headfirst into the dynamic world of Product Design with our
              exclusive session tailored specifically for freshers! Whether
              you&apos;re overwhelmed by the vast sea of information online or
              craving clear, practical insights, you&apos;ve come to the right
              place. My name is Praveen Kumar, and with over a decade of
              experience in the automotive industry, I&apos;m here to shed light
              on what it truly means to be a Product Designer.
            </p>
            <h2>Here&apos;s what you can expect from our session:</h2>
            <h4>
              <b>Real-world Insights:</b> Understand the core responsibilities
              and day-to-day activities of a Product Designer.
            </h4>
            <h4>
              <b>Essential Skills:</b> Learn about the key skills required to
              excel in this role, including hands-on experience with popular
              modeling tools like CATIA V5, Siemens NX, and Solidworks.
            </h4>
            <h4>
              <b>Career Guidance:</b> Receive actionable advice on how to
              kickstart your career in the automotive design field.
            </h4>
            <p>
              Our sessions are backed by the rich expertise at DISENOSYS—a
              premier edtech platform in India, known for its industry-relevant
              curriculum and 100% Placement assistance policy. DISENOSYS has
              proudly uplifted the careers of over 200 students by harmonizing
              their skills with industry demands.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg h-[570px]">
        <h4 className="text-lg font-bold  mb-4 text-[#182073]">
            When should we meet?
          </h4>

          <div className="mb-4">
            <input
              type="date"
              min={todayDate} 
              max={fridayDate} 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border-2 border-[#182073] rounded-lg p-2"
            />
          </div>
          <h4 className="text-lg font-bold  mb-4 mt-4 text-[#182073]">
            Select time of day
          </h4>

          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-scroll h-40 border-2 border-gray-200 p-2 rounded-lg">
  {timeSlots?.map((time, index) => {
    // Convert the time slot to a Date object in the selected timezone
    const slotDateTime = new Date(`${selectedDate} ${time}`);
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: selectedTimezone,
    });

    // Check if the slot is booked
    const isBooked = bookedSlots?.some((slot) => {
      const [startTime] = slot?.time?.split(" - ");
      return slot?.date === selectedDate && startTime === time;
    });

    // Check if the slot is in the past
    const isPastTime = slotDateTime < new Date(currentTime);

    // Check if the slot is blocked
    const isBlocked = blockDate?.data?.some((block) => {
      const blockStartTimeUTC = new Date(block.startTimeUTC);
      const blockEndTimeUTC = new Date(block.endTimeUTC);

      const blockStartTimeLocal = new Date(
        blockStartTimeUTC.getTime() + 5.5 * 60 * 60 * 1000
      );
      const blockEndTimeLocal = new Date(
        blockEndTimeUTC.getTime() + 5.5 * 60 * 60 * 1000
      );

      const slotDateTimeLocal = new Date(
        slotDateTime.toLocaleString("en-US", {
          timeZone: selectedTimezone,
        })
      );

      return (
        slotDateTimeLocal >= blockStartTimeLocal &&
        slotDateTimeLocal < blockEndTimeLocal
      );
    });

    // Determine the button class based on conditions
    let buttonClass = "p-2 text-center border rounded-lg ";

    if (isPastTime) {
      // Past time overrides booked or blocked
      buttonClass += "bg-green-400 text-white";
    } else if (isBooked) {
      buttonClass += "bg-gray-400 cursor-not-allowed";
    } else if (isBlocked) {
      buttonClass += "bg-gray-400 cursor-not-allowed";
    } else {
      buttonClass += "border border-[#182073] text-gray-700";
    }

    if (selectedTime === time) {
      buttonClass = "p-2 text-center rounded-lg bg-[#182073] text-white"; // Selected
    }

    return (
      <button
        key={index}
        onClick={() =>
          !isBooked &&
          !isPastTime &&
          !isBlocked &&
          setSelectedTime(time)
        }
        className={buttonClass}
        disabled={isPastTime}
      >
        { isPastTime ? (
          // Completed status for past time
          <h4 className="flex items-center justify-center gap-2 text-sm  text-white font-medium ">
            Completed
            <span> <AiOutlineCheck className="text-white w-4 h-4" /></span>
         
          </h4>
        ) : isBooked ? (
          <h4 className="flex items-center justify-center gap-2 text-sm text-white font-medium">
            Booked{" "}
            <AiOutlineFileDone className="text-white w-6 h-6" />
          </h4>
        ) : isBlocked ? (
          <h4 className="flex items-center justify-center gap-2 text-sm text-white font-medium">
            Blocked{" "}
            <AiOutlineFileDone className="text-white w-6 h-6" />
          </h4>
        ) : (
          time
        )}
      </button>
    );
  })}
</div>

          

          <div className="mt-6">
            <label className="block text-sm font-bold mb-2 text-[#182073]">
              Timezone
            </label>
            <select
              value={selectedTimezone}
              onChange={(e) => {
                setSelectedTimezone(e.target.value);
                generateTimeSlots();
              }}
              className="w-full border-2 border-[#182073] rounded-lg p-2"
            >
              {timezones.map((zone, index) => (
                <option key={index} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleConfirm}
            className="w-full mt-8 bg-[#182073] text-white p-3 rounded-lg text-lg font-bold "
          >
            Confirm Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
