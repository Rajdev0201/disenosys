"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { payment } from "../Redux/action/Payment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const dispatch = useDispatch();
  const pay = useSelector((state) => state.payment);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);

  useEffect(() => {
    if (pay?.data) {
      const currentYear = new Date().getFullYear();
      const monthlyOnlineTotal = Array(12).fill(0);
      const monthlyOfflineTotal = Array(12).fill(0); 

      pay.data.forEach((item) => {
        const date = new Date(item.createdAt);
        const monthIndex = date.getMonth(); 
        const year = date.getFullYear();

        if (year === currentYear) {
          const totalAmount = item.lineItems?.reduce((sum, entry) => sum + entry.totalPrice, 0) || 0;
          if (item.mode === "Online") {
            monthlyOnlineTotal[monthIndex] += totalAmount; 
          } else if (item.mode === "Offline") {
            monthlyOfflineTotal[monthIndex] += totalAmount; 
          }
        }
      });

      setChartData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Online Payments",
            data: monthlyOnlineTotal,
            backgroundColor: "rgba(96, 227, 66, 0.5)",
          },
          {
            label: "Offline Payments",
            data: monthlyOfflineTotal,
            backgroundColor: "rgb(101, 188, 219)",
          },
        ],
      });
    }
  }, [pay]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Monthly Total Payments for ${new Date().getFullYear()}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Amount Paid (₹)",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="border shadow-sm rounded-md">
        <h2 className="text-2xl font-semibold p-3 text-gray-700">Student Payments</h2>
      </div>
      <div className="p-1 lg:p-10">
        {chartData ? <Bar data={chartData} options={options} /> : <p>Loading Chart...</p>}
      </div>
    </div>
  );
};

export default Charts;
