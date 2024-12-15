export interface MilkEntry {
  id: string;
  farmerId: string;
  farmerName: string;
  date: string;
  quantity: number;
  fatContent: number;
  snf: number; // Solids-Not-Fat
  temperature: number;
  batchId: string;
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  submittedAt: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  batchIds: string[];
}

export interface MilkQuality {
  fatContent: number;
  snf: number;
  temperature: number;
}