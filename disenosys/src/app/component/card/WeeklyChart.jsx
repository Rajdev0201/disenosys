import React, { useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { Online } from "@/app/Redux/action/onlineStd";

// Register chart elements
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartsMonth = () => {
  const { online } = useSelector((state) => state.online);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Online());
  }, [dispatch]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const monthlyData = useMemo(() => {
    const counts = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    online?.data?.forEach((student) => {
      const date = new Date(student.createdAt);
      const month = months[date.getMonth()];
      counts[month] += 1;
    });

    return counts;
  }, [online]);

  const values = months.map((month) => monthlyData[month]);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Applications",
        data: values,
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#007BFF",
        tension: 0.3,
        pointBackgroundColor: "#007BFF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = monthlyData[label] || 0;
            return `${label}: ${value} applied`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md border-2 border-gray-300 rounded-md p-6">
      <h4 className="text-center mb-4 text-lg font-semibold">Monthly SAF Applications</h4>
      <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default ChartsMonth;
