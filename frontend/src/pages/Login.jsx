import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/index.js';
import { authService } from '../services/api.js';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: () => authService.login(email, password),
    onSuccess: (response) => {
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Login failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Viral Shorts AI</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMutation.error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <AlertCircle size={18} />
              <span className="text-sm">{loginMutation.error.message}</span>
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
