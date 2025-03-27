import Colors from '../utility/Colors';
import {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Button from './Button';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {convertToPeso} from '../utility/utils';

export default Transactions = ({transactions, limit, onViewMore}) => {
  const [filteredTransactions, setFilteredTransactions] = useState(
    limit && transactions.length > limit
      ? [...transactions.slice(0, limit), {type: 'button'}]
      : transactions,
  );

  console.log('transactions fil', filteredTransactions);

  const handleShowMore = () => {
    setFilteredTransactions(transactions);
  };

  const TransactionItem = ({transaction}) => {
    console.log('Rendering transaction item:', transaction);

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

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionItemLeft}>
          <Text style={styles.transactionItemTitle}>
            {transaction.description
              ? transaction.description
              : 'No description'}
          </Text>
          <Text style={styles.transactionCategoryText}>
            {console.log('category', transaction.category)}
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

  const renderItem = ({item}) => {
    console.log('redered item', item);
    if (item.type === 'button') {
      return <Button textOnly onPress={handleShowMore} title={'View more'} />;
    }

    return <TransactionItem transaction={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.type === 'button' ? `button-${index}` : item.id.toString()
        }
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
  neutralStyle: {
    color: Colors.primaryTextColor,
  },
  depositStyle: {
    color: Colors.green,
  },
  withdrawStyle: {
    color: Colors.red,
  },
  viewMoreButton: {
    marginTop: hp('2%'),
    alignItems: 'center',
    padding: hp('1.5%'),
    backgroundColor: Colors.primaryButtonColor,
    borderRadius: hp('1%'),
  },
  viewMoreText: {
    color: Colors.white,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});
