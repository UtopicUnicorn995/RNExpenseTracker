import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'expenseTracker.db', location: 'default' },
  () => console.log('Database opened'),
  error => console.error('Database error:', error)
);

if (!db) {
  console.error("Database is not initialized!");
}

// Function to create the users table
export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_active INTEGER DEFAULT 1,
        role TEXT DEFAULT 'user'
      )`,
      [],
      () => console.log('Users table created'),
      error => console.error('Table creation error:', error)
    );
  });
};

// Function to insert or update a user
export const saveUser = (userId, username, email, password) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT OR REPLACE INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
      [userId, username, email, password],
      () => console.log('User saved to SQLite'),
      error => console.error('Save user error:', error)
    );
  });
};

// Function to get a user from the database
export const getUser = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users LIMIT 1',
      [],
      (_, result) => {
        if (result.rows.length > 0) {
          callback(result.rows.item(0));
        } else {
          callback(null);
        }
      },
      error => {
        console.error('Get user error:', error);
        callback(null);
      }
    );
  });
};

// Function to delete all users (log out)
export const clearUser = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM users',
      [],
      () => console.log('User removed from SQLite'),
      error => console.error('Clear user error:', error)
    );
  });
};

// Export the database instance
export default db;
