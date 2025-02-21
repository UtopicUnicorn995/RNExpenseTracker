import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IOIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function CustomHeader({title, buttons = []}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp('2%'),
        paddingTop: hp('4%')
      }}>
      {/* {navigation.canGoBack() ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IOIcon name="arrow-back" size={hp('3%')} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={{width: hp('3%')}} />
      )} */}

      {/* Center: Title */}
      <Text style={{fontSize: hp('2.5%'), fontWeight: 'bold'}}>{title}</Text>

      {/* Right: Dynamic Buttons */}
      {/* <View style={{flexDirection: 'row'}}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} onPress={button.onPress} style={{marginLeft: hp('1.5%')}}>
            <IOIcon name={button.icon} size={hp('3%')} color={button.color || 'black'} />
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
}
