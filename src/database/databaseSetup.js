import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const initDB = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'expenseTracker.db',
      location: 'default',
    });

    await createTables(db);
    console.log('Database opened successfully', db);

    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    return null;
  }
};

export const createTables = async db => {
  if (!db) {
    console.error('Database object is undefined');
    return;
  }

  try {
    await db.transaction(async tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          account_number TEXT UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          is_active INTEGER DEFAULT 1,
          role TEXT DEFAULT 'user',
          available_balance REAL DEFAULT 0.0
        );`,
        [],
        (tx, results) => {
          console.log('Users table created successfully!');
        },
        (tx, error) => {
          console.error('Failed to create users table:', error);
        },
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          description TEXT,
          category TEXT,
          synced INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );`,
        [],
        (tx, results) => {
          console.log('Expenses table created successfully!');
        },
        (tx, error) => {
          console.error('Failed to create expenses table:', error);
        },
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          expense_id INTEGER,
          user_id INTEGER,
          action TEXT,
          amount REAL,
          category TEXT,
          description TEXT,
          date TEXT,
          action_time TEXT DEFAULT (datetime('now'))
        );`,
        [],
        (tx, results) => {
          console.log('transactions table created successfully!');
        },
        (tx, error) => {
          console.error('Failed to create transactions table:', error);
        },
      );
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};
