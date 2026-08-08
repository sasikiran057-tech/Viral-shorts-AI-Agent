import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin text-blue-600" size={48} />
    </div>
  );
}
