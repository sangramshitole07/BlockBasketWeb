import React, { useState } from 'react';
import { MilkBatch } from '@/types/milk';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AddBatchForm } from './AddBatchForm';
import { Plus } from 'lucide-react';

interface BatchUpdatesProps {
  batches: MilkBatch[];
  onAddBatch?: (batch: Omit<MilkBatch, 'id' | 'qrCode'>) => void;
}

export function BatchUpdates({ batches, onAddBatch }: BatchUpdatesProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (batch: Omit<MilkBatch, 'id' | 'qrCode'>) => {
    onAddBatch?.(batch);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Batch Updates</h2>
        {onAddBatch && (
          <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Batch
          </Button>
        )}
      </div>

      {showAddForm && (
        <AddBatchForm
          onSubmit={handleSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="space-y-4">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Batch #{batch.id}</h3>
                <p className="text-sm text-gray-500">{formatDate(batch.date)}</p>
              </div>
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                batch.status === 'delivered'
                  ? 'bg-green-100 text-green-800'
                  : batch.status === 'processing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Quantity</p>
                <p className="font-medium">{batch.quantity} L</p>
              </div>
              <div>
                <p className="text-gray-500">Fat Content</p>
                <p className="font-medium">{batch.quality.fatContent}%</p>
              </div>
              <div>
                <p className="text-gray-500">SNF</p>
                <p className="font-medium">{batch.quality.snf}%</p>
              </div>
              <div>
                <p className="text-gray-500">QR Code</p>
                <button
                  onClick={() => window.open(batch.qrCode, '_blank')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}