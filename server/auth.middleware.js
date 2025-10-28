import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// Middleware to check if user is authenticated
const requireSignin = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized! No token provided."
      });
    }
    
    // Remove "Bearer " prefix if present
    const actualToken = token.startsWith('Bearer ') 
      ? token.slice(7) 
      : token;
    
    // Verify token
    const decoded = jwt.verify(actualToken, config.jwtSecret);
    
    // Add user ID to request
    req.auth = decoded;
    next();
    
  } catch (err) {
    return res.status(401).json({
      error: "Unauthorized! Invalid token."
    });
  }
};

// Middleware to check if user is accessing their own resource
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && 
    req.profile._id.toString() === req.auth._id;
  
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action"
    });
  }
  
  next();
};

export default {
  requireSignin,
  hasAuthorization
};