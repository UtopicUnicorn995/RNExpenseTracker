import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
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
        <Transactions transactions={transactions} limit={3}/>
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
