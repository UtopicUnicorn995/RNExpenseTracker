import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export const createExpense = async (db, apiUrl, queryPayload) => {
  const {userId, amount, category, description} = queryPayload;
  const state = await NetInfo.fetch();
  const payload = {
    user_id: userId,
    amount,
    category,
    description,
  };

  console.log('payload', payload);

  try {
    await db.executeSql(
      'INSERT INTO expenses (user_id, amount, category, description, synced) VALUES (?, ?, ?, ?, ?)',
      [userId, amount, category, description, state.isConnected ? 1 : 0],
    );
    console.log('Expense saved to local database');

    await db.executeSql(
      'UPDATE users SET available_balance = available_balance - ? WHERE id = ?',
      [amount, userId],
      (tx, results) => {
        console.log('User balance updated successfully');
      },
      (tx, error) => {
        console.error('Error updating user balance:', error);
      },
    );
  } catch (error) {
    console.error('Error saving expense to local database:', error);
    return null;
  }

  if (state.isConnected) {
    try {
      const response = await axios.post(
        `${apiUrl}/expenses/create-expense`,
        payload,
      );

      console.log('Response from the API', response);

      await db.executeSql(
        'UPDATE expenses SET synced = 1 WHERE user_id = ? AND amount = ? AND category = ? AND description = ?',
        [userId, amount, category, description],
      );

      return response.status;
    } catch (error) {
      console.error('Error syncing expense with the server:', error);
      return null;
    }
  } else {
    console.log('Device is offline, expense will be synced later');
    return 200;
  }
};
