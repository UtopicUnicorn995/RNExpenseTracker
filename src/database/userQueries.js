export const logUsersTable = async db => {
  if (!db) {
    console.error('Database is undefined');
    return;
  }

  db.transaction(tx => {
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
      },
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
    await db.transaction(async tx => {
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
        },
      );
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};

export const getUser = async db => {
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

    return result;
  } catch (error) {
    console.error('Transaction error:', error);
    return null;
  }
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
    });
  } catch (error) {
    console.error('Transaction error:', error);
  }
};
