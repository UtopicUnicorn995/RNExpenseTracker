import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export const logUsersTable = async db => {
  if (!db) {
    console.error('Database is undefined');
    return;
  }

  console.log('here has db.', db);

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users',
      [],
      (tx, results) => {
        console.log('📋 Users table:', results.rows);
        const len = results.rows.length;
        if (len > 0) {
          let users = [];
          for (let i = 0; i < len; i++) {
            users.push(results.rows.item(i));
          }
          console.log('📋 Users tables:', users);
        } else {
          console.log('📋 Users table is empty');
        }
      },
      (tx, error) => {
        console.error('Error fetching users table:', error);
      },
    );
  });
};

export const saveUser = async (
  db,
  userId,
  username,
  email,
  availableBalance,
  accountNumber,
  role,
) => {
  if (!db) {
    console.error('Database is undefined');
    return;
  }

  console.log(
    'here has db. while sabing',
    userId,
    username,
    email,
    availableBalance,
    accountNumber,
    role,
  );

  try {
    await db.transaction(async tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO users (id, username, email, account_number, available_balance, role) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, username, email, accountNumber, availableBalance, role],
        (tx, results) => {
          console.log('User saved to SQLite', results.rows.item(0));
          logUsersTable(db);
        },
        (tx, error) => {
          console.error('Save user error:', error);
          logUsersTable(db);
        },
      );
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};

export const getUser = async db => {
  const state = await NetInfo.fetch();

  // if (state.isConnected) {
  // } else {
  if (!db || typeof db.transaction !== 'function') {
    console.error(
      'Database is undefined or not properly initialized',
      db,
      db.transaction,
    );
    return null;
  }
  console.log('here has db22s.', db);

  try {
    const result = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users LIMIT 1',
          [],
          (tx, results) => {
            if (results.rows.length > 0) {
              const item = results.rows.item(0);
              console.log('Got user:', item);
              resolve(item);
            } else {
              console.log('No user found');
              resolve(null);
            }
            logUsersTable(db);
          },
          (tx, error) => {
            console.error('Get user error:', error);
            reject(error);
            logUsersTable(db);
          },
        );
      });
    });
    console.log('returnn', result);
    return result;
  } catch (error) {
    console.error('Transaction error:', error);
    return null;
  }
  // }
};

export const clearUser = async db => {
  if (!db) {
    console.error('Database is undefined');
    return;
  }

  try {
    await db.transaction(async tx => {
      tx.executeSql(
        'DELETE FROM users',
        [],
        (tx, results) => {
          console.log('User removed from SQLite', results);
          logUsersTable(db);
        },
        (tx, error) => {
          console.error('Clear user error:', error);
          logUsersTable(db);
        },
      );

      tx.executeSql(
        'DELETE FROM transactions',
        [],
        (tx, results) => {
          console.log(
            'Transactions cleared from SQLite:',
            results.rowsAffected,
          );
        },
        (tx, error) => {
          console.error('Clear transactions error:', error);
        },
      );
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};


// export const saveTransaction = async (
//   db,
//   userId,
//   action,
//   amount,
//   category,
//   description,
//   date,
// ) => {
//   if (!db) {
//     console.error('Database is undefined');
//     return;
//   }

//   console.log('saving the transactions');

//   try {
//     await db.transaction(async tx => {
//       tx.executeSql(
//         'INSERT INTO transactions (user_id, action, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
//         [userId, action, amount, category, description, date],
//         (tx, results) => {
//           console.log('Transaction saved to SQLite', results.rows.item(0));
//           logUsersTable(db);
//         },
//         (tx, error) => {
//           console.error('Save transaction error:', error);
//           logUsersTable(db);
//         },
//       );
//     });
//   } catch (error) {}
// };

export const getTransactions = async (db, userId, apiUrl) => {
  console.log('starting.', db, userId);
  if (!db || typeof db.transaction !== 'function') {
    console.error(
      'Database is undefined or not properly initialized',
      db,
      db.transaction,
    );
    return null;
  }

  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      try {
        const response = await axios.get(`${apiUrl}/users/get-transactions`, {
          params: {user_id: userId},
        });
        console.log('Got transactions from API:', response.data);
        await saveTransactionsToLocalDB(db, response.data);

        let transactions = [];

        if (response.data.result.length > 0) {
          for (let i = 0; i < response.data.result.length; i++) {
            transactions.push(response.data.result[i]);
          }
        }

        return transactions;
      } catch (apiError) {
        console.error('API error:', apiError);
      }
    } else {
      const result = await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM transactions WHERE user_id = ?',
            [userId],
            (tx, results) => {
              console.log('Got transactions from local DB:', results.rows);
              if (results.rows.length > 0) {
                let transactions = [];
                for (let i = 0; i < results.rows.length; i++) {
                  transactions.push(results.rows.item(i));
                }
                console.log('Got transactions from local DB:', transactions);
                resolve(transactions);
              } else {
                console.log('No transactions found');
                resolve([]);
              }
            },
            (tx, error) => {
              console.error('Get transactions error:', error);
              reject(error);
            },
          );
        });
        return result;
      });
    }
  } catch (error) {
    console.error('Transaction error:', error);
    return null;
  }
};

const saveTransactionsToLocalDB = async (db, transactions) => {
  try {
    await db.transaction(async tx => {
      transactions.forEach(transaction => {
        tx.executeSql(
          'INSERT OR REPLACE INTO transactions (id, user_id, action, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            transaction.id,
            transaction.user_id,
            transaction.action,
            transaction.amount,
            transaction.category,
            transaction.description,
            transaction.date,
          ],
          (tx, results) => {
            console.log('Transaction saved to local DB:', results.rowsAffected);
          },
          (tx, error) => {
            console.error('Save transaction to local DB error:', error);
          },
        );
      });
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};
