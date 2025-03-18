import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const initDB = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'expenseTracker.db',
      location: 'default',
    });

    console.log('Database opened successfully');
    await createUserTable(db);

    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    return null;
  }
};

export const createUserTable = async (db) => {
  if (!db) {
    console.error('Database object is undefined');
    return;
  }

  try {
    await db.transaction(async (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          is_active INTEGER DEFAULT 1,
          role TEXT DEFAULT 'user'
        );`,
        [],
        (tx, results) => {
          console.log('Users table created successfully!');
        },
        (tx, error) => {
          console.error('Failed to create users table:', error);
        }
      );
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};

export const logUsersTable = async (db) => {
  if (!db) {
    console.error('Database is undefined');
    return;
  }

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM users',
      [],
      (tx, results) => {
        const len = results.rows.length;
        if (len > 0) {
          let users = [];
          for (let i = 0; i < len; i++) {
            users.push(results.rows.item(i));
          }
          console.log('📋 Users table:', users);
        } else {
          console.log('📋 Users table is empty');
        }
      },
      (tx, error) => {
        console.error('Error fetching users table:', error);
      }
    );
  });
};


export const saveUser = async (db, userId, username, email) => {
  if (!db) {
    console.error('Database is undefined');
    return;
  }

  console.log('here has db.', db);

  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO users (id, username, email) VALUES (?, ?, ?)',
        [userId, username, email],
        (tx, results) => {
          console.log('User saved to SQLite');
          logUsersTable(db);
        },
        (tx, error) => {
          console.error('Save user error:', error);
          logUsersTable(db);
        }
      );
    }, (error) => {
      console.error('Transaction error:', error);
    }, () => {
      console.log('Transaction completed successfully');
    });
  } catch (error) {
    console.error('Outer transaction error:', error);
  }
};

export const getUser = async (db) => {
  if (!db) {
    console.error('Database is undefined');
    return null;
  }
  console.log('here has db2.', db)
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users LIMIT 1',
        [],
        async (tx, results) => {
          if (results.rows.length > 0) {
            const item = results.rows.item(0);
            console.log('Got user:', item);
            resolve(item);
          } else {
            console.log('No user found');
            resolve(null);
          }
          await logUsersTable(db)
        },
        async (tx, error) => {
          console.error('Get user error:', error);
          reject(error);
          await logUsersTable(db)
        }
      );
    });
  });
};

export const clearUser = async (db) => {
  if (!db) {
    console.error('Database is undefined');
    return;
  }

  try {
    await db.transaction(async (tx) => {
      tx.executeSql(
        'DELETE FROM users',
        [],
        async (tx, results) => {
          console.log('User removed from SQLite', results);
          await logUsersTable(db)
        },
        async (tx, error) => {
          console.error('Clear user error:', error);
          await logUsersTable(db)
        }
      );
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};
