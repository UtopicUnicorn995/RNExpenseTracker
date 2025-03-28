import {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from './Button';
import Colors from '../utility/Colors';

const screenWidth = Dimensions.get('window').width;
const modalWidth = screenWidth - 40;

export default function ModalContainer({modalVisible, handleSetModalVisible}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => handleSetModalVisible(false)}>
      <TouchableWithoutFeedback
        onPress={() => handleSetModalVisible(false)}
        accessible={false}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
              style={styles.keyboardView}>
              <View style={styles.modalContent}>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Category</Text>
                  <View>
                    <Text>Basta stuff</Text>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Amount</Text>
                  <TextInput style={styles.input} placeholder="Enter amount" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Description</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                  />
                </View>
                <Button
                  style={{borderWidth: 0, backgroundColor: Colors.subTextColor}}
                  onPress={() => handleSetModalVisible(false)}
                  title={'Save'}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    gap: hp('2.5%'),
  },
  modalContainer: {
    width: modalWidth,
    backgroundColor: Colors.whiteColor,
    padding: hp('2.75%'),
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  keyboardView: {
    width: '100%',
  },
  title: {
    color: Colors.primaryTextColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.subTextColor,
    borderRadius: 5,
    padding: 10,
  },
});
