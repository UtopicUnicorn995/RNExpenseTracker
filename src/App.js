import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import Login from './screens/guests/Login';
import Register from './screens/guests/Register';
import Welcome from './screens/guests/Welcome';
import {AppProvider} from './AppContext';
import {UserProvider} from './UserContext';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};

function RootStack() {
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

export default App = () => {
  return (
    <AppProvider>
      <UserProvider>
        <NavigationContainer>
          {/* <RootStack />  */}
          <GuestStack />
        </NavigationContainer>
      </UserProvider>
    </AppProvider>
  );
};
