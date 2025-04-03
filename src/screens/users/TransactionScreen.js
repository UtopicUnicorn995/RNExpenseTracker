import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainContainer from '../../components/MainContainer';
import Transactions from '../../components/Transactions';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../../utility/Colors';

export default function TransactionScreen({route}) {
  const transactions = route.params.transactions;
  console.log('routee', route.params);
  return (
    <MainContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Transactions History</Text>
        <Transactions transactions={transactions} />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingBottom: hp('8%')
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
    marginBottom: hp('2%'),
  },
});
