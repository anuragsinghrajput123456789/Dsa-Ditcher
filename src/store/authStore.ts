
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  xp: number;
  streak: number;
  level: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateXP: (points: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          xp: 1250,
          streak: 7,
          level: 3
        };
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: '1',
          email,
          name,
          xp: 0,
          streak: 0,
          level: 1
        };
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateXP: (points: number) => {
        const { user } = get();
        if (user) {
          const newXP = user.xp + points;
          const newLevel = Math.floor(newXP / 500) + 1;
          set({
            user: { ...user, xp: newXP, level: newLevel }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
