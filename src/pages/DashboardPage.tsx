import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';
import { FarmerDashboard } from '@/pages/farmer/FarmerDashboard';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render different dashboards based on user role
  switch (user.role) {
    case 'farmer':
      return <FarmerDashboard />;
    default:
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome, {user.name}
          </h1>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </h2>
            <p className="text-gray-600">
              Your personalized dashboard is being set up. Check back soon for updates.
            </p>
          </div>
        </div>
      );
  }
}