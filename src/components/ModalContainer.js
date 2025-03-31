import {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from './Button';
import Colors from '../utility/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const icons = [
  {
    name: 'shopping-cart',
    activeColor: '#FF6A00',
    size: hp('3.5%'),
  },
  {
    name: 'laptop',
    activeColor: '#7A2B1B',
    size: hp('3.5%'),
  },
  {
    name: 'glass',
    activeColor: '#4CAF50',
    size: hp('3.5%'),
  },
  {
    name: 'heartbeat',
    activeColor: '#E91E63',
    size: hp('3.5%'),
  },
  {
    name: 'credit-card',
    activeColor: '#001BB1',
    size: hp('3.5%'),
  },
  {
    name: 'graduation-cap',
    activeColor: '#2196F3',
    size: hp('3.5%'),
  },
];

const screenWidth = Dimensions.get('window').width;
const modalWidth = screenWidth - 40;

export default function ModalContainer({modalVisible, handleSetModalVisible}) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = categoryName => {
    setSelectedCategory(categoryName);
  };

  console.log('selected category', selectedCategory);

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
                <View>
                  <Text>I'll add the texes here tomorrow</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Category</Text>
                  <View style={styles.categoryIconsContainer}>
                    {icons.map((icon, index) => {
                      return (
                        <FAIcon
                          key={index}
                          name={icon.name}
                          size={icon.size}
                          color={
                            icon.name == selectedCategory
                              ? icon.activeColor
                              : Colors.subTextColor
                          }
                          onPress={() => handleSelectCategory(icon.name)}
                        />
                      );
                    })}
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
  categoryIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    rowGap: hp('5%'),
    columnGap: hp('9%'),
    padding: hp('2%'),
  },
});
