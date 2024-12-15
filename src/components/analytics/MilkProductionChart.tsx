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
import type { MilkEntry } from '@/types/milk';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MilkProductionChartProps {
  entries: MilkEntry[];
  timeframe: 'week' | 'month';
}

export function MilkProductionChart({ entries, timeframe }: MilkProductionChartProps) {
  const processData = () => {
    const now = new Date();
    const timeframeStart = new Date(now);
    if (timeframe === 'week') {
      timeframeStart.setDate(now.getDate() - 7);
    } else {
      timeframeStart.setMonth(now.getMonth() - 1);
    }

    const filteredEntries = entries.filter(
      entry => new Date(entry.date) >= timeframeStart
    );

    const dailyQuantities: { [key: string]: number } = {};
    filteredEntries.forEach(entry => {
      const date = new Date(entry.date).toLocaleDateString();
      dailyQuantities[date] = (dailyQuantities[date] || 0) + entry.quantity;
    });

    return {
      labels: Object.keys(dailyQuantities),
      data: Object.values(dailyQuantities),
    };
  };

  const { labels, data } = processData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Milk Production (Liters)',
        data,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
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
        text: `Milk Production - Last ${timeframe === 'week' ? 'Week' : 'Month'}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Liters',
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