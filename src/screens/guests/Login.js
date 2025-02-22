import {View, Text, StyleSheet} from 'react-native';
import MainContainer from '../../components/MainContainer';
import {useNavigation} from '@react-navigation/native';
import MAIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utility/Colors';
import Button from '../../components/Button';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Login({route}) {
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  return (
    <MainContainer>
      <View style={styles.navContainer}></View>
      {canGoBack && (
        <Button
          iconName="chevron-left"
          iconSize={hp('4.5%')}
          iconOnly
          onPress={() => navigation.goBack()}
        />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Log in</Text>
        <Text style={styles.bodyText}>
          It’s good to see you again! Log in to continue your journey with us!
        </Text>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    // backgroundColor: 'red',
  },
  titleContainer: {
    gap: hp('1.75%'),
  },
  titleText: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
  },
  bodyText: {
    fontSize: hp('2%'),
    color: Colors.subTextColor,
  },
});
