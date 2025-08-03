import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import { hashPassword } from './Utilities/passwordHashing.js';

dotenv.config();

const initDb = async () => {
  // Open (or create) the SQLite database file
  // process.env.DB_FILE comes from .env (for Railway), fallback to local file for dev
  const db = await open({
    filename: process.env.DB_FILE || './retain.db',
    driver: sqlite3.Database,
  });

  // Create 'users' table if it doesn't exist yet
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Check if any users exist in the table
  const row = await db.get('SELECT COUNT(*) as count FROM users');

  // If no users exist, insert sample data (auto-seeding)
  if (row.count === 0) {
    console.log('Seeding initial users...');
    const users = [
      { name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
      { name: 'Bob Johnson', email: 'bob@example.com', password: 'qwerty789' },
    ];

    // Insert each sample user with hashed passwords
    for (const user of users) {
      const hashed = await hashPassword(user.password); // Securely hash the password
      await db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [user.name, user.email, hashed]
      );
    }
    console.log('Users seeded!');
  }

  return db; // Return the database connection so models can use it
};

export default initDb;
