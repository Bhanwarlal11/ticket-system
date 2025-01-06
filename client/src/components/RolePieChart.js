import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const RolePieChart = () => {
  const roleData = {
    User: 80,
    TeamMember: 40,
    Manager: 20,
    Admin: 10,
  };

  const data = roleData;

  // Chart.js configuration
  const chartData = {
    labels: Object.keys(data), // Roles as labels
    datasets: [
      {
        label: 'User Role Distribution',
        data: Object.values(data), // Number of users per role
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // User
          'rgba(54, 162, 235, 0.6)', // TeamMember
          'rgba(255, 206, 86, 0.6)', // Manager
          'rgba(75, 192, 192, 0.6)', // Admin
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // User
          'rgba(54, 162, 235, 1)', // TeamMember
          'rgba(255, 206, 86, 1)', // Manager
          'rgba(75, 192, 192, 1)', // Admin
        ],
        borderWidth: 2,
        hoverOffset: 10, // Increase offset on hover for interactivity
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const total = Object.values(data).reduce((sum, num) => sum + num, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce',
    },
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      textAlign: 'center',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
    },
    chartWrapper: {
      position: 'relative',
      height: '400px',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Role Distribution</h2>
      <div style={styles.chartWrapper}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RolePieChart;
