import {View, Text, StyleSheet, Image} from 'react-native';
import MainContainer from '../../components/MainContainer';
import Button from '../../components/Button';
import {clearUser} from '../../database/userQueries';
import {useApp} from '../../AppContext';
import {useUser} from '../../UserContext';
import MAIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utility/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const {db} = useApp();
  const {setUserData, setTransactions} = useUser();
  const navigation = useNavigation();

  const clearUserData = async () => {
    if (!db) {
      console.error('Database is not initialized');
      return;
    }
    try {
      await clearUser(db);

      setUserData(null);
      setTransactions([]);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  const logout = async () => {
    await clearUserData(db);
    console.log('User logged out and data cleared');
  };

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <View style={styles.avatarIcon}>
            <MAIcons name="person" size={hp('7.5%')} color={'#000'} />
          </View>
          <Text style={styles.avatarName}>@Username</Text>
        </View>
      </View>
      <Button style={{borderWidth: 0}} title="Logout" onPress={logout} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    alignItems: 'center',
  },
  avatarName: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
  },
  avatarIcon: {
    padding: hp('1%'),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 999,
  },
});
