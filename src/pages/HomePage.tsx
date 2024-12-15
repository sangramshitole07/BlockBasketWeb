import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CTASection } from '@/components/home/CTASection';

export function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <CTASection />
    </div>
  );
}