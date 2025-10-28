import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

// Sign Up - Create new user
const signup = async (req, res) => {
  try {
    // Create new user from request body
    const user = new User(req.body);
    await user.save();
    
    return res.status(201).json({
      message: "Successfully signed up!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not create user. Email may already exist."
    });
  }
};

// Sign In - Login user
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(401).json({
        error: "User not found"
      });
    }
    
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        error: "Email and password don't match"
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { _id: user._id },
      config.jwtSecret,
      { expiresIn: '24h' }
    );
    
    // Send token in cookie and response
    res.cookie('t', token, { 
      expire: new Date() + 9999 
    });
    
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (err) {
    return res.status(401).json({
      error: "Could not sign in"
    });
  }
};

// Sign Out - Logout user
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out successfully"
  });
};

export default {
  signup,
  signin,
  signout
};