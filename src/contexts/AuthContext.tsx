"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  maxLifts: {
    bench: number;
    squat: number;
    deadlift: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateMaxLifts: (maxLifts: { bench: number; squat: number; deadlift: number }) => void;
  updateMaxLift: (liftType: 'bench' | 'squat' | 'deadlift', weight: number) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('simply-fit-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure maxLifts property exists for backward compatibility
        if (!parsedUser.maxLifts) {
          parsedUser.maxLifts = {
            bench: 0,
            squat: 0,
            deadlift: 0,
          };
          // Update localStorage with the new structure
          localStorage.setItem('simply-fit-user', JSON.stringify(parsedUser));
        }
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('simply-fit-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('simply-fit-users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);
    
    if (user) {
      setUser(user);
      localStorage.setItem('simply-fit-user', JSON.stringify(user));
      return true;
    }
    
    // Fallback for demo admin account
    if (username === 'admin' && password === 'password') {
      const userData = {
        id: '1',
        username: 'admin',
        name: 'Admin User',
        email: 'admin@example.com',
        maxLifts: {
          bench: 0,
          squat: 0,
          deadlift: 0,
        },
      };
      setUser(userData);
      localStorage.setItem('simply-fit-user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = async (username: string, password: string, email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('simply-fit-users') || '[]');
      
      // Check if username already exists
      if (users.some((u: any) => u.username === username)) {
        return { success: false, error: 'Username already exists' };
      }
      
      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        return { success: false, error: 'Email already exists' };
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username,
        name: username,
        email,
        password,
        maxLifts: {
          bench: 0,
          squat: 0,
          deadlift: 0,
        },
      };
      
      // Add to users array
      users.push(newUser);
      localStorage.setItem('simply-fit-users', JSON.stringify(users));
      
      // Auto-login the new user
      setUser(newUser);
      localStorage.setItem('simply-fit-user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simply-fit-user');
  };

  const updateMaxLifts = (maxLifts: { bench: number; squat: number; deadlift: number }) => {
    if (user) {
      const updatedUser = { ...user, maxLifts };
      setUser(updatedUser);
      localStorage.setItem('simply-fit-user', JSON.stringify(updatedUser));
    }
  };

  const updateMaxLift = (liftType: 'bench' | 'squat' | 'deadlift', weight: number) => {
    if (user && weight > (user.maxLifts[liftType] || 0)) {
      const updatedUser = {
        ...user,
        maxLifts: {
          ...user.maxLifts,
          [liftType]: weight
        }
      };
      setUser(updatedUser);
      localStorage.setItem('simply-fit-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateMaxLifts, updateMaxLift, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 