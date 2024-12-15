import { create } from 'zustand';
import type { MilkEntry, Payment } from '@/types/milk';

interface MilkState {
  entries: MilkEntry[];
  payments: Payment[];
  pendingDistributorEntries: MilkEntry[];
  addEntry: (entry: MilkEntry) => void;
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  sendToDistributor: (entryId: string) => void;
}

export const useMilkStore = create<MilkState>((set) => ({
  entries: [],
  payments: [],
  pendingDistributorEntries: [],
  addEntry: (entry) =>
    set((state) => ({
      entries: [entry, ...state.entries],
      pendingDistributorEntries: [entry, ...state.pendingDistributorEntries],
    })),
  addPayment: (payment) =>
    set((state) => ({
      payments: [
        {
          ...payment,
          id: Date.now().toString(),
        },
        ...state.payments,
      ],
    })),
  sendToDistributor: (entryId) =>
    set((state) => ({
      pendingDistributorEntries: state.pendingDistributorEntries.filter(
        (entry) => entry.id !== entryId
      ),
    })),
}));