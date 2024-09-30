"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartsWeek = () => {

  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // X-axis labels
    datasets: [
      {
        label: 'Sales',
        data: [120, 150, 180, 90, 200, 250, 300], // Y-axis data
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Data',
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  };

  return (
    <div className="p-10 bg-white shadow-md rounded-md h-96">
      <h4 className="text-lg font-semibold ">Weekly Bar Chart</h4>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartsWeek;
