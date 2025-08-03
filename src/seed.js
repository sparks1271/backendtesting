// ================================
// seed.js
// Purpose: Seed database with sample users
// ================================

import initDb from './db.js';
import { hashPassword } from "../src/Utilities/passwordHashing.js";

const seed = async () => {
  const db = await initDb();

  // Clear old data

  await db.exec('DELETE FROM users');

  // Sample user data

  const users = [
    { name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Bob Johnson', email: 'bob@example.com', password: 'qwerty789' },
  ];

  // Insert users with hashed passwords
  
  for (const user of users) {
    const hashed = await hashPassword(user.password);
    await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, hashed]
    );
  }

  console.log('Database seeded with sample users!');
  process.exit();
};

seed();
