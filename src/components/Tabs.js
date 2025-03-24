import {View, Pressable, Animated} from 'react-native';
import {useRef} from 'react';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {PlatformPressable} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IOIcon from 'react-native-vector-icons/Ionicons';
import Calendar from '../screens/users/Calendar';
import Home from '../screens/users/Home';
import Graph from '../screens/users/Graph';
import Profile from '../screens/users/Profile';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomHeader from './CustomHeader';

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  // Create an array of animated values for each tab
  const scaleAnims = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

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

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
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

        return (
          <Pressable
            key={route.key}
            onPressIn={() => onPressIn(index)}
            onPressOut={() => onPressOut(index)}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}>
            <Animated.View style={{transform: [{scale: scaleAnims[index]}]}}>
              <IOIcon
                style={{textAlign: 'center', padding: hp('2%')}}
                color={isFocused ? 'black' : 'gray'}
                name={iconNames[route.name]}
                size={hp('4%')}
              />
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Tabs() {
  const Tab = createBottomTabNavigator();
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
              // title="Profile"
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
}
