import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import Login from './screens/guests/Login';
import Register from './screens/guests/Register';
import Welcome from './screens/guests/Welcome';
import SplashScreen from './screens/guests/SplashScreen';
import {AppProvider} from './AppContext';
import {UserProvider, useUser} from './UserContext';
import {initDB} from './database/databaseSetup';
import {getUser} from './database/userQueries';
import ToastManager from 'toastify-react-native'

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};

function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={Tabs} options={options} />
    </Stack.Navigator>
  );
}

function GuestStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} options={options} />
      <Stack.Screen name="Login" component={Login} options={options} />
      <Stack.Screen name="Register" component={Register} options={options} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const {user, loading} = useUser();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <GuestStack />}
    </NavigationContainer>
  );
}

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const db = await initDB();
        const user = await getUser(db);
      } catch (error) {
        console.error('Error during app init:', error);
      } finally {
        setIsReady(true);
      }
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <AppProvider>
      <UserProvider>
        <RootNavigator />
        <ToastManager />
      </UserProvider>
    </AppProvider>
  );
};

export default App;
