import {useState, memo, useEffect} from 'react';
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
import {useApp} from '../AppContext';
import {useUser} from '../UserContext';
import {createExpense} from '../database/expenseQueries';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from './Button';
import Colors from '../utility/Colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {Toast} from 'toastify-react-native';

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

const ModalContainer = ({modalVisible, handleSetModalVisible}) => {
  const {db, apiUrl} = useApp();
  const {user, refreshData} = useUser();

  console.log('user from the modal', user, user.id)
  const [expense, setExpense] = useState({userId: user.id});

  useEffect(() => {
    if (user?.id) {
      setExpense(prev => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user?.id]);

  const handleSelectCategory = categoryName => {
    handleExpenseData('category', categoryName);
  };

  const handleCreateExpense = async () => {
    const response = await createExpense(db, apiUrl, expense);

    console.log('response', response, expense)

    if (response === 200) {
      refreshData();
      handleSetModalVisible(false);
      setExpense(prev => ({
        ...prev,
        description: '',
        amount: 0,
        category: '',
      }));
      Toast.success('Expenses successfully created');
    } else {
      Toast.error('Error creating expense');
    }
  };

  const handleExpenseData = (field, value) => {
    console.log('amount', expense.amount);

    if (field === 'amount') {
      const numericValue = value.replace(/[^0-9.]/g, '');
      if (/^\d*\.?\d*$/.test(numericValue)) {
        setExpense(prev => ({
          ...prev,
          [field]: numericValue,
        }));
      } else {
        console.log('Invalid amount input');
      }
    } else {
      setExpense(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

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
                  <Text>I'll add the textes here tomorrow</Text>
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
                            icon.name == expense.category
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
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    value={expense.amount || ''}
                    keyboardType="numeric"
                    onChangeText={text => handleExpenseData('amount', text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Description</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    value={expense.description || ''}
                    onChangeText={text =>
                      handleExpenseData('description', text)
                    }
                  />
                </View>
                <Button
                  style={{borderWidth: 0, backgroundColor: Colors.subTextColor}}
                  onPress={handleCreateExpense}
                  title={'Save'}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(ModalContainer);

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
