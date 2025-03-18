import {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import MainContainer from '../../components/MainContainer';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utility/Colors';
import Button from '../../components/Button';
import googleImg from '../../assets/Google.png';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import {AppContext} from '../../AppContext';
import {saveUser} from '../../database/userDatabase';
import {useUser} from '../../UserContext';

export default function Register() {
  const {apiUrl} = useContext(AppContext);
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    reEnteredPassword: '',
  });

  const {loginUser} = useUser();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const canGoBack = navigation.canGoBack();

  const validation = () => {
    const {username, email, password, reEnteredPassword} = credentials;
    let tempErrors = [];

    if (!username) {
      tempErrors.push({field: 'username', message: 'Username is required!'});
    }

    if (!email) {
      tempErrors.push({field: 'email', message: 'Email is required!'});
    }

    if (!password) {
      tempErrors.push({field: 'password', message: 'Password is required!'});
    }

    if (!reEnteredPassword) {
      tempErrors.push({
        field: 'reEnteredPassword',
        message: 'Please confirm your password!',
      });
    }

    if (password && reEnteredPassword && password !== reEnteredPassword) {
      tempErrors.push({
        field: 'reEnteredPassword',
        message: 'Passwords do not match!',
      });
    }

    setErrors(tempErrors);
    return tempErrors.length === 0;
  };

  const handleInputChange = (field, value) => {
    setCredentials(prevState => ({
      ...prevState,
      [field]: value,
    }));
    setErrors(prevErrors => prevErrors.filter(error => error.field !== field));
  };

  const registerUser = async () => {
    console.log('checking muna');
    if (!validation()) return;
    console.log('Valid so no worries');

    const payLoad = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    };

    setLoading(true);
    setErrors([]);

    try {
      const res = await axios.post(`${apiUrl}/users/register`, payLoad);

      if (res.status === 201) {
        console.log(res.data);
        await saveUser(
          res.data.userId,
          credentials.username,
          credentials.email,
          credentials.password,
        );
        loginUser(credentials.username, credentials.password);
      } else {
        setErrors([
          {
            field: 'general',
            message: 'Something went wrong, please try again!',
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Registration failed!', error.response?.data.error, [
        {text: 'Okay', onPress: () => null, style: 'cancel'},
      ]);
      setErrors([
        {
          field: 'general',
          message: 'An error occurred while registering the user.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = field => {
    const errorObj = errors.find(error => error.field === field);
    return errorObj ? errorObj.message : null;
  };

  return (
    <MainContainer
      stylesProp={{
        backgroundColor: Colors.whiteColor,
        marginTop: 0,
        paddingTop: hp('2%'),
        // paddingBottom: hp('10%')
      }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
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
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles.register}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Create an account</Text>
                  <Text style={styles.bodyText}>
                    Unlock a world of possibilities by creating your account
                    today. Your journey starts here!
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputText}>Username</Text>
                    <TextInput
                      placeholder="Enter your username"
                      style={styles.inputBox}
                      value={credentials.username}
                      onChangeText={text => handleInputChange('username', text)}
                    />
                    {getErrorMessage('username') && (
                      <Text style={styles.errorText}>
                        {getErrorMessage('username')}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputText}>E-mail</Text>
                    <TextInput
                      placeholder="Enter your email"
                      style={styles.inputBox}
                      value={credentials.email}
                      onChangeText={text => handleInputChange('email', text)}
                    />
                    {getErrorMessage('email') && (
                      <Text style={styles.errorText}>
                        {getErrorMessage('email')}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                      placeholder="Must be 8-24 characters"
                      style={styles.inputBox}
                      value={credentials.password}
                      onChangeText={text => handleInputChange('password', text)}
                      secureTextEntry
                    />
                    {getErrorMessage('password') && (
                      <Text style={styles.errorText}>
                        {getErrorMessage('password')}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputText}>Repeat password</Text>
                    <TextInput
                      placeholder="Enter password again"
                      style={styles.inputBox}
                      value={credentials.reEnteredPassword}
                      onChangeText={text =>
                        handleInputChange('reEnteredPassword', text)
                      }
                      secureTextEntry
                    />
                    {getErrorMessage('reEnteredPassword') && (
                      <Text style={styles.errorText}>
                        {getErrorMessage('reEnteredPassword')}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    style={{borderColor: 'transparent'}}
                    title="Sign Up"
                    onPress={registerUser}
                    disabled={loading}
                  />
                  {getErrorMessage('general') && (
                    <Text style={[styles.errorText, {textAlign: 'center'}]}>
                      {getErrorMessage('general')}
                    </Text>
                  )}
                  <Text
                    style={{textAlign: 'center', color: Colors.subTextColor}}>
                    Or Register with
                  </Text>
                  <Button
                    imageSource={googleImg}
                    style={{
                      borderColor: Colors.primaryTextColor,
                      backgroundColor: Colors.whiteColor,
                    }}
                    title="Google"
                    textStyle={{color: Colors.primaryTextColor, marginLeft: 0}}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      </TouchableWithoutFeedback>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  register: {
    gap: hp('2%'),
    flex: 1,
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
  errorText: {
    color: 'red',
    fontSize: hp('1.5%'),
    marginTop: 2,
  },
});
