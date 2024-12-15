import React from 'react';
import { steps } from './constants';

export function HowItWorks() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get Started in 4 Simple Steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute -top-4 left-4 inline-flex items-center justify-center rounded-full bg-blue-600 p-2 shadow-lg">
                  <span className="text-sm font-medium text-white">{step.id}</span>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">{step.title}</h3>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}