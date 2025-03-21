import {createContext, useState, useEffect, useContext} from 'react';
import {getUser, saveUser} from './database/userQueries';
import axios from 'axios';
import {useApp} from './AppContext';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {apiUrl, db} = useApp();

  console.log('User Data:', user);
  console.log('Database:', db); // Add logging to check db

  const setUserData = userData => {
    setUser(userData);
  };

  useEffect(() => {
    const checkLocalUser = async () => {
      if (!db) {
        console.error('Database is not initialized');
        setLoading(false);
        return;
      }
      try {
        console.log('hass user before')
        const hasUser = await getUser(db);
        console.log('hass user', hasUser)
        if (hasUser) {
          setUserData(hasUser);
        }
      } catch (error) {
        console.error('Failed to fetch user from local DB:', error);
      } finally {
        setLoading(false);
      }
    };
  
    checkLocalUser();
  }, [db]);
  
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
        console.log('User already logged in locally:', localUser);
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
        console.log('User logged in:', res.data);

        const {userId, username, email} = decodeUser(res.data.token);

        console.log('Saving user:', userId, username, email);
        await saveUser(db, userId, username, email);
        setUserData(decodeUser(res.data.token));
      } else {
        console.log('Login failed, check credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <UserContext.Provider value={{user, loading, setUserData, loginUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to access UserContext
export const useUser = () => {
  return useContext(UserContext);
};
