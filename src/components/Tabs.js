import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useRef, useEffect} from 'react';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IOIcon from 'react-native-vector-icons/Ionicons';
import Calendar from '../screens/users/Calendar';
import Home from '../screens/users/Home';
import Graph from '../screens/users/Graph';
import Profile from '../screens/users/Profile';
import TransactionScreen from '../screens/users/TransactionScreen';
import CustomHeader from './CustomHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  const scaleAnims = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  const addExpenseOpacity = useRef(new Animated.Value(0)).current;
  const tabFlexAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = index => {
    Animated.timing(scaleAnims[index], {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = index => {
    Animated.timing(scaleAnims[index], {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const isProfile = state.routes[state.index].name === 'Profile';

  useEffect(() => {
    const isProfile = state.routes[state.index].name === 'Profile';

    Animated.timing(addExpenseOpacity, {
      toValue: !isProfile ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    Animated.timing(tabFlexAnim, {
      toValue: !isProfile ? 1 : 1.25,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [state.index]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: hp('1%'),
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const iconNames = {
          Home: isFocused ? 'home' : 'home-outline',
          Calendar: isFocused ? 'calendar' : 'calendar-clear-outline',
          Graph: isFocused ? 'pie-chart' : 'pie-chart-outline',
          Profile: isFocused ? 'person' : 'person-outline',
          AddExpense: isFocused ? 'add' : 'add',
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const addExpense = route.name === 'AddExpense';

        if (addExpense && isProfile) {
          return null;
        }

        return (
          <Animated.View
            key={route.key}
            style={{
              opacity: addExpense ? addExpenseOpacity : 1,
              transform: addExpense ? [{scale: addExpenseOpacity}] : [],
              flex: addExpense ? 1 : tabFlexAnim,
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                backgroundColor: addExpense ? '#575757' : 'transparent',
                borderRadius: addExpense ? 99 : 0,
              }}
              onPressIn={() => onPressIn(index)}
              onPressOut={() => onPressOut(index)}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}>
              <Animated.View style={{transform: [{scale: scaleAnims[index]}]}}>
                <IOIcon
                  style={{textAlign: 'center', padding: hp('2%')}}
                  color={
                    isFocused
                      ? addExpense
                        ? 'gray'
                        : 'black'
                      : addExpense
                      ? 'white'
                      : 'gray'
                  }
                  name={iconNames[route.name]}
                  size={hp('4%')}
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

export default function Tabs() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            header: () => (
              <CustomHeader
                title="Home"
                searchBar={{
                  placeholder: 'Search',
                  onChangeText: text => console.log(text),
                }}
                buttons={[
                  {icon: 'add', onPress: () => console.log('Add clicked')},
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            header: () => (
              <CustomHeader
                title="Calendar"
                buttons={[
                  {
                    icon: 'calendar',
                    onPress: () => console.log('Calendar clicked'),
                  },
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddExpense"
          component={() => null}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.addButton}>
                <IOIcon name="add" size={hp('4%')} color="white" />
              </View>
            ),
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                onPress={() => console.log('Add Expense clicked')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Graph"
          component={Graph}
          options={{
            header: () => <CustomHeader title="Graph" />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            header: () => (
              <CustomHeader
                buttons={[
                  {
                    icon: 'settings',
                    onPress: () => console.log('Settings clicked'),
                  },
                ]}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Transaction Details"
              buttons={[
                {
                  icon: 'arrow-back',
                  onPress: () => console.log('Close clicked'),
                },
              ]}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={TransactionScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Transaction Details"
              buttons={[
                {
                  icon: 'close',
                  onPress: () => console.log('Close clicked'),
                },
              ]}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
