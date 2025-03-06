import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import MainContainer from '../../components/MainContainer';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utility/Colors';
import Button from '../../components/Button';
import googleImg from '../../assets/Google.png';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Register({route}) {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    reEnteredPassword: '',
  });

  const canGoBack = navigation.canGoBack();

  const validation = () => {};

  console.log('credentials', credentials);

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
          <Text style={styles.titleText}>Create an account</Text>
          <Text style={styles.bodyText}>
            Unlock a world of possibilities by creating your account today. Your
            journey starts here!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Name</Text>
            <TextInput
              placeholder="Enter your full name"
              style={styles.inputBox}
              value={credentials.name}
              onChangeText={text =>
                setCredentials(prevState => ({
                  ...prevState,
                  name: text,
                }))
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputText}>E-mail</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.inputBox}
              value={credentials.email}
              onChangeText={text =>
                setCredentials(prevState => ({
                  ...prevState,
                  email: text,
                }))
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              placeholder="Must be 8-24 characters"
              style={styles.inputBox}
              value={credentials.password}
              onChangeText={text =>
                setCredentials(prevState => ({
                  ...prevState,
                  password: text,
                }))
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Repeat password</Text>
            <TextInput
              placeholder="Enter password again"
              style={styles.inputBox}
              value={credentials.reEnteredPassword}
              onChangeText={text =>
                setCredentials(prevState => ({
                  ...prevState,
                  reEnteredPassword: text,
                }))
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{borderColor: '#007bff'}}
            title="Sign Up"
            // onPress={() => navigation.navigate('Login')}
          />
          <View>
            <Text style={{textAlign: 'center', color: Colors.subTextColor}}>
              Or Register with
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
  inputContainer: {
    gap: hp('2%'),
    marginBottom: hp('2%'),
  },
  inputGroup: {
    gap: hp('1.25%'),
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
