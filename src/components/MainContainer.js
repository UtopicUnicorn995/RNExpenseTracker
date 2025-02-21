import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function MainContainer({children, hasScrollView}) {
  return <View style={styles.mainContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('3%'),
  },
});
