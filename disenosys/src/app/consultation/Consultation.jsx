"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import d from "../assests/profile/d.avif";
import { SiGooglemeet } from "react-icons/si";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../Redux/action/consult.js";
import { AiOutlineFileDone } from "react-icons/ai";

const Consultation = () => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Kolkata");
  const [timezones, setTimezones] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const paid = useSelector((state) => state.consult);
  const [bookedSlots, setBookedSlots] = useState([]);


  console.log(paid);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);

  useEffect(() => {
    const booked = paid?.data?.map((item) => {
      return {
        date: item.customerDetails.bookeddate,
        time: item.customerDetails.bookedtime,
      };
    });
    setBookedSlots(booked);
  }, [paid]);

  useEffect(() => {
    const apiKey = "9RXLN3DZKG5A";
    axios
      .get(
        `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`
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

  // const generateTimeSlots = () => {
  //   const slots = [];
  //   const startTime = new Date();

  //   startTime.setMinutes(Math.ceil(startTime.getMinutes() / 15) * 15, 0, 0);

  //   while (startTime.getHours() < 18 || (startTime.getHours() === 18 && startTime.getMinutes() <= 45)) {
  //     const formattedTime = startTime.toLocaleTimeString("en-US", {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       hour12: true,
  //       timeZone: selectedTimezone,
  //     });
  //     slots.push(formattedTime);
  //     startTime.setMinutes(startTime.getMinutes() + 15);
  //   }

  //   setTimeSlots(slots);
  // };

  const generateTimeSlots = () => {
    const slots = [];
    const indianStartTime = new Date();
    const indianEndTime = new Date();

    indianStartTime.setHours(10, 0, 0, 0);
    indianEndTime.setHours(15, 45, 0, 0);

    while (indianStartTime <= indianEndTime) {
      const timeInSelectedTimezone = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: selectedTimezone,
      }).format(indianStartTime);

      const slotDate = selectedDate;
      const slotTime = timeInSelectedTimezone;

      const isBooked = bookedSlots.some(
        (slot) => slot.date === slotDate && slot.time === slotTime
      );

      if (!isBooked) {
        slots.push(timeInSelectedTimezone);
      }

      indianStartTime.setMinutes(indianStartTime.getMinutes() + 15);
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
      <div className="grid grid-cols-1 lg:grid-cols-[700px_600px] mx-auto container py-2 lg:py-24 gap-4 mt-24">
        <div className="bg-white rounded-lg shadow-lg h-auto">
          <div className="bg-gray-200 rounded-lg shadow-lg flex justify-between items-center p-12">
            <h2 className="text-md lg:text-3xl w-44 lg:w-96 font-bold font-poppins lg:ml-10 text-[#182073]">
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
              <h2 className="border-2 lg:mr-16 border-gray-700 rounded-full p-2 text-sm font-bold font-poppins">
                <span className="line-through ">₹ 1,999</span>{" "}
                <b className="text-[#182073] text-lg">₹199+</b>
              </h2>
            </div>
            <div className="p-4 w-[260px] text-start lg:text-center">
              <h2 className="gap-2 rounded-full p-2 text-md lg:text-xl font-bold font-poppins text-[#182073] flex items-center">
                <SiGooglemeet className="text-[#182073] w-10 h-10 lg:w-6 lg:h-6" />
                15 mins meeting
              </h2>
            </div>
          </div>

          <div className="px-16 py-4 text-lg font-poppins font-medium text-gray-500 space-y-4">
            <p>
              Dive headfirst into the dynamic world of Product Design with our
              exclusive session tailored specifically for freshers! Whether
              you&apos;re overwhelmed by the vast sea of information online or
              craving clear, practical insights, you&apos;ve come to the right place.
              My name is Praveen Kumar, and with over a decade of experience in
              the automotive industry, I&apos;m here to shed light on what it truly
              means to be a Product Designer.
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

        <div className="bg-white p-8 rounded-lg shadow-lg h-[540px]">
          <h4 className="text-lg font-bold font-poppins mb-4 text-[#182073]">
            When should we meet?
          </h4>
          <div className="mb-4">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              max="2028-12-31"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border-2 border-[#182073] rounded-lg p-2"
            />
          </div>
          <h4 className="text-lg font-bold font-poppins mb-4 mt-4 text-[#182073]">
            Select time of day
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-scroll h-40 border-2 border-gray-200 p-2 rounded-lg">
            {timeSlots?.map((time, index) => {
              const isBooked = bookedSlots?.some((slot) => {
                const [startTime] = slot.time.split(" - ");
                return slot.date === selectedDate && startTime === time;
              });
              return (
                <button
                  key={index}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  className={`p-2 text-center border rounded-lg ${
                    selectedTime === time
                      ? "bg-[#182073] text-white"
                      : "border border-[#182073] text-gray-700"
                  } ${isBooked ? "bg-gray-300 cursor-not-allowed" : ""}`}
                  disabled={isBooked}
                >
                  {isBooked ? <h4 className="flex items-center justify-center gap-2 text-[#182073] font-bold font-poppins">Booked <AiOutlineFileDone className="text-[#182073] w-6 h-6"/></h4> : time}
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
            className="w-full mt-8 bg-[#182073] text-white p-3 rounded-lg text-lg font-bold font-poppins"
          >
            Confirm Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
