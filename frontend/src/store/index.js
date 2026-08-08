import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);

export const useVideoStore = create((set) => ({
  videos: [],
  selectedVideo: null,
  setVideos: (videos) => set({ videos }),
  selectVideo: (video) => set({ selectedVideo: video }),
}));

export const useTrendStore = create((set) => ({
  trends: [],
  selectedTrend: null,
  setTrends: (trends) => set({ trends }),
  selectTrend: (trend) => set({ selectedTrend: trend }),
}));
