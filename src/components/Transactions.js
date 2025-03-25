import Colors from '../utility/Colors';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default Transactions = ({transactions}) => {
  const TransactionItem = ({transaction}) => {
    console.log('transaction', transaction);
    const date = new Date(transaction.action_time).toLocaleString();

    const categoryStyles = {
      deposit: styles.depositStyle,
      withdraw: styles.withdrawStyle,
      transfer: styles.transferStyle,
      payment: styles.withdrawStyle,
      update: styles.withdrawStyle,
      default: styles.noStyle,
    };

    const amountStyleName =
      categoryStyles[transaction.category] || categoryStyles.default;

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
          <Text style={[styles.transactionItemAmount, styles.amountStyleName]}>
            {transaction.amount}
          </Text>
          <Text style={styles.transactionItemDate}>{date}</Text>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    marginBottom: hp('1%'),
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
    fontSize: hp('1.25%'),
    color: Colors.primaryTextColor,
  },
});
