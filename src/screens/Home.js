import {View, Text} from 'react-native';
import MainContainer from '../components/MainContainer';

export default Home = () => {
  return (
    <MainContainer>
      <Text>Hello world!</Text>
      <MainContainer hasScrollView>
        <Text>Hello world from the main container!</Text>
      </MainContainer>
    </MainContainer>
  );
};
