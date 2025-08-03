# User Management API (Refactored)

A simple **User Management REST API** built with **Node.js + Express + SQLite**.  
This project refactors a legacy Flask application to follow **modern best practices**:  
- Proper project structure (controllers, routes, models, middlewares)  
- Input validation using **Joi**  
- Password hashing using **bcrypt**  
- **Auto-seeding** with sample users for quick testing  
- Ready for deployment on **Railway** (or any Node hosting)

---

## **Tech Stack**
- **Backend:** Node.js, Express  
- **Database:** SQLite (file-based, easy for demos & cloud deployment)  
- **Validation:** Joi  
- **Security:** Bcrypt for password hashing  
- **Environment:** dotenv for configuration  

---

## **Getting Started**

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/apirefactoring.git
cd apirefactoring

### Install dependencies
  npm install
###Create a .env file in the project root:
  PORT=5000
  DB_FILE=./retain.db
### Run in development
  npm start

### On the first startup, if the users table is empty, the app automatically seeds 3 sample users:

[
  { "name": "John Doe", "email": "john@example.com" },
  { "name": "Jane Smith", "email": "jane@example.com" },
  { "name": "Bob Johnson", "email": "bob@example.com" }
]

### API END POINTS
1. Health Check
  ** GET /
  { "status": "API is running successfully!" }

2. Get All Users
  **GET /users
    [
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
  ]

3.Get User by ID
  ** GET /user/:id
   { "id": 1, "name": "John Doe", "email": "john@example.com" }

4. Search Users by Name
  ** GET /search?name=John
   [
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
  ]

5. Create New User
  ** POST /users
  {
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securepass"
}

6. Update User
 ** PUT /user/:id
{
  "name": "Updated Name",
  "email": "updated@example.com"
}

7. Delete User
 ** DELETE /user/:id
 "DELETED SUCCESSFULLY"

8. LOGIN User
  ** POST /login
{
  "email": "john@example.com",
  "password": "password123"
}

RESPONSE { "status": "success", "user_id": 1 }

** LIVE PREVIEW LINK **
 url= https://backendtesting-5.onrender.com/

