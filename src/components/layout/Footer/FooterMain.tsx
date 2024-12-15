import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from './constants';

export function FooterMain() {
  return (
    <div className="py-12 border-b border-gray-800">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              {section.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}