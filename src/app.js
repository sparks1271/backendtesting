// ================================
// app.js
// Purpose: Main application entry point
// ================================
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from "../src/Routes/userRoutes.js";
import { errorHandler } from "../src/Middlewares/errorHandling.js";

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json()); // Middleware for JSON parsing

app.use('/', userRoutes); // Mount all user routes

app.use(errorHandler); // Global error handling

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // Export for testing
