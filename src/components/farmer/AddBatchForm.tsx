import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { MilkBatch } from '@/types/milk';

interface AddBatchFormProps {
  onSubmit: (batch: Omit<MilkBatch, 'id' | 'qrCode'>) => void;
  onCancel: () => void;
}

export function AddBatchForm({ onSubmit, onCancel }: AddBatchFormProps) {
  const [formData, setFormData] = useState({
    quantity: '',
    fatContent: '',
    snf: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: new Date().toISOString(),
      status: 'collecting',
      quantity: Number(formData.quantity),
      quality: {
        fatContent: Number(formData.fatContent),
        snf: Number(formData.snf),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">Add New Batch</h3>
      
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity (Liters)
        </label>
        <input
          type="number"
          id="quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          step="0.1"
        />
      </div>

      <div>
        <label htmlFor="fatContent" className="block text-sm font-medium text-gray-700">
          Fat Content (%)
        </label>
        <input
          type="number"
          id="fatContent"
          value={formData.fatContent}
          onChange={(e) => setFormData({ ...formData, fatContent: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <div>
        <label htmlFor="snf" className="block text-sm font-medium text-gray-700">
          SNF (%)
        </label>
        <input
          type="number"
          id="snf"
          value={formData.snf}
          onChange={(e) => setFormData({ ...formData, snf: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Batch
        </Button>
      </div>
    </form>
  );
}