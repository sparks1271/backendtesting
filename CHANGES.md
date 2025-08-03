Overview
This document explains the major issues identified in the legacy Python/Flask API and outlines the changes made during refactoring into a Node.js + Express application with SQLite.

Major Issues Identified in Legacy Code
1.Security Vulnerabilities

    1.Raw SQL queries with string interpolation → susceptible to SQL injection.

    2.Passwords stored in plain text → no hashing or salting.

    3.No input validation on API requests (e.g., for email, password length).

    4.No error handling → exposed stack traces in case of failures.

2.Code Structure & Maintainability

    1.All logic was in a single file (no separation of routes, controllers, models).

    2.No environment configuration (hard‑coded DB names, ports, etc.).

    3.No centralized error handling.

3.Best Practices Missing

    1.Improper HTTP status codes (always returning 200/strings instead of proper JSON responses).

    2.No database initialization checks (table creation on startup missing).

    3.No tests for endpoints.


    Refactoring & Changes Made
1. Project Structure

    1.Split code into modular layers:

    2.Routes (routes/userRoutes.js) → API endpoints.

    3.Controllers (controllers/userController.js) → Business logic.

    4.Models (models/UserModel.js) → Database queries.

    5.Middlewares (middlewares/) → Validation & error handling.

    6.Utils (utils/hash.js) → Password hashing.

2. Security Improvements

    1.Parameterized SQL queries to prevent SQL injection.

    2.Passwords are hashed with bcrypt before saving.

    3.Input validation using Joi for all create/update routes.

3. Best Practices

    1.Added global error handler to standardize error responses.

    2.Used proper HTTP status codes for success & failure cases.

    3.Added environment variables using .env for DB path & port.

4. Testing & Data

    1.Created seed.js script for seeding sample users (with hashed passwords).

    2.Added Jest + Supertest for basic endpoint testing.

5.Trade‑offs & Assumptions

    1.SQLite was chosen over PostgreSQL for simplicity (single‑file DB, easier to set up for reviewers).

    2.Password reset & authentication tokens were not implemented (not part of requirements).

    3.Minimal test coverage (focused only on critical endpoints due to time constraints).
6.If I Had More Time

    1.Add JWT authentication for secure login sessions.
    
    2.Implement pagination for /users.
     
    3.Migrate to  MongoDB for production-grade scalability.
