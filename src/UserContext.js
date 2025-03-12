import { createContext, useState, useContext } from 'react';
import { getUser, saveUser } from './database/userDatabase';
import axios from 'axios';
import { useApp } from './AppContext';

// Create User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { apiUrl } = useApp(); // ✅ Now we can use apiUrl safely

  console.log('User Data:', user);

  const setUserData = (userData) => {
    setUser(userData);
  };

  const loginUser = async (username, password) => {
    try {
      const localUser = await getUser();

      if (localUser) {
        console.log('User already logged in locally:', localUser);
        setUserData(localUser);
        return;
      }

      console.log('User not found locally, attempting online login...');
      const payload = { username, password };

      const res = await axios.post(`${apiUrl}/users/login`, payload);

      if (res.status === 200) {
        console.log('User logged in:', res.data);

        const { userId, username, email, password } = res.data;

        console.log('Saving user:', userId, username, email);
        await saveUser(userId, username, email, password);
        setUserData(res.data);
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
