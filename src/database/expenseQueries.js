import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let expenseDb;

export const initExpenseDB = async () => {
  try {
    expenseDb = await SQLite.openDatabase({ name: 'expenses.db', location: 'default' });
    console.log('Database opened');

    // Create tables if they don't exist
    await expenseDb.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          amount REAL,
          category TEXT,
          description TEXT,
          date TEXT,
          synced INTEGER DEFAULT 0
        );`
      );

      // Optional: Expense history table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expense_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          expense_id INTEGER,
          user_id INTEGER,
          action TEXT,
          amount REAL,
          category TEXT,
          description TEXT,
          date TEXT,
          action_time TEXT DEFAULT (datetime('now'))
        );`
      );
    });

    console.log('Tables created successfully');
    return expenseDb;
  } catch (error) {
    console.log('Failed to open database:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!expenseDb) {
    throw new Error('Database not initialized! Call initDB() first.');
  }
  return expenseDb;
};
