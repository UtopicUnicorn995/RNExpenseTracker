import { createContext, useState, useContext } from 'react';
import { getUser, saveUser } from './database/userDatabase';
import axios from 'axios';
import { useApp } from './AppContext';
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { apiUrl, db } = useApp();

  console.log('User Data:', user);

  const setUserData = (userData) => {
    setUser(userData);
  };

  const decodeUser = (token) => {
    return jwtDecode(token)
  }

  const loginUser = async (username, password) => {
    try {
      const localUser = await getUser(db);

      if (localUser) {
        console.log('User already logged in locally:', localUser);
        setUserData(localUser);
        return;
      }

      console.log('User not found locally, attempting online login...', localUser);
      const payload = { username, password };

      const res = await axios.post(`${apiUrl}/users/login`, payload);

      if (res.status === 200) {
        console.log('User logged in:', res.data);

        const {userId, username, email} = decodeUser(res.data.token)

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
    <UserContext.Provider value={{ user, setUserData, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to access UserContext
export const useUser = () => {
  return useContext(UserContext);
};
