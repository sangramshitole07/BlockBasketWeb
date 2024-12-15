import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}