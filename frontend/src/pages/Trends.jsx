import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/index.js';
import { trendService } from '../services/api.js';
import TrendCard from '../components/TrendCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { AlertCircle } from 'lucide-react';

export default function TrendsPage() {
  const { isAuthenticated } = useAuthStore();
  const { data: trendsData, isLoading, error } = useQuery({
    queryKey: ['trends'],
    queryFn: () => trendService.getTrends(),
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-slate-600">Please log in to view trends</p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle size={20} />
        <span>{error.message}</span>
      </div>
    );
  }

  const trends = trendsData?.data?.trends || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trending Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trends.map((trend) => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </div>
    </div>
  );
}
