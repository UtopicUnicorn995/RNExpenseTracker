import {View, Text, Image, StyleSheet, Alert, BackHandler} from 'react-native';
import {useEffect} from 'react';
import MainContainer from '../../components/MainContainer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utility/Colors';
import Button from '../../components/Button';

export default function Welcome() {
  const navigation = useNavigation();

  useEffect(() => {
    const closeApp = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!navigation.canGoBack()) {
          return closeApp();
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <MainContainer
      stylesProp={{
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        marginTop: 0,
      }}>
      <View style={styles.heroImgContainer}>
        <Image
          style={styles.heroImg}
          source={require('../../assets/hero1.png')}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textCenter,
              {
                fontSize: hp('4%'),
                fontWeight: 'bold',
                color: Colors.primaryTextColor,
              },
            ]}>
            Hello and welcome
          </Text>
          <Text
            style={[
              styles.textCenter,
              {
                fontSize: hp('2%'),
                color: Colors.primaryTextColor,
              },
            ]}>
            Explore, create and experience the app that's built around you
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Button
            style={{borderColor: '#007bff'}}
            title="Sign in"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title="Create account"
            style={{
              backgroundColor: Colors.whiteColor,
              borderColor: Colors.primaryTextColor,
            }}
            textStyle={{color: Colors.primaryTextColor}}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  heroImgContainer: {
    width: '100%',
    aspectRatio: 804 / 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: hp('6%'),
    gap: hp('6%'),
  },
  textCenter: {textAlign: 'center'},
  textContainer: {
    gap: hp('2%'),
    width: '100%',
  },
});
