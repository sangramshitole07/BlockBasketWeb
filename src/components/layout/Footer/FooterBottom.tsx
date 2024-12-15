import React from 'react';
import { Link } from 'react-router-dom';
import { Milk } from 'lucide-react';
import { socialLinks } from './constants';

export function FooterBottom() {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Milk className="h-8 w-8 text-blue-500" />
            <span className="text-white font-bold text-lg">BlockBasket</span>
          </Link>
          <div className="text-sm">
            © {new Date().getFullYear()} BlockBasket. All rights reserved.
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">{link.name}</span>
              <link.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}