// frontend/src/context/AppContext.jsx

import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({});

  const updateGlobalState = (key, value) => {
    setGlobalState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </AppContext.Provider>
  );
};