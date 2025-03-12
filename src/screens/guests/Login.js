import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import MainContainer from '../../components/MainContainer';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utility/Colors';
import Button from '../../components/Button';
import googleImg from '../../assets/Google.png';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useUser } from '../../UserContext';
import {jwtDecode} from 'jwt-decode'

export default function Login({route}) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const {loginUser} = useUser()

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  console.log('credentials', credentials);

  const handleLoginInputChange = (field, value) => {
    setCredentials(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    loginUser(credentials.username, credentials.password);
  };

  return (
    <MainContainer
      stylesProp={{
        backgroundColor: Colors.whiteColor,
        marginTop: 0,
        paddingTop: hp('2%'),
      }}>
      <View style={styles.navContainer}>
        {canGoBack && (
          <Button
            iconName="chevron-left"
            iconSize={hp('4.5%')}
            iconOnly
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
      <View style={styles.register}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Log in</Text>
          <Text style={styles.bodyText}>
            It’s good to see you again! Log in to continue your journey with us!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              placeholder="Enter your username"
              style={styles.inputBox}
              value={credentials.email}
              onChangeText={text => handleLoginInputChange('username', text)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              style={styles.inputBox}
              value={credentials.password}
              onChangeText={text => handleLoginInputChange('password', text)}
            />
          </View>
        </View>
        <View style={styles.inputUtilityContainer}>
          <View style={{width: '50%'}}></View>
          <View style={{width: '50%'}}>
            <Text style={[styles.subText, {textAlign: 'right'}]}>
              Forgot password?
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{borderColor: '#007bff'}}
            title="Login"
            onPress={handleLogin}
          />
          <View>
            <Text style={{textAlign: 'center', color: Colors.subTextColor}}>
              Or Login with
            </Text>
          </View>
          <Button
            imageSource={googleImg}
            style={{
              borderColor: Colors.primaryTextColor,
              backgroundColor: Colors.whiteColor,
            }}
            title="Google"
            textStyle={{color: Colors.primaryTextColor, marginLeft: 0}}
            // onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  register: {
    gap: hp('2%'),
  },
  titleContainer: {
    gap: hp('1.75%'),
    marginBottom: hp('2%'),
  },
  titleText: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
  },
  inputUtilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    gap: hp('2%'),
    marginBottom: hp('2%'),
  },
  inputGroup: {
    gap: hp('1.25%'),
  },
  subText: {
    fontSize: hp('1.75%'),
    color: Colors.subTextColor,
  },
  inputText: {
    color: Colors.primaryTextColor,
  },
  buttonContainer: {
    gap: hp('2%'),
  },
  inputBox: {
    borderColor: Colors.subTextColor,
    borderWidth: 1,
    borderRadius: hp('1%'),
    paddingLeft: hp('1.75%'),
    height: hp('6%'),
    fontSize: hp('1.75%'),
  },
  bodyText: {
    fontSize: hp('2%'),
    color: Colors.subTextColor,
  },
});
