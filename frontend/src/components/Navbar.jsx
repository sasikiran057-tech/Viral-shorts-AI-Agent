import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/index.js';
import { Zap, LogOut } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Trends', path: '/trends' },
    { name: 'Create', path: '/create' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="text-blue-600" />
          Viral Shorts AI
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
