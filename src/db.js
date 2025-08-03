// ================================
// db.js
// Purpose: Initialize SQLite database and create 'users' table if missing
// ================================
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
dotenv.config();

const initDb = async () => {
  const db = await open({
    filename: process.env.DB_FILE, // Path to SQLite DB file
    driver: sqlite3.Database,
  });

  // Create 'users' table if it does not exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  return db;
};

export default initDb;
