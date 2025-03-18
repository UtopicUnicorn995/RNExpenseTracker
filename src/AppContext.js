import {createContext, useEffect, useState, useContext} from 'react';
import {initDB} from './database/userDatabase'; // This is where you open DB + create tables

export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
  const apiUrl = 'http://192.168.1.12:3000/api';
  const [db, setDb] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const database = await initDB();
      setDb(database);
    };

    setup();
  }, []);

  if (!db) {
    return null;
  }

  return (
    <AppContext.Provider value={{db, apiUrl}}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
