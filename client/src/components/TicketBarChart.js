// import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { useState } from "react";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

const TicketBarChart = () => {
  const [timeFrame, setTimeFrame] = useState("day");

  // Data for different time frames
  const chartData = {
    day: [12, 19, 3, 5, 2, 3],
    week: [100, 200, 300, 400, 500, 600],
    month: [1000, 2000, 3000, 4000, 5000, 6000],
  };

  // Chart configuration
  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"],
    datasets: [
      {
        label: `Tickets Sold (${timeFrame.toUpperCase()})`,
        data: chartData[timeFrame],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: `Tickets Overview (${timeFrame.toUpperCase()})`,
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#333",
      },
    },
    animation: {
      duration: 1500, // Duration in milliseconds
    easing: 'easeInOutQuart', // Easing function for animation
    animateScale: true, // Animates the scale (useful for pie, doughnut charts)
    animateRotate: true, 
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Ticket Sales Statistics
      </h2>

      {/* Buttons to switch time frames */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        {["day", "week", "month"].map((frame) => (
          <button
            key={frame}
            onClick={() => setTimeFrame(frame)}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: timeFrame === frame ? "#007BFF" : "#e0e0e0",
              color: timeFrame === frame ? "#fff" : "#000",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </button>
        ))}
      </div>

      {/* Render Bar Chart */}
      <div style={{ position: "relative", height: "400px", width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TicketBarChart;
