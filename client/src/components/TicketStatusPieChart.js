import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const TicketStatusPieChart = () => {
  const ticketData = {
    Open: 50,
    Awaited: 30,
    Resolved: 10,
    Closed: 10,
  };

  const data = ticketData;

  // Chart.js configuration
  const chartData = {
    labels: Object.keys(data), // Ticket statuses as labels
    datasets: [
      {
        label: 'Ticket Status Distribution',
        data: Object.values(data), // Number of tickets per status
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Open
          'rgba(54, 162, 235, 0.6)', // Awaited
          'rgba(75, 192, 192, 0.6)', // Resolved
          'rgba(153, 102, 255, 0.6)', // Closed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Open
          'rgba(54, 162, 235, 1)', // Awaited
          'rgba(75, 192, 192, 1)', // Resolved
          'rgba(153, 102, 255, 1)', // Closed
        ],
        borderWidth: 2,
        hoverOffset: 8, // Added hover effect
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
      animateScale: true, // Animate the scale of the pie chart
    animateRotate: true,
    },
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      textAlign: 'center',
    },
    title: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      color: '#4A4A4A',
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
      <h2 style={styles.title}>Ticket Status Distribution</h2>
      <div style={styles.chartWrapper}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TicketStatusPieChart;
