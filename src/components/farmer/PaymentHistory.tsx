import React, { useState } from 'react';
import { Payment } from '@/types/milk';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AddPaymentForm } from './AddPaymentForm';
import { Plus } from 'lucide-react';

interface PaymentHistoryProps {
  payments: Payment[];
  onAddPayment?: (payment: Omit<Payment, 'id'>) => void;
}

export function PaymentHistory({ payments, onAddPayment }: PaymentHistoryProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (payment: Omit<Payment, 'id'>) => {
    onAddPayment?.(payment);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
        {onAddPayment && (
          <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Payment
          </Button>
        )}
      </div>

      {showAddForm && (
        <AddPaymentForm
          onSubmit={handleSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                  {formatDate(payment.date)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  ₹{payment.amount.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    payment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}