// src/lib/auth.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { refresh, getProfile } from './api';

// Define User interface
interface User {
  id: string;
  username: string;
  bio: string | null;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  setAuth: (user: User, expiresAt: number) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    const storedExpiresAt = localStorage.getItem('expires_at');
    if (storedExpiresAt) {
      const expires = parseInt(storedExpiresAt, 10);
      if (expires > Date.now()) {
        setExpiresAt(expires);
        // Attempt to fetch profile to verify session
        getProfile()
          .then((profile) => setUser(profile))
          .catch(() => handleRefresh(expires));
      } else {
        handleRefresh(expires);
      }
    }

    function handleRefresh(currentExpires: number) {
      const timeLeft = currentExpires - Date.now();
      if (timeLeft > 0) {
        const timeout = setTimeout(async () => {
          try {
            const { user: refreshedUser, expires_at } = await refresh();
            setUser(refreshedUser);
            setExpiresAt(expires_at);
            localStorage.setItem('expires_at', expires_at.toString());
          } catch (error) {
            console.error('Refresh failed:', error);
            clearAuth();
          }
        }, Math.max(timeLeft - 30000, 0)); // Refresh 30s early
        return () => clearTimeout(timeout);
      }
    }
  }, []);

  const setAuth = (newUser: User, newExpiresAt: number) => {
    setUser(newUser);
    setExpiresAt(newExpiresAt);
    localStorage.setItem('expires_at', newExpiresAt.toString());
  };

  const clearAuth = () => {
    setUser(null);
    setExpiresAt(null);
    localStorage.removeItem('expires_at');
  };

  return (
    <AuthContext.Provider value={{ user, expiresAt, isAuthenticated: !!user, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}