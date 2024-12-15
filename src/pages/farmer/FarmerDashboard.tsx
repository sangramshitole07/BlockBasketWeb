import React, { useState } from 'react';
import { MilkEntryForm } from '@/components/farmer/MilkEntryForm';
import { MilkEntryList } from '@/components/farmer/MilkEntryList';
import { PaymentHistory } from '@/components/farmer/PaymentHistory';
import { OverallAnalytics } from '@/components/analytics/OverallAnalytics';
import { useAuthStore } from '@/store/authStore';
import { useMilkStore } from '@/store/milkStore';
import { Button } from '@/components/ui/button';
import type { Payment } from '@/types/milk';

export function FarmerDashboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');
  const { user } = useAuthStore();
  const { 
    entries, 
    payments,
    addEntry, 
    addPayment,
    pendingDistributorEntries 
  } = useMilkStore();

  const handleMilkEntry = (entry: Omit<MilkEntry, 'id' | 'batchId'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      batchId: `batch${Date.now()}`,
    };
    addEntry(newEntry);
  };

  const handleAddPayment = (payment: Omit<Payment, 'id'>) => {
    addPayment(payment);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Daily Milk Entry</h2>
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <MilkEntryForm onSubmit={handleMilkEntry} />
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Entries</h2>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <MilkEntryList entries={pendingDistributorEntries} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Overall Analytics</h2>
            <div className="flex gap-2">
              <Button
                variant={timeframe === 'week' ? 'default' : 'outline'}
                onClick={() => setTimeframe('week')}
              >
                Last Week
              </Button>
              <Button
                variant={timeframe === 'month' ? 'default' : 'outline'}
                onClick={() => setTimeframe('month')}
              >
                Last Month
              </Button>
            </div>
          </div>
          <OverallAnalytics
            entries={entries}
            payments={payments}
            timeframe={timeframe}
          />
        </div>

        <div>
          <PaymentHistory 
            payments={payments} 
            onAddPayment={handleAddPayment}
          />
        </div>
      </div>
    </div>
  );
}