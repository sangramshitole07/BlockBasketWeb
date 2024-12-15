import React, { useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { MilkEntry, Payment } from '@/types/milk';
import { Card } from '@/components/ui/card';
import { useOverallAnalytics } from '@/hooks/useOverallAnalytics';
import { commonOptions } from './ChartRegistry';

interface OverallAnalyticsProps {
  entries: MilkEntry[];
  payments: Payment[];
  timeframe: 'week' | 'month';
}

export function OverallAnalytics({ entries, payments, timeframe }: OverallAnalyticsProps) {
  const analytics = useOverallAnalytics(entries, payments);

  const chartData = useMemo(() => ({
    production: {
      labels: analytics.dailyProduction.map(d => d.date),
      datasets: [{
        label: 'Daily Production (L)',
        data: analytics.dailyProduction.map(d => d.quantity),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      }],
    },
    quality: {
      labels: analytics.qualityTrends.map(d => d.date),
      datasets: [
        {
          label: 'Average Fat Content (%)',
          data: analytics.qualityTrends.map(d => d.fatContent),
          borderColor: 'rgb(234, 88, 12)',
          backgroundColor: 'rgba(234, 88, 12, 0.5)',
          tension: 0.4,
        },
        {
          label: 'Average SNF (%)',
          data: analytics.qualityTrends.map(d => d.snf),
          borderColor: 'rgb(22, 163, 74)',
          backgroundColor: 'rgba(22, 163, 74, 0.5)',
          tension: 0.4,
        },
      ],
    },
    payments: {
      labels: analytics.paymentTrends.map(d => d.date),
      datasets: [{
        label: 'Daily Payments (₹)',
        data: analytics.paymentTrends.map(d => d.amount),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
      }],
    },
  }), [analytics]);

  const chartOptions = useMemo(() => ({
    production: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        title: {
          display: true,
          text: `Production Trend - Last ${timeframe}`,
        },
      },
    },
    quality: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        title: {
          display: true,
          text: `Quality Trends - Last ${timeframe}`,
        },
      },
    },
    payments: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        title: {
          display: true,
          text: `Payment Distribution - Last ${timeframe}`,
        },
      },
    },
  }), [timeframe]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Production">
          <div className="text-3xl font-bold text-blue-600">
            {analytics.totalQuantity.toFixed(1)}L
          </div>
          <div className="text-sm text-gray-500">
            Last {timeframe}
          </div>
        </Card>

        <Card title="Average Quality">
          <div className="space-y-2">
            <div>
              <div className="text-sm text-gray-500">Fat Content</div>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.avgQuality.fatContent.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">SNF</div>
              <div className="text-2xl font-bold text-green-600">
                {analytics.avgQuality.snf.toFixed(1)}%
              </div>
            </div>
          </div>
        </Card>

        <Card title="Total Payments">
          <div className="text-3xl font-bold text-purple-600">
            ₹{analytics.totalPayments.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">
            Last {timeframe}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Production Trend">
          <div className="h-[300px]">
            <Line 
              data={chartData.production} 
              options={chartOptions.production}
              key={`production-${timeframe}`}
            />
          </div>
        </Card>

        <Card title="Quality Trends">
          <div className="h-[300px]">
            <Line 
              data={chartData.quality} 
              options={chartOptions.quality}
              key={`quality-${timeframe}`}
            />
          </div>
        </Card>

        <Card title="Payment Distribution">
          <div className="h-[300px]">
            <Bar 
              data={chartData.payments} 
              options={chartOptions.payments}
              key={`payments-${timeframe}`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}