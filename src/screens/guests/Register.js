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

export default function Register({route}) {
  const {apiUrl} = useContext(AppContext);
  const {loginUser} = route.params
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    reEnteredPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canGoBack = navigation.canGoBack();

  const validation = () => {
    const {username, email, password, reEnteredPassword} = credentials;
    if (!username || !email || !password || !reEnteredPassword) {
      setError('All fields are required!');
      return false;
    }

    if (password !== reEnteredPassword) {
      setError('Passwords do not match!');
      return false;
    }

    return true;
  };

  const handleInputChange = (field, value) => {
    setCredentials(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const registerUser = async () => {
    // if (!validation()) return;

    const payLoad = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    };
 
    setLoading(true);
    setError('');

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

        loginUser(credentials.username, credentials.password)

        Alert.alert('Success!', 'Account has been successfully created.', [
          {
            text: 'Confirm',
            onPress: () => navigation.navigate('Welcome'),
          },
        ]);
      } else {
        setError('Something went wrong, please try again!');
      }
    } catch (error) {
      console.error(
        'Error during registration:',
        error.message,
        error.response?.data,
      );
      setError('An error occurred while registering the user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer
      stylesProp={{
        backgroundColor: Colors.whiteColor,
        marginTop: 0,
        paddingTop: hp('2%'),
      }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputText}>E-mail</Text>
                    <TextInput
                      placeholder="Enter your email"
                      style={styles.inputBox}
                      value={credentials.email}
                      onChangeText={text => handleInputChange('email', text)}
                    />
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
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    style={{borderColor: '#007bff'}}
                    title="Sign Up"
                    onPress={registerUser}
                    disabled={loading}
                  />
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
                    // onPress={() => navigation.navigate('Login')}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
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
});
