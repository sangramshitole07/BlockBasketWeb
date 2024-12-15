import React from 'react';
import { FooterTop } from './FooterTop';
import { FooterMain } from './FooterMain';
import { FooterBottom } from './FooterBottom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FooterTop />
        <FooterMain />
        <FooterBottom />
      </div>
    </footer>
  );
}