// ================================
// userRoutes.js
// Purpose: Define API endpoints for user management
// ================================


import express from 'express';
import {
  getUsers, getUser, searchUsers,
  createNewUser, updateExistingUser, deleteExistingUser, loginUser
} from "../Controller/userController.js";
import { validateUser } from "../Middlewares/userVaidate.js"

const router = express.Router();

// Health check route

router.get('/', (req, res) => res.send('User Management System'));

// Get all users

router.get('/users', getUsers);

// Get a specific user by ID

router.get('/user/:id', getUser);

// Search users by name

router.get('/search', searchUsers);

// Create a new user (validated)

router.post('/users', validateUser, createNewUser);

// Update a user by ID (validated)

router.put('/user/:id', validateUser, updateExistingUser);

// Delete a user by ID

router.delete('/user/:id', deleteExistingUser);

// Login route

router.post('/login', loginUser);

export default router;
