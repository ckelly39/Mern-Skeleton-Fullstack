# MERN Portfolio Application

A full-stack portfolio application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a complete RESTful API backend with secure authentication, CRUD operations for managing contacts, projects, qualifications, and user accounts.

## 🚀 Features

### Backend Features
- **RESTful API** with 30+ endpoints
- **JWT Authentication** for secure user sessions
- **Password Hashing** using bcrypt for security
- **Protected Routes** with authorization middleware
- **CRUD Operations** for multiple resources
- **MongoDB Integration** with Mongoose ODM
- **Error Handling** with proper HTTP status codes
- **MVC Architecture** for organized code structure

### Collections/Resources
- **Contacts** - Manage contact information
- **Projects** - Portfolio project listings
- **Qualifications** - Educational background and certifications
- **Users** - User account management with authentication

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **nodemon** - Development auto-restart
- **concurrently** - Run multiple commands

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)
- Postman (for API testing - optional)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-mern.git
cd portfolio-mern
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd client
npm install
cd ..
```

### 4. Configure environment variables

Create/update `config/config.js` with your MongoDB connection string:
```javascript
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: 'your_mongodb_connection_string_here'
}

export default config
```

**Important:** Replace `your_mongodb_connection_string_here` with your actual MongoDB Atlas connection string.

### 5. MongoDB Setup

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster
3. Create a database named `Portfolio`
4. Create collections: `contacts`, `projects`, `qualifications`, `users`
5. Add your IP address to Network Access whitelist
6. Create a database user with read/write permissions
7. Get your connection string and add it to `config/config.js`

## 🚀 Running the Application

### Development Mode (Frontend + Backend)
```bash
cd client
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Backend Only
```bash
node server.js
```

### Frontend Only
```bash
cd client
npm run dev
```

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/signin` | Login user | No |
| GET | `/api/auth/signout` | Logout user | No |

### Contacts Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/contacts` | Get all contacts | No |
| POST | `/api/contacts` | Create new contact | No |
| GET | `/api/contacts/:id` | Get contact by ID | No |
| PUT | `/api/contacts/:id` | Update contact | No |
| DELETE | `/api/contacts/:id` | Delete contact | No |
| DELETE | `/api/contacts` | Delete all contacts | No |

### Projects Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all projects | No |
| POST | `/api/projects` | Create new project | No |
| GET | `/api/projects/:id` | Get project by ID | No |
| PUT | `/api/projects/:id` | Update project | No |
| DELETE | `/api/projects/:id` | Delete project | No |
| DELETE | `/api/projects` | Delete all projects | No |

### Qualifications Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/qualifications` | Get all qualifications | No |
| POST | `/api/qualifications` | Create new qualification | No |
| GET | `/api/qualifications/:id` | Get qualification by ID | No |
| PUT | `/api/qualifications/:id` | Update qualification | No |
| DELETE | `/api/qualifications/:id` | Delete qualification | No |
| DELETE | `/api/qualifications` | Delete all qualifications | No |

### Users Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | No |
| GET | `/api/users/:id` | Get user by ID | Yes |
| PUT | `/api/users/:id` | Update user | Yes (Own profile) |
| DELETE | `/api/users/:id` | Delete user | Yes (Own profile) |
| DELETE | `/api/users` | Delete all users | No |

## 🔐 Authentication

This application uses JWT (JSON Web Tokens) for authentication.

### How to use protected endpoints:

1. **Sign up** or **Sign in** to get a JWT token
2. Include the token in the Authorization header:
```
   Authorization: Bearer YOUR_JWT_TOKEN_HERE
```
3. The token expires after 24 hours

### Example using Postman:

1. POST to `/api/auth/signin` with credentials
2. Copy the `token` from the response
3. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer {your_token}`

## 📊 Project Structure
```
MyPortfolio/
├── client/                      # Frontend React application
│   ├── src/
│   └── package.json
├── server/                      # Backend code
│   ├── models/                  # Mongoose schemas
│   │   ├── contact.model.js
│   │   ├── project.model.js
│   │   ├── qualification.model.js
│   │   └── user.model.js
│   ├── controllers/             # Business logic
│   │   ├── contact.controller.js
│   │   ├── project.controller.js
│   │   ├── qualification.controller.js
│   │   ├── user.controller.js
│   │   └── auth.controller.js
│   ├── routes/                  # API routes
│   │   ├── contact.routes.js
│   │   ├── project.routes.js
│   │   ├── qualification.routes.js
│   │   ├── user.routes.js
│   │   └── auth.routes.js
│   └── auth.middleware.js       # Authentication middleware
├── config/
│   └── config.js                # Configuration (DB connection)
├── server.js                    # Entry point
├── package.json                 # Backend dependencies
└── README.md
```

## 🧪 Testing with Postman

### Example Requests:

**1. Create a Contact**
```json
POST http://localhost:3000/api/contacts
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@email.com"
}
```

**2. Sign Up**
```json
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@email.com",
  "password": "password123"
}
```

**3. Sign In**
```json
POST http://localhost:3000/api/auth/signin
Content-Type: application/json

{
  "email": "john@email.com",
  "password": "password123"
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Middleware ensures only authenticated users can access certain endpoints
- **Authorization**: Users can only modify their own resources
- **Input Validation**: Mongoose schema validation for all data

## 🐛 Troubleshooting

### Server won't start
- Check if MongoDB connection string is correct
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify all dependencies are installed (`npm install`)

### Cannot connect to database
- Check MongoDB Atlas network access settings
- Verify database user credentials
- Ensure database name is `Portfolio`

### Authentication not working
- Check if JWT secret is set in config
- Verify token is being sent in Authorization header
- Ensure token format is: `Bearer {token}`

### Port already in use
- Change port in `config/config.js`
- Or kill the process using the port

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "nodemon": "^3.0.1",
  "concurrently": "^8.2.1"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "vite": "^4.4.9"
}
```

## 🚧 Future Enhancements

- [ ] Add email verification for user registration
- [ ] Implement password reset functionality
- [ ] Add file upload for project images
- [ ] Implement pagination for large datasets
- [ ] Add search and filter functionality
- [ ] Create admin dashboard
- [ ] Add rate limiting for API requests
- [ ] Implement refresh tokens
- [ ] Add API documentation with Swagger

## 👨‍💻 Author

Your Name
- GitHub: [@ckelly39](https://github.com/ckelly39)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Express.js documentation
- Mongoose documentation
- JWT.io for token information
- COMP229 - Web Application Development course



---

**⭐ If you found this project helpful, please give it a star!**
