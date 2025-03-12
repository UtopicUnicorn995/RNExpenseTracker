import { createContext, useEffect, useState, useContext } from 'react';
import SQLite from 'react-native-sqlite-storage';
import db, { createUserTable, getUser, saveUser } from './database/userDatabase';
import axios from 'axios';

// App-wide context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const apiUrl = 'http://192.168.1.12:3000/api';

  useEffect(() => {
    createUserTable();
  }, []);

  return (
    <AppContext.Provider value={{ db, apiUrl }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to access AppContext
export const useApp = () => {
  return useContext(AppContext);
};
