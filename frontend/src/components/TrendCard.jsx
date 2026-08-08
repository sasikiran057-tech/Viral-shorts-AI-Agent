import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function TrendCard({ trend }) {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-lg">{trend.topic}</h3>
        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
          <TrendingUp size={14} />
          {trend.viralScore.toFixed(1)}
        </div>
      </div>
      <div className="space-y-2 text-sm text-slate-600">
        <p>Views: {trend.views?.toLocaleString() || 'N/A'}</p>
        <p>Engagement: {trend.engagement?.toFixed(1)}% || 'N/A'}</p>
      </div>
    </div>
  );
}
