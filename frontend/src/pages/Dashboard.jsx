import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/index.js';
import { BarChart3, Zap, Video, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const stats = [
    { label: 'Total Videos', value: '0', icon: Video },
    { label: 'Total Views', value: '0', icon: TrendingUp },
    { label: 'Viral Score', value: '0.0', icon: Zap },
    { label: 'Analytics', value: 'Ready', icon: BarChart3 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name || 'Creator'}!</h1>
        <p className="text-slate-600">Your viral content command center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="text-blue-600" size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/trends')}
          className="btn-primary p-6 text-left rounded-lg"
        >
          <TrendingUp className="mb-2" />
          <h3 className="font-bold">Discover Trends</h3>
          <p className="text-sm opacity-90">Find viral topics now</p>
        </button>
        <button
          onClick={() => navigate('/create')}
          className="btn-primary p-6 text-left rounded-lg"
        >
          <Video className="mb-2" />
          <h3 className="font-bold">Create Video</h3>
          <p className="text-sm opacity-90">Generate new content</p>
        </button>
        <button
          onClick={() => navigate('/analytics')}
          className="btn-primary p-6 text-left rounded-lg"
        >
          <BarChart3 className="mb-2" />
          <h3 className="font-bold">View Analytics</h3>
          <p className="text-sm opacity-90">Track performance</p>
        </button>
      </div>
    </div>
  );
}
