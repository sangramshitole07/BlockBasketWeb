import React, { useState } from 'react';
import { MilkProductionChart } from './MilkProductionChart';
import { QualityMetricsChart } from './QualityMetricsChart';
import { PaymentAnalyticsChart } from './PaymentAnalyticsChart';
import { Button } from '@/components/ui/button';
import type { MilkEntry, Payment } from '@/types/milk';

interface AnalyticsDashboardProps {
  entries: MilkEntry[];
  payments: Payment[];
}

export function AnalyticsDashboard({ entries, payments }: AnalyticsDashboardProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant={timeframe === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeframe('week')}
            className="text-sm sm:text-base"
          >
            Last Week
          </Button>
          <Button
            variant={timeframe === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeframe('month')}
            className="text-sm sm:text-base"
          >
            Last Month
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-[300px] sm:min-h-[400px]">
          <MilkProductionChart entries={entries} timeframe={timeframe} />
        </div>
        <div className="min-h-[300px] sm:min-h-[400px]">
          <QualityMetricsChart entries={entries} timeframe={timeframe} />
        </div>
        <div className="lg:col-span-2 min-h-[300px] sm:min-h-[400px]">
          <PaymentAnalyticsChart payments={payments} timeframe={timeframe} />
        </div>
      </div>
    </div>
  );
}