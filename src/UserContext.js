import {createContext, useState, useEffect, useContext} from 'react';
import {
  getUser,
  saveUser,
  saveTransaction,
  getTransactions,
} from './database/userQueries';
import axios from 'axios';
import {useApp} from './AppContext';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const {apiUrl, db} = useApp();

  console.log('transaction from userContext', transactions)

  const setUserData = userData => {
    console.log('userData', userData)
    setUser(userData);
  };

  const refreshData = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    console.log('use effect is running');
    const checkLocalUser = async () => {
      if (!db) {
        console.error('Database is not initialized');
        setLoading(false);
        return;
      }
      try {
        const hasUser = await getUser(db);
        let userTransactions;

        if (hasUser) {
          setUserData(hasUser);
          userTransactions = await getTransactions(db, hasUser.id, apiUrl);
          console.log('got transactions from the API')
          setTransactions(userTransactions);
        } else {
          setUserData(null);
          setTransactions([]);
        }
      } catch (error) {
        console.error('Failed to fetch user from local DB:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLocalUser();
  }, [db, refreshKey]);

  if (loading) {
    return null;
  }

  const decodeUser = token => {
    return jwtDecode(token);
  };

  const loginUser = async (username, password) => {
    try {
      if (!db) {
        console.error('Database is not initialized');
        return;
      }

      const localUser = await getUser(db);

      if (localUser) {
        setUserData(localUser);
        return;
      }

      console.log(
        'User not found locally, attempting online login...',
        localUser,
      );
      const payload = {username, password};

      const res = await axios.post(`${apiUrl}/users/login`, payload);

      if (res.status === 200) {
        const {
          userId,
          username,
          email,
          available_balance,
          account_number,
          role,
        } = decodeUser(res.data.token);
        await saveUser(
          db,
          userId,
          username,
          email,
          available_balance,
          account_number,
          role,
        );
        console.log('decoded user:', decodeUser(res.data.token));
        setUserData(decodeUser(res.data.token));
        refreshData();
      } else {
        console.log('Login failed, check credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUserData,
        transactions,
        setTransactions,
        loginUser,
        refreshData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to access UserContext
export const useUser = () => {
  return useContext(UserContext);
};
