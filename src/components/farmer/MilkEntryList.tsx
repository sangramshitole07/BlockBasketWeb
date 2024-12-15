import React from 'react';
import { Button } from '@/components/ui/button';
import { MilkEntry } from '@/types/milk';
import { formatDate } from '@/lib/utils';
import { useMilkStore } from '@/store/milkStore';
import { MapPin } from 'lucide-react';

interface MilkEntryListProps {
  entries: MilkEntry[];
}

export function MilkEntryList({ entries }: MilkEntryListProps) {
  const sendToDistributor = useMilkStore((state) => state.sendToDistributor);

  const handleViewLocation = (location: MilkEntry['location']) => {
    if (location) {
      window.open(
        `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
        '_blank'
      );
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity (L)</th>
              <th className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fat (%)</th>
              <th className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SNF (%)</th>
              <th className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Temp (°C)</th>
              <th className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {formatDate(entry.submittedAt)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.quantity}
                </td>
                <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.fatContent}
                </td>
                <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.snf}
                </td>
                <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.temperature}
                </td>
                <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {entry.location && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewLocation(entry.location)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <Button
                    size="sm"
                    onClick={() => sendToDistributor(entry.id)}
                    className="text-sm"
                  >
                    Send
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}