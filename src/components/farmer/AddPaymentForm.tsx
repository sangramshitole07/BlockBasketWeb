import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Payment } from '@/types/milk';

interface AddPaymentFormProps {
  onSubmit: (payment: Omit<Payment, 'id'>) => void;
  onCancel: () => void;
}

export function AddPaymentForm({ onSubmit, onCancel }: AddPaymentFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    batchIds: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: new Date().toISOString(),
      amount: Number(formData.amount),
      status: 'pending',
      batchIds: formData.batchIds.filter(id => id.trim() !== ''),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">Add New Payment</h3>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (₹)
        </label>
        <input
          type="number"
          id="amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Batch IDs
        </label>
        {formData.batchIds.map((batchId, index) => (
          <div key={index} className="mt-1 flex gap-2">
            <input
              type="text"
              value={batchId}
              onChange={(e) => {
                const newBatchIds = [...formData.batchIds];
                newBatchIds[index] = e.target.value;
                setFormData({ ...formData, batchIds: newBatchIds });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter batch ID"
            />
            {index === formData.batchIds.length - 1 ? (
              <Button
                type="button"
                onClick={() => setFormData({ ...formData, batchIds: [...formData.batchIds, ''] })}
              >
                +
              </Button>
            ) : (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  const newBatchIds = formData.batchIds.filter((_, i) => i !== index);
                  setFormData({ ...formData, batchIds: newBatchIds });
                }}
              >
                -
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Payment
        </Button>
      </div>
    </form>
  );
}