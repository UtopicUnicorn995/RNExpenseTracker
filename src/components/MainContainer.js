import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function MainContainer({
  children,
  hasScrollView,
  showsVerticalScrollIndicator,
  stylesProp,
}) {

  if (hasScrollView) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        style={[styles.mainContainer, stylesProp]}>
        {children}
      </ScrollView>
    );
  } else {
    return <View style={[styles.mainContainer, stylesProp]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: hp('3%'),
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('3%'),
  },
});
