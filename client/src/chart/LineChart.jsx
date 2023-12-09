import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = () => {
  // Data untuk chart (contoh data)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Penjualan',
        data: [12, 19, 3, 5, 2, 3], // Data untuk sumbu Y (jumlah penjualan)
        fill: false, // Atur menjadi true jika ingin area di bawah garis terisi warna
        borderColor: 'rgba(75, 192, 192, 1)', // Warna garis
        tension: 0.0, // Tension kurva
      },
    ],
  };

  // Konfigurasi chart
  const options = {
    scales: {
      y: {
        beginAtZero: true, // Memulai sumbu Y dari 0
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
