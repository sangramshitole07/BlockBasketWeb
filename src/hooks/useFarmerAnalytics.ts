import { useMemo } from 'react';
import { MilkEntry, Payment } from '@/types/milk';
import { calculateAverages, calculateTotals } from '@/lib/analytics';

export function useFarmerAnalytics(farmerId: string, entries: MilkEntry[], payments: Payment[]) {
  const farmerData = useMemo(() => {
    const farmerEntries = entries.filter(entry => entry.farmerId === farmerId);
    const farmerPayments = payments.filter(payment => 
      payment.batchIds.some(batchId => 
        farmerEntries.some(entry => entry.batchId === batchId)
      )
    );

    return {
      entries: farmerEntries,
      payments: farmerPayments,
      ...calculateAverages(farmerEntries),
      ...calculateTotals(farmerEntries, farmerPayments)
    };
  }, [farmerId, entries, payments]);

  return farmerData;
}