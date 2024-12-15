import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { MilkEntry } from '@/types/milk';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface QualityMetricsChartProps {
  entries: MilkEntry[];
  timeframe: 'week' | 'month';
}

export function QualityMetricsChart({ entries, timeframe }: QualityMetricsChartProps) {
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

    const dates = filteredEntries.map(entry => 
      new Date(entry.date).toLocaleDateString()
    );
    const fatContent = filteredEntries.map(entry => entry.fatContent);
    const snf = filteredEntries.map(entry => entry.snf);

    return { dates, fatContent, snf };
  };

  const { dates, fatContent, snf } = processData();

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Fat Content (%)',
        data: fatContent,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'SNF (%)',
        data: snf,
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.5)',
        tension: 0.4,
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
        text: `Milk Quality Metrics - Last ${timeframe === 'week' ? 'Week' : 'Month'}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage (%)',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Line data={data} options={options} />
    </div>
  );
}