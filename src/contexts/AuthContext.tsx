import React, { createContext, useContext, useState, useCallback } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'artisan' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API calls - Replace with actual API calls
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (email === 'artisan@example.com' && password === 'password') {
    return {
      id: '1',
      name: 'John Doe',
      email: 'artisan@example.com',
      role: 'artisan',
    };
  }

  throw new Error('Invalid credentials');
};

const mockRegister = async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    ...userData,
    id: Math.random().toString(36).substr(2, 9),
  };
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      const userData = await mockLogin(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  }, []);

  const register = useCallback(async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      const newUser = await mockRegister(userData);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, [user]);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 