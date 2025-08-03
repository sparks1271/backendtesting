// ===============================
// User Controller
// Handles all user-related API logic
// ===============================


import {
  getAllUsers, getUserById, searchUsersByName,
  createUser, updateUser, deleteUser, getUserByEmail} from "../Model/UserModel.js"
import { hashPassword, comparePassword } from "../Utilities/passwordHashing.js";


/**
 * Get all users
 */

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) { next(err); }
};


/**
 * Get single user by ID
 */

export const getUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};


/**
 * Search users by name
 */

export const searchUsers = async (req, res, next) => {
  try {
    const users = await searchUsersByName(req.query.name || '');
    res.json(users);
  } catch (err) { next(err); }
};

/**
 * Create new user
 */

export const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await createUser(name, email, hashedPassword);
    res.status(201).json(user);
  } catch (err) { next(err); }
};


/**
 * Update user by ID
 */

export const updateExistingUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await updateUser(req.params.id, name, email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

/**
 * Delete user by ID
 */

export const deleteExistingUser = async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
};

/**
 * User login
 */

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', userId: user.id });
  } catch (err) { next(err); }
};
