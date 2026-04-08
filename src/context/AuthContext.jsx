import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import serverURL from '../serverConfig';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('glowberry_user');
    const storedToken = localStorage.getItem('glowberry_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${serverURL.url}auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        const authToken = response.data.data.token;

        // Save to state
        setUser(userData);
        setToken(authToken);

        // Save to localStorage
        localStorage.setItem('glowberry_user', JSON.stringify(userData));
        localStorage.setItem('glowberry_token', authToken);

        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        toast.success(`Welcome back, ${userData.name}!`, {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10b981',
            color: '#fff',
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 24px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
          },
        });

        return { success: true, user: userData };
      } else {
        toast.error(response.data.message || 'Login failed', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#ef4444',
            color: '#fff',
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 24px',
          },
        });
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontWeight: '500',
          borderRadius: '12px',
          padding: '16px 24px',
        },
      });
      return { success: false, message: errorMessage };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${serverURL.url}auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast.success('Registration successful! Please login.', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10b981',
            color: '#fff',
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 24px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
          },
        });
        return { success: true };
      } else {
        toast.error(response.data.message || 'Registration failed', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#ef4444',
            color: '#fff',
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 24px',
          },
        });
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontWeight: '500',
          borderRadius: '12px',
          padding: '16px 24px',
        },
      });
      return { success: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('glowberry_user');
    localStorage.removeItem('glowberry_token');
    delete axios.defaults.headers.common['Authorization'];

    toast.success('Logged out successfully', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#64748b',
        color: '#fff',
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: '500',
        borderRadius: '12px',
        padding: '16px 24px',
      },
    });
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
