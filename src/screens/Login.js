import {View, Text} from 'react-native';
import MainContainer from '../components/MainContainer';

export default function Login() {
  return (
    <MainContainer
      stylesProp={{justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Text>Login</Text>
      </View>
    </MainContainer>
  );
}
