import Colors from '../utility/Colors';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {convertToPeso} from '../utility/utils';

export default Transactions = ({transactions}) => {
  const TransactionItem = ({transaction}) => {
    console.log('transaction', transaction);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // const date = new Date(transaction.action_time).toLocaleString();
    const date = new Date(transaction.action_time);

    const getDateString = `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;

    const categoryStyles = {
      deposit: styles.depositStyle,
      withdrawal: styles.withdrawStyle,
      credit: styles.withdrawStyle,
      transfer: styles.transferStyle,
      payment: styles.withdrawStyle,
      update: styles.neutralStyle,
      default: styles.neutralStyle,
    };

    const amountStyleName =
      categoryStyles[transaction.category] || categoryStyles.default;

    console.log('amoyunt Style name', amountStyleName, transaction.category);

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionItemLeft}>
          <Text style={styles.transactionItemTitle}>
            {transaction.description
              ? transaction.description
              : 'No description'}
          </Text>
          <Text style={styles.transactionCategoryText}>
            {transaction.category}
          </Text>
        </View>
        <View style={styles.transactionItemRight}>
          <Text style={[styles.transactionItemAmount, amountStyleName]}>
            {convertToPeso(transaction.amount)}
          </Text>
          <Text style={styles.transactionItemDate}>{getDateString}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({item}) => <TransactionItem transaction={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionItemTitle: {
    fontSize: hp('2%'),
    color: Colors.primaryTextColor,
  },
  transactionCategoryText: {
    fontSize: hp('1.75%'),
    color: Colors.subTextColor,
  },
  transactionItemDate: {
    fontSize: hp('1.5%'),
    color: Colors.primaryTextColor,
  },
  transactionItemRight: {
    alignItems: 'flex-end',
  },
  neutralStyle:{
    color: Colors.primaryTextColor,
  },
  depositStyle: {
    color: Colors.green,
  },
  withdrawStyle: {
    color: Colors.red,
  },
});
