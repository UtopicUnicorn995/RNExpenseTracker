import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import MainContainer from '../../components/MainContainer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../../components/Card';
import Colors from '../../utility/Colors';
import {useUser} from '../../UserContext';
import SplashScreen from '../guests/SplashScreen';
import Transactions from '../../components/Transactions';
import {useNavigation} from '@react-navigation/native';

export default Home = () => {
  const {user, transactions} = useUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('loading... refreshing data', transactions)
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [transactions]);

  console.log('Transactions from the home screen:', transactions, user);

  if (!user) {
    return <SplashScreen />;
  }

  const viewAll = () => {
    navigation.push('TransactionScreen', {transactions});
  };

  return (
    <MainContainer>
      <Card user={user} />
      <View style={styles.activityContainer}>
        <Text style={styles.textBody}>Recent activity</Text>
        <Pressable onPress={viewAll}>
          <Text style={styles.textBody}>View all</Text>
        </Pressable>
      </View>
      <MainContainer showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryTextColor} />
        ) : transactions && transactions.length > 0 ? (
          <Transactions transactions={transactions} limit={20} />
        ) : (
          <Text style={styles.noTransactionsText}>No recent activity</Text>
        )}
      </MainContainer>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: hp('2%'),
    paddingHorizontal: hp('2%'),
  },
  textBody: {
    color: Colors.primaryTextColor,
    fontSize: hp('2.25%'),
    fontWeight: 'bold',
  },
  noTransactionsText: {
    textAlign: 'center',
    color: Colors.primaryTextColor,
    fontSize: hp('2%'),
    marginTop: hp('2%'),
  },
});
