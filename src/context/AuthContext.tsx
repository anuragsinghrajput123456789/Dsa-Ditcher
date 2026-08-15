'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '@/types';
import { api } from '@/lib/api';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (userData: IUser) => void;
  logout: () => void;
  updateStats: (problemsSolved?: number, level?: string) => Promise<void>;
  guestStreak: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestStreak, setGuestStreak] = useState<number>(1);

  // Initialize Auth & Guest Streak
  useEffect(() => {
    const initAuth = async () => {
      // Setup Guest Streak logic
      const storedGuestStreak = localStorage.getItem('algospark_guest_streak');
      const storedGuestDate = localStorage.getItem('algospark_guest_last_date');
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      if (storedGuestStreak && storedGuestDate) {
        const lastDate = new Date(storedGuestDate);
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;

        if (storedGuestDate === todayStr) {
          setGuestStreak(parseInt(storedGuestStreak, 10));
        } else if (storedGuestDate === yesterdayStr) {
          const nextStreak = parseInt(storedGuestStreak, 10) + 1;
          setGuestStreak(nextStreak);
          localStorage.setItem('algospark_guest_streak', nextStreak.toString());
          localStorage.setItem('algospark_guest_last_date', todayStr);
        } else {
          setGuestStreak(1);
          localStorage.setItem('algospark_guest_streak', '1');
          localStorage.setItem('algospark_guest_last_date', todayStr);
        }
      } else {
        localStorage.setItem('algospark_guest_streak', '1');
        localStorage.setItem('algospark_guest_last_date', todayStr);
        setGuestStreak(1);
      }

      // Check logged-in user token
      const token = localStorage.getItem('algospark_token');
      if (token) {
        try {
          const profile = await api.get<IUser>('/api/users/profile');
          setUser({ ...profile, token });
        } catch (err) {
          console.warn('Failed to load user profile with existing token:', err);
          localStorage.removeItem('algospark_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: IUser) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem('algospark_token', userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('algospark_token');
  };

  const updateStats = async (problemsSolved?: number, level?: string) => {
    if (!user) return;
    try {
      const updated = await api.put<IUser>('/api/users/stats', {
        problemsSolved,
        level,
      });
      setUser((prev) => (prev ? { ...prev, ...updated } : null));
    } catch (err) {
      console.error('Failed to update stats:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateStats,
        guestStreak,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
