import {View, Text, StyleSheet} from 'react-native';
import MainContainer from '../../components/MainContainer';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Card from '../../components/Card';
import Colors from '../../utility/Colors';

export default Home = () => {
  return (
    <MainContainer>
      <Card cardBalance={'$23,345.43'} />
      <View style={styles.activityContainer}>
        <Text style={styles.textBody}>Recent activity</Text>
        <Text style={styles.textBody}>View all</Text>
      </View>
      <MainContainer hasScrollView showsVerticalScrollIndicator={false}>
        <Text>
          Hello world from the main container! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Tenetur reiciendis delectus, vitae
          molestias provident hic, voluptate commodi doloribus quo nulla amet.
          Perferendis rerum quidem quas magni dicta. Ut, quia repudiandae.
        </Text>
        <Text>
          Hello world from the main container! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Tenetur reiciendis delectus, vitae
          molestias provident hic, voluptate commodi doloribus quo nulla amet.
          Perferendis rerum quidem quas magni dicta. Ut, quia repudiandae.
        </Text>
        <Text>
          Hello world from the main container! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Tenetur reiciendis delectus, vitae
          molestias provident hic, voluptate commodi doloribus quo nulla amet.
          Perferendis rerum quidem quas magni dicta. Ut, quia repudiandae.
        </Text>
        <Text>
          Hello world from the main container! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Tenetur reiciendis delectus, vitae
          molestias provident hic, voluptate commodi doloribus quo nulla amet.
          Perferendis rerum quidem quas magni dicta. Ut, quia repudiandae.
        </Text>
        <Text>
          Hello world from the main container! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Tenetur reiciendis delectus, vitae
          molestias provident hic, voluptate commodi doloribus quo nulla amet.
          Perferendis rerum quidem quas magni dicta. Ut, quia repudiandae.
        </Text>
        <Text>
          Hello world from the main container! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Tenetur reiciendis delectus, vitae
          molestias provident hic, voluptate commodi doloribus quo nulla amet.
          Perferendis rerum quidem quas magni dicta. Ut, quia repudiandae.
        </Text>
        <Text>
          Hello world from the main container! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Tenetur reiciendis delectus, vitae
          molestias provident hic, voluptate commodi doloribus quo nulla amet.
          Perferendis rerum quidem quas magni dicta. Ut, quia repudiandae.
        </Text>
      </MainContainer>
    </MainContainer>
  );
};

styles = StyleSheet.create({
    activityContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: hp('2%'),
        paddingHorizontal: hp('2%')
    },
    textBody:{
        color: Colors.primaryTextColor,
        fontSize: hp('2.25%'),
        fontWeight: 'bold'
    }
})