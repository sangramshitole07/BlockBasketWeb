import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FooterTop() {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <div className="py-12 border-b border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <p className="mt-2 text-sm">
            Subscribe to our newsletter for the latest updates and insights.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  );
}