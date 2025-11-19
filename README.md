# Full Stack Portfolio Application

## Student Information
- Name: Kelly Cyusa
- Course: Web Application Development

## Application Overview
A full-stack MERN (MongoDB, Express, React, Node.js) portfolio application with complete authentication and CRUD operations.

## Features Implemented

### Authentication
- User signup with password hashing (bcrypt)
- User signin with JWT tokens
- Logout functionality
- Protected routes (frontend & backend)

### CRUD Operations
- **Contacts**: Create and view contact submissions
- **Projects**: Create, view, and delete projects
- **Qualifications**: Create, view, and delete education/qualifications
- **Users**: User management with authentication

### Technologies Used
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcrypt
- **State Management**: React Context API

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account

### Backend Setup
```bash
cd MyPortfolio
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

### Environment Configuration
Update `config/config.js` with your MongoDB connection string:
```javascript
mongoUri: 'your-mongodb-connection-string'
jwtSecret: 'your-secret-key'
```

### Running the Application
```bash
# From client directory
cd client
npm run dev
```

This will start both frontend (port 5173) and backend (port 3000) concurrently.

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Create new user
- POST `/api/auth/signin` - Login user
- GET `/api/auth/signout` - Logout user

### Contacts (Protected)
- GET `/api/contacts` - Get all contacts
- POST `/api/contacts` - Create contact

### Projects (Protected)
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create project
- DELETE `/api/projects/:id` - Delete project

### Qualifications (Protected)
- GET `/api/qualifications` - Get all qualifications
- POST `/api/qualifications` - Create qualification
- DELETE `/api/qualifications/:id` - Delete qualification

## Testing
All endpoints tested with Postman. Screenshots included in submission.

## Database Structure
MongoDB database: **Portfolio**
Collections:
- users (authentication)
- contacts (contact submissions)
- projects (portfolio projects)
- qualifications (education/certifications)

## Screenshots
See submission folder for all screenshots demonstrating:
- Backend API testing (Postman)
- Frontend functionality
- Database persistence (MongoDB Atlas)
