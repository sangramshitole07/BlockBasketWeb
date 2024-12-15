import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <div className="bg-blue-600">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-24 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to transform your supply chain?</span>
          <span className="block text-blue-200">Join BlockBasket today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link to="/register">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-base font-medium">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-blue-700 px-8 py-3 text-base font-medium">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}