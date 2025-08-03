// ================================
// hash.js
// Purpose: Handle password hashing and comparison using bcrypt
// ================================

import bcrypt from 'bcrypt';

// Hash password with salt rounds (10)

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare plain password with hashed password

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
