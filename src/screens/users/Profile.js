import {View, Text} from 'react-native';
import MainContainer from '../../components/MainContainer';
import Button from '../../components/Button';
import {clearUser} from '../../database/userDatabase';
import {useApp} from '../../AppContext';
import {useUser} from '../../UserContext';

export default function Profile() {
  const {db} = useApp();
  const {setUserData} = useUser();

  return (
    <MainContainer>
      <Button
        title="Logout"
        onPress={async () => {
          await clearUser(db);
          setUserData(null);
        }}
      />
    </MainContainer>
  );
}
