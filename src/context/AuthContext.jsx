import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth state on mount
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials, type) => {
    let data;
    if (type === 'staff') {
      data = await authService.staffLogin(credentials.username, credentials.password);
      setRole(data.role || 'STAFF');
      localStorage.setItem('role', data.role || 'STAFF');
    } else {
      data = await authService.customerLogin(credentials.email, credentials.password);
      setRole('CUSTOMER');
      localStorage.setItem('role', 'CUSTOMER');
    }

    const loggedInUser = data.username || (data.customer ? data.customer.customerName : 'User');
    
    setUser(loggedInUser);
    setToken(data.token);
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    
    return data;
  };

  const logout = async () => {
    if (role !== 'CUSTOMER') {
      await authService.logout();
    }
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const value = {
    user,
    token,
    role,
    isAuthenticated: !!token,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
