import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../utility/Colors';

export default function Card({user}) {
  console.log(
    'cardNumber',
    user.account_number,
    'cardBalance',
    user.available_balance,
    user,
  );

  const displayCardNumber =
    user.account_number !== undefined ? user.account_number : '374245455400126';
  const displayCardBalance =
    user.available_balance !== undefined ? user.available_balance : 2334543;

  return (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors.cardBg,
            transform: [{rotate: '7deg'}],
          },
        ]}></View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors.cardBg,
            transform: [{rotate: '-7deg'}],
          },
        ]}></View>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitleText}>Total Balance</Text>
          <Text style={styles.cardBalanceText}>
            {formatBalance(displayCardBalance)}
          </Text>
        </View>
        <View style={styles.cardNumberContainer}>
          <MaskedNumber number={displayCardNumber} />
          <Image
            style={styles.imgStyle}
            source={require('../assets/Eclispe.png')}
          />
        </View>
      </View>
    </View>
  );
}

const formatNumber = (number, showFull) => {
  const masked = showFull ? number : number.replace(/\d(?=\d{4})/g, '*');
  return masked.replace(/(.{4})/g, '$1 ');
};

const formatBalance = number => {
  if (typeof number === 'string') {
    const cleanedNumber = number.replace(/[$,]/g, '');
    const parsed = parseFloat(cleanedNumber);

    if (!isNaN(parsed)) {
      return `$${parsed.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    }
  }

  if (typeof number === 'number' || Number.isInteger(number)) {
    return `$${number.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  }

  return '$0.00';
};

const MaskedNumber = ({number}) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <TouchableOpacity onPress={() => setShowFull(prev => !prev)}>
      <Text style={styles.cardNumberText}>
        {formatNumber(number, showFull)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    width: '100%',
    height: hp('22%'),
    marginBottom: hp('5%'),
    paddingHorizontal: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    padding: hp('3%'),
    borderRadius: hp('2%'),
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: Colors.whiteColor,
  },
  cardTitleText: {
    fontSize: hp('2.5%'),
    color: Colors.subTextColor,
  },
  cardBalanceText: {
    fontSize: hp('3.25%'),
    color: Colors.primaryTextColor,
  },
  cardNumberText: {
    fontSize: hp('2.5%'),
    color: Colors.subTextColor,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgStyle: {
    width: hp('6%'),
    aspectRatio: 3 / 2,
  },
});
