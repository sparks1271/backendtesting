// ================================
// UserModel.js
// Purpose: Interact with SQLite database for CRUD operations
// ================================


import initDb from "../db.js"

// Fetch all users (exclude passwords for security)

export const getAllUsers = async () => {
  const db = await initDb();
  return db.all('SELECT id, name, email FROM users'); 
};

// Fetch a single user by ID

export const getUserById = async (id) => {
  const db = await initDb();
  return db.get('SELECT id, name, email FROM users WHERE id = ?', [id]);
};

// Search users by name (case-insensitive match)


export const searchUsersByName = async (name) => {
  const db = await initDb();
  return db.all('SELECT id, name, email FROM users WHERE name LIKE ?', [`%${name}%`]);
};

// Create a new user (password is already hashed in controller)


export const createUser = async (name, email, password) => {
  const db = await initDb();
  const result = await db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return { id: result.lastID, name, email }; // Return user info (omit password)
};

// Update user details by ID


export const updateUser = async (id, name, email) => {
  const db = await initDb();
  const result = await db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  if (result.changes === 0) return null; // No user updated → invalid ID
  return { id, name, email };
};

// Delete user by ID


export const deleteUser = async (id) => {
  const db = await initDb();
  await db.run('DELETE FROM users WHERE id = ?', [id]);
};

// Fetch user by email (for login)


export const getUserByEmail = async (email) => {
  const db = await initDb();
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
};
