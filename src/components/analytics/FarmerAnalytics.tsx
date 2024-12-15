import React from 'react';
import { useFarmerAnalytics } from '@/hooks/useFarmerAnalytics';
import { MilkEntry, Payment } from '@/types/milk';
import { Card } from '@/components/ui/card';

interface FarmerAnalyticsProps {
  farmerId: string;
  entries: MilkEntry[];
  payments: Payment[];
}

export function FarmerAnalytics({ farmerId, entries, payments }: FarmerAnalyticsProps) {
  const analytics = useFarmerAnalytics(farmerId, entries, payments);

  if (!farmerId) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Average Quality">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Fat Content:</span>
            <span className="font-medium">{analytics.avgFatContent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">SNF:</span>
            <span className="font-medium">{analytics.avgSnf}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Temperature:</span>
            <span className="font-medium">{analytics.avgTemperature}°C</span>
          </div>
        </div>
      </Card>

      <Card title="Production">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Avg. Quantity:</span>
            <span className="font-medium">{analytics.avgQuantity}L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Quantity:</span>
            <span className="font-medium">{analytics.totalQuantity}L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Entries:</span>
            <span className="font-medium">{analytics.totalEntries}</span>
          </div>
        </div>
      </Card>

      <Card title="Payments">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Payments:</span>
            <span className="font-medium">₹{analytics.totalPayments}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg. Per Entry:</span>
            <span className="font-medium">
              ₹{analytics.totalEntries ? (analytics.totalPayments / analytics.totalEntries).toFixed(2) : 0}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Recent Activity">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Last Entry:</span>
            <span className="font-medium">
              {analytics.entries[0]?.date ? new Date(analytics.entries[0].date).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Payment:</span>
            <span className="font-medium">
              {analytics.payments[0]?.date ? new Date(analytics.payments[0].date).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}