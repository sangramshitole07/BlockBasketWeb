import { MilkEntry, Payment } from '@/types/milk';

export function calculateAverages(entries: MilkEntry[]) {
  if (entries.length === 0) return {
    avgFatContent: 0,
    avgSnf: 0,
    avgQuantity: 0,
    avgTemperature: 0
  };

  const totals = entries.reduce((acc, entry) => ({
    fatContent: acc.fatContent + entry.fatContent,
    snf: acc.snf + entry.snf,
    quantity: acc.quantity + entry.quantity,
    temperature: acc.temperature + entry.temperature
  }), { fatContent: 0, snf: 0, quantity: 0, temperature: 0 });

  return {
    avgFatContent: Number((totals.fatContent / entries.length).toFixed(2)),
    avgSnf: Number((totals.snf / entries.length).toFixed(2)),
    avgQuantity: Number((totals.quantity / entries.length).toFixed(2)),
    avgTemperature: Number((totals.temperature / entries.length).toFixed(2))
  };
}

export function calculateTotals(entries: MilkEntry[], payments: Payment[]) {
  return {
    totalQuantity: Number(entries.reduce((sum, entry) => sum + entry.quantity, 0).toFixed(2)),
    totalPayments: Number(payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)),
    totalEntries: entries.length
  };
}

export function groupEntriesByDate(entries: MilkEntry[], timeframe: 'week' | 'month' = 'week') {
  const grouped: { [key: string]: number } = {};
  const now = new Date();
  const timeframeStart = new Date(now);
  
  if (timeframe === 'week') {
    timeframeStart.setDate(now.getDate() - 7);
  } else {
    timeframeStart.setMonth(now.getMonth() - 1);
  }

  entries.forEach(entry => {
    const date = new Date(entry.date);
    if (date >= timeframeStart) {
      const key = date.toLocaleDateString();
      grouped[key] = (grouped[key] || 0) + entry.quantity;
    }
  });

  return grouped;
}