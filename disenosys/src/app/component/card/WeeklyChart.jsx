import React, { useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { Online } from "@/app/Redux/action/onlineStd";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartsMonth = () => {
  const online = useSelector((state) => state.online); // Get data from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Online()); // Fetch online students data
  }, [dispatch]);

  // Define months in correct order
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Unique colors for each month
  const backgroundColors = [
    "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6",
    "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
    "#80B300", "#809900"
  ];

  // Process data for monthly count
  const monthlyData = useMemo(() => {
    const counts = months.reduce((acc, month) => {
      acc[month] = 0; // Initialize all months with zero
      return acc;
    }, {});

    online?.data?.forEach((student) => {
      const date = new Date(student.createdAt);
      const month = months[date.getMonth()]; // Get month from index
      counts[month] += 1;
    });

    return counts;
  }, [online]);

  // Ensure chart shows 12 equal parts
  const values = months.map((month) => Math.max(1, monthlyData[month])); // Ensure at least '1' to show all parts

  const doughnutData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Applications",
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map((color) => color.replace("0.6", "1")), // Darker borders
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "50%", // Makes the doughnut rounded
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = monthlyData[label] || 0; // Show actual value
            return `${label}: ${value} applied`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md border-2 border-gray-300 rounded-md p-6 flex flex-col items-center">
    <h4 className="text-center mb-4 text-lg font-semibold">Monthly SAF Applications</h4>
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      <Doughnut data={doughnutData} options={options} />
    </div>
  </div>
  );
};

export default ChartsMonth;
