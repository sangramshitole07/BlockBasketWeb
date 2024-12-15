import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { Payment } from '@/types/milk';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PaymentAnalyticsChartProps {
  payments: Payment[];
  timeframe: 'week' | 'month';
}

export function PaymentAnalyticsChart({ payments, timeframe }: PaymentAnalyticsChartProps) {
  const processData = () => {
    const now = new Date();
    const timeframeStart = new Date(now);
    if (timeframe === 'week') {
      timeframeStart.setDate(now.getDate() - 7);
    } else {
      timeframeStart.setMonth(now.getMonth() - 1);
    }

    const filteredPayments = payments.filter(
      payment => new Date(payment.date) >= timeframeStart
    );

    const dailyPayments: { [key: string]: number } = {};
    filteredPayments.forEach(payment => {
      const date = new Date(payment.date).toLocaleDateString();
      dailyPayments[date] = (dailyPayments[date] || 0) + payment.amount;
    });

    return {
      labels: Object.keys(dailyPayments),
      data: Object.values(dailyPayments),
    };
  };

  const { labels, data } = processData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Payments (₹)',
        data,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Payment Analytics - Last ${timeframe === 'week' ? 'Week' : 'Month'}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '₹',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
}