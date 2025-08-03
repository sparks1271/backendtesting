// ================================
// Middleware: errorHandler.js
// Purpose: Catch errors globally and send a standard response
// ================================
export const errorHandler = (err, req, res, next) => {
  console.error(err); // Log error for debugging
  res.status(500).json({ error: 'Something went wrong' }); // Send generic error response
};