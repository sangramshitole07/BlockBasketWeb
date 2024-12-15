import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}