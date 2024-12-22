import React from 'react';
import { AlertCircle } from 'lucide-react';



export function ValidationErrors({ errors }) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="text-red-400" size={20} />
        <h3 className="text-red-800 font-medium">Validation Errors</h3>
      </div>
      <ul className="list-disc list-inside space-y-1">
        {errors.map((error, index) => (
          <li key={index} className="text-red-700">
            {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
}