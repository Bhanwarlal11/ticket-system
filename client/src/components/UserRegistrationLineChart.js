import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const UserRegistrationLineChart = () => {
  const [timeframe, setTimeframe] = useState('day'); // Default timeframe

  // Sample data
  const data = {
    day: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'User',
          data: [5, 10, 15, 20, 10, 5, 7],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4, // Smooth curve
        },
        {
          label: 'Team Member',
          data: [7, 12, 18, 24, 15, 10, 9],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Manager',
          data: [2, 5, 8, 12, 7, 3, 4],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Admin',
          data: [1, 3, 5, 7, 4, 2, 1],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
        },
      ],
    },
    week: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'User',
          data: [50, 80, 70, 100],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Team Member',
          data: [60, 90, 85, 110],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Manager',
          data: [20, 30, 25, 40],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Admin',
          data: [10, 15, 12, 18],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
        },
      ],
    },
    month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'User',
          data: [300, 400, 350, 500, 450, 480, 470, 520, 540, 600, 620, 630],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Team Member',
          data: [320, 430, 370, 510, 460, 490, 480, 530, 550, 610, 630, 640],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Manager',
          data: [120, 130, 125, 140, 135, 150, 145, 160, 170, 180, 185, 190],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Admin',
          data: [60, 70, 65, 75, 70, 80, 75, 85, 90, 95, 100, 105],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `User Registration Trends (${timeframe.toUpperCase()})`,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div style={styles.chartContainer}>
      <h2 style={styles.chartTitle}>User Registration Over Time</h2>
      <div style={styles.buttonGroup}>
        <button
          style={timeframe === 'day' ? styles.activeButton : styles.button}
          onClick={() => setTimeframe('day')}
        >
          Day
        </button>
        <button
          style={timeframe === 'week' ? styles.activeButton : styles.button}
          onClick={() => setTimeframe('week')}
        >
          Week
        </button>
        <button
          style={timeframe === 'month' ? styles.activeButton : styles.button}
          onClick={() => setTimeframe('month')}
        >
          Month
        </button>
      </div>
      <div style={styles.chartWrapper}>
        <Line data={data[timeframe]} options={options} />
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  activeButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0056b3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  chartWrapper: {
    position: 'relative',
    height: '400px',
  },
};

export default UserRegistrationLineChart;
