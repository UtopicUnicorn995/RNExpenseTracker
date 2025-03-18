import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {useColorScheme, Image} from 'react-native';
import Colors from '../utility/Colors';
import MAIcons from 'react-native-vector-icons/MaterialIcons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated from 'react-native-reanimated';

export default function Button({
  title,
  onPress,
  iconName,
  iconSize,
  loading = false,
  disabled = false,
  iconOnly = false,
  style = {},
  textStyle = {},
  imageSource,
}) {
  const theme = useColorScheme();

  console.log('thene', theme)

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      style={({pressed}) => [
        iconOnly ? styles.iconOnly : styles.button,
        !iconOnly &&
          (theme === 'dark' ? styles.darkButton : styles.lightButton),
        pressed && !iconOnly && styles.pressed,
        disabled && !iconOnly && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={iconOnly ? Colors.primaryTextColor : '#fff'}
        />
      ) : (
        <View style={styles.content}>
          {iconName && (
            <MAIcons
              name={iconName}
              size={iconSize ? iconSize : 24}
              color={disabled ? '#ccc' : Colors.primaryTextColor}
            />
          )}
          {imageSource && (
            <Image style={styles.imageIcon} source={imageSource} />
          )}
          {!iconOnly && <Text style={[styles.text, textStyle]}>{title}</Text>}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.primaryTextColor,
    borderRadius: 8,
    minWidth: 150,
    width: '100%',
  },
  iconOnly: {
    alignSelf: 'flex-start',
    marginBottom: hp('2%'),
  },
  whiteButton: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.whiteColor,
  },
  lightButton: {
    backgroundColor: '#007bff',
    // borderColor:'#007bff'
  },
  darkButton: {
    backgroundColor: '#0056b3',
    //  borderColor:'#0056b3'
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    backgroundColor: '#cccccc',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  imageIcon: {
    width: hp('3%'),
    height: hp('3%'),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp('1%'),
  },
});
