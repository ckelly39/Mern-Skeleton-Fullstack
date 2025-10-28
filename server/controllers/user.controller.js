import User from '../models/user.model.js';

// Get all users
const list = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(400).json({
      error: "Could not retrieve users"
    });
  }
};

// Get user by ID
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
};

// Read single user
const read = (req, res) => {
  return res.json(req.profile);
};

// Create new user
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json({
      message: "User created successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not create user"
    });
  }
};

// Update user
const update = async (req, res) => {
  try {
    let user = req.profile;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.updated = Date.now();
    
    await user.save();
    user.password = undefined;
    res.json({
      message: "User updated successfully!",
      user: user
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not update user"
    });
  }
};

// Delete user
const remove = async (req, res) => {
  try {
    let user = req.profile;
    await user.deleteOne();
    res.json({
      message: "User deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete user"
    });
  }
};

// Delete all users
const removeAll = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({
      message: "All users deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete users"
    });
  }
};

export default {
  list,
  userByID,
  read,
  create,
  update,
  remove,
  removeAll
};