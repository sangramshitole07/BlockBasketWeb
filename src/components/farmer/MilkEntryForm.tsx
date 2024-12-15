import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getCurrentLocation } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { FormInput } from '@/components/ui/form-input';
import { FormSection } from '@/components/ui/form-section';
import { FarmerAnalytics } from '@/components/analytics/FarmerAnalytics';
import { useMilkStore } from '@/store/milkStore';

interface MilkEntryFormProps {
  onSubmit: (entry: Omit<MilkEntry, 'id' | 'batchId'>) => void;
}

export function MilkEntryForm({ onSubmit }: MilkEntryFormProps) {
  const { entries, payments } = useMilkStore();
  const [formData, setFormData] = useState({
    farmerId: '',
    farmerName: '',
    quantity: '',
    fatContent: '',
    snf: '',
    temperature: '',
  });
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const position = await getCurrentLocation();
      
      onSubmit({
        farmerId: formData.farmerId,
        farmerName: formData.farmerName,
        date: new Date().toISOString(),
        quantity: Number(formData.quantity),
        fatContent: Number(formData.fatContent),
        snf: Number(formData.snf),
        temperature: Number(formData.temperature),
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        },
        submittedAt: new Date().toISOString(),
      });

      // Don't reset farmerId and farmerName to maintain analytics view
      setFormData(prev => ({
        ...prev,
        quantity: '',
        fatContent: '',
        snf: '',
        temperature: '',
      }));
    } catch (err) {
      setError('Please enable location services to submit milk entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSection title="Farmer Information">
            <FormInput
              id="farmerId"
              label="Farmer ID"
              value={formData.farmerId}
              onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })}
              required
            />
            <FormInput
              id="farmerName"
              label="Farmer Name"
              value={formData.farmerName}
              onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
              required
            />
          </FormSection>

          <FormSection title="Milk Quality Parameters">
            <FormInput
              id="quantity"
              label="Quantity (Liters)"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              min="0"
              step="0.1"
            />
            <FormInput
              id="fatContent"
              label="Fat Content (%)"
              type="number"
              value={formData.fatContent}
              onChange={(e) => setFormData({ ...formData, fatContent: e.target.value })}
              required
              min="0"
              max="100"
              step="0.1"
            />
            <FormInput
              id="snf"
              label="SNF (%)"
              type="number"
              value={formData.snf}
              onChange={(e) => setFormData({ ...formData, snf: e.target.value })}
              required
              min="0"
              max="100"
              step="0.1"
            />
            <FormInput
              id="temperature"
              label="Temperature (°C)"
              type="number"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
              required
            />
          </FormSection>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Entry'}
        </Button>

        <p className="text-sm text-gray-500 mt-2">
          Note: Location services must be enabled to submit milk entries
        </p>
      </form>

      {formData.farmerId && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Farmer Analytics</h2>
          <FarmerAnalytics
            farmerId={formData.farmerId}
            entries={entries}
            payments={payments}
          />
        </div>
      )}
    </div>
  );
}