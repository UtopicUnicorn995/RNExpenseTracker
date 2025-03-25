import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainContainer from '../../components/MainContainer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../../components/Card';
import Colors from '../../utility/Colors';
import {useUser} from '../../UserContext';
import SplashScreen from '../guests/SplashScreen';
import Transactions from '../../components/Transactions';

export default Home = () => {
  const {user, transactions} = useUser();
  // const {db} = useApp();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (user) {
  //       console.log('user dat', user);

  //     }
  //   };

  //   fetchUserData();
  // }, [user, db]);

  if (!user) {
    return <SplashScreen />;
  }

  // console.log('bastaa db', getTransactions(db, user.id));

  return (
    <MainContainer>
      <Card user={user} />
      <View style={styles.activityContainer}>
        <Text style={styles.textBody}>Recent activity</Text>
        <Text style={styles.textBody}>View all</Text>
      </View>
      <MainContainer hasScrollView showsVerticalScrollIndicator={false}>
        <Transactions />
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
});
