// ================================
// Middleware: userValidate.js
// Purpose: Validate incoming user data using Joi
// ================================
import Joi from 'joi';

// Middleware to validate user data before creating/updating


export const validateUser = (req, res, next) => {

  // Define validation schema

  
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(), // Name: required, 3–50 chars
    email: Joi.string().email().required(),       // Email: valid format, required
    password: Joi.string().min(6).optional()      // Password: optional (for updates), min 6 chars
  });

  const { error } = schema.validate(req.body); // Validate request body
  if (error) return res.status(400).json({ error: error.details[0].message }); // Send 400 if invalid
  next(); // Continue to controller if valid
};