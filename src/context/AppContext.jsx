import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: 'Dr. Sari Wulandari',
    role: 'admin', // admin, verifikator, user
    email: 'sari@bpom.go.id',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=32&h=32&fit=crop&crop=face'
  });

  const checkAccess = (requiredRole) => {
    if (requiredRole === 'all') return true;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'verifikator' && requiredRole === 'verifikator') return true;
    if (currentUser.role === 'user' && requiredRole === 'user') return true;
    return false;
  };

  return (
    <AppContext.Provider value={{
      sidebarCollapsed,
      setSidebarCollapsed,
      currentUser,
      checkAccess
    }}>
      {children}
    </AppContext.Provider>
  );
};