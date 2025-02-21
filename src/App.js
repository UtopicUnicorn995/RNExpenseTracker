import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import Login from './screens/Login';
import Register from './screens/Register';

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

function GuestStak() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={options} />
      <Stack.Screen name="Register" component={Register} options={options} />
    </Stack.Navigator>
  );
}

export default App = () => {
  return (
    <NavigationContainer>
      {/* <RootStack /> */}
      <GuestStak />
    </NavigationContainer>
  );
};
