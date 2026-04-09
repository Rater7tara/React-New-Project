import React, { createContext, useEffect, useState } from "react";
import ServerURL from "../serverConfig";
import AuthService from "../services/AuthService";
import userService from "../services/userService";
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

// Base URL for API calls
const BASE_URL = ServerURL.url;

const DEFAULT_ADMIN_EMAIL = 'nowshinakteremu005@gmail.com';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  // Check if user exists in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    const storedToken = localStorage.getItem("auth-token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setAuthToken(storedToken);
    }

    setLoading(false);
  }, []);

  // Refresh profile from backend (GET user/profile)
  const refreshProfile = async () => {
    try {
      const res = await userService.getMyProfile();
      const payload = res?.data;
      const fresh =
        payload?.data?.user ||
        payload?.data ||
        payload?.user ||
        payload;
      if (fresh && typeof fresh === 'object') {
        setUser(fresh);
        localStorage.setItem('user-info', JSON.stringify(fresh));
        return fresh;
      }
    } catch (e) {
      console.error('refreshProfile failed:', e);
    }
    return null;
  };

  // Auto-promote the default admin email if backend role is not 'admin'
  const ensureAdminRole = async (u) => {
    if (!u) return u;
    const userId = u._id || u.id;
    if (u.email === DEFAULT_ADMIN_EMAIL && u.role !== 'admin' && userId) {
      try {
        await userService.updateUserRole(userId, 'admin');
        const fresh = await refreshProfile();
        return fresh || u;
      } catch (e) {
        console.error('auto-promote default admin failed:', e);
      }
    }
    return u;
  };

  // Refresh token function
  const refreshToken = async () => {
    // If we have a user but no token, try to get a new token by logging in again
    if (user && !authToken) {
      try {
        const storedUserData = JSON.parse(
          localStorage.getItem("userData") || "{}"
        );
        if (storedUserData.email && storedUserData.password) {
          const loginResult = await signIn(
            storedUserData.email,
            storedUserData.password,
            true
          );
          console.log("Token refreshed successfully:", !!loginResult);
          return !!loginResult;
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        return false;
      }
    }
    return false;
  };

  // Register user function
  const createUser = async (name, email, phone, password) => {
    setLoading(true);

    try {
      console.log("Creating user with:", { name, email, password });

      const response = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      // Log response status and headers for debugging
      console.log("API Response status:", response.status);

      const responseText = await response.text();
      console.log("API Response text:", responseText);

      // Parse the response
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("API Response parsed:", data);
      } catch (parseError) {
        console.error("Error parsing response as JSON:", parseError);
        throw new Error("Invalid response from server. Please try again.");
      }

      if (!data.success) {
        console.error("API reported failure:", data.message);
        toast.error(data.message || 'Registration failed', {
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
        throw new Error(data.message || "Registration failed");
      }

      // For registration, we don't need to store user data immediately
      // since the account needs to be verified first
      // Just return the response data including userId
      console.log("Registration successful, returning data:", data);

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

      return {
        success: true,
        message: data.message,
        userId: data.userId,
        email: email, // Include email for OTP verification
        name: name   // Include name for reference
      };
    } catch (error) {
      console.error("Registration error details:", error);
      if (!error.message.includes('Registration failed')) {
        toast.error(error.message || 'Registration failed. Please try again.', {
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
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const signIn = async (email, password, isRefresh = false) => {
    if (!isRefresh) {
      setLoading(true);
    }

    try {
      console.log("Signing in with:", { email, password });

      const response = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Log response status for debugging
      console.log("API Response status:", response.status);

      const responseText = await response.text();
      console.log("API Response text:", responseText);

      // Parse the response
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("API Response parsed:", data);
      } catch (parseError) {
        console.error("Error parsing response as JSON:", parseError);
        throw new Error("Invalid response from server. Please try again.");
      }

      if (!data.success) {
        console.error("API reported failure:", data.message);
        toast.error(data.message || 'Login failed', {
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
        throw new Error(data.message || "Login failed");
      }

      // Store token if present
      if (data.token) {
        localStorage.setItem("auth-token", data.token);
        // Also store a backup of the token
        sessionStorage.setItem("auth-token-backup", data.token);
        setAuthToken(data.token);
        console.log(
          "Token stored in localStorage and sessionStorage:",
          data.token
        );
      } else {
        console.warn("No token returned from login API.");
      }

      // Get the user data
      const userData = data.user || data.data || {};

      if (Object.keys(userData).length === 0) {
        console.warn("No user data found in response");
      }

      // Store user information
      localStorage.setItem("user-info", JSON.stringify(userData));
      setUser(userData);
      console.log("User data stored:", userData);

      // Auto-promote default admin + refresh profile to get latest role/data
      try {
        await ensureAdminRole(userData);
        await refreshProfile();
      } catch (promoteErr) {
        console.error("Post-login profile sync failed:", promoteErr);
      }

      // Show success toast
      if (!isRefresh) {
        toast.success(`Welcome back, ${userData.name || 'User'}!`, {
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
      }

      return userData;
    } catch (error) {
      console.error("Login error details:", error);
      if (!isRefresh && !error.message.includes('Login failed')) {
        toast.error(error.message || 'Login failed. Please try again.', {
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
      }
      throw error;
    } finally {
      if (!isRefresh) {
        setLoading(false);
      }
    }
  };

  // Enhanced Log out using AuthService
  const logOut = () => {
    // Use the AuthService to properly clean up all storage
    AuthService.logout();

    // Clear user state
    setUser(null);
    setAuthToken(null);

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

    console.log("Logged out and cleared all user data");
    return true;
  };

  const authInfo = {
    user,
    setUser,
    loading,
    authToken,
    createUser,
    signIn,
    logOut,
    refreshToken,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;