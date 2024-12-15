import { useMemo } from 'react';
import { MilkEntry, Payment, MilkQuality } from '@/types/milk';

interface DailyProduction {
  date: string;
  quantity: number;
}

interface QualityTrend extends MilkQuality {
  date: string;
}

interface PaymentTrend {
  date: string;
  amount: number;
}

interface OverallAnalytics {
  totalQuantity: number;
  avgQuality: MilkQuality;
  totalPayments: number;
  dailyProduction: DailyProduction[];
  qualityTrends: QualityTrend[];
  paymentTrends: PaymentTrend[];
}

export function useOverallAnalytics(entries: MilkEntry[], payments: Payment[]): OverallAnalytics {
  return useMemo(() => {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Filter recent entries
    const recentEntries = entries.filter(entry => new Date(entry.date) >= lastWeek);
    const recentPayments = payments.filter(payment => new Date(payment.date) >= lastWeek);

    // Calculate daily production
    const productionByDay = new Map<string, number>();
    const qualityByDay = new Map<string, { fat: number; snf: number; temp: number; count: number }>();

    recentEntries.forEach(entry => {
      const date = new Date(entry.date).toLocaleDateString();
      
      // Production
      productionByDay.set(date, (productionByDay.get(date) || 0) + entry.quantity);
      
      // Quality
      const dayQuality = qualityByDay.get(date) || { fat: 0, snf: 0, temp: 0, count: 0 };
      qualityByDay.set(date, {
        fat: dayQuality.fat + entry.fatContent,
        snf: dayQuality.snf + entry.snf,
        temp: dayQuality.temp + entry.temperature,
        count: dayQuality.count + 1,
      });
    });

    // Calculate payment trends
    const paymentsByDay = new Map<string, number>();
    recentPayments.forEach(payment => {
      const date = new Date(payment.date).toLocaleDateString();
      paymentsByDay.set(date, (paymentsByDay.get(date) || 0) + payment.amount);
    });

    // Calculate averages
    const totalQuantity = recentEntries.reduce((sum, entry) => sum + entry.quantity, 0);
    const avgQuality = recentEntries.reduce((acc, entry) => ({
      fatContent: acc.fatContent + entry.fatContent,
      snf: acc.snf + entry.snf,
      temperature: acc.temperature + entry.temperature,
    }), { fatContent: 0, snf: 0, temperature: 0 });

    const entryCount = recentEntries.length || 1; // Avoid division by zero
    
    return {
      totalQuantity,
      avgQuality: {
        fatContent: avgQuality.fatContent / entryCount,
        snf: avgQuality.snf / entryCount,
        temperature: avgQuality.temperature / entryCount,
      },
      totalPayments: recentPayments.reduce((sum, payment) => sum + payment.amount, 0),
      dailyProduction: Array.from(productionByDay.entries())
        .map(([date, quantity]) => ({ date, quantity }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      qualityTrends: Array.from(qualityByDay.entries())
        .map(([date, quality]) => ({
          date,
          fatContent: quality.fat / quality.count,
          snf: quality.snf / quality.count,
          temperature: quality.temp / quality.count,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      paymentTrends: Array.from(paymentsByDay.entries())
        .map(([date, amount]) => ({ date, amount }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    };
  }, [entries, payments]);
}