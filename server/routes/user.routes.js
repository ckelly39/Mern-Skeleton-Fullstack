import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// GET all users - PROTECTED
router.route('/api/users')
  .get(authMiddleware.requireSignin, userCtrl.list)
  .delete(authMiddleware.requireSignin, userCtrl.removeAll);

// GET/PUT/DELETE single user by ID - PROTECTED
router.route('/api/users/:userId')
  .get(authMiddleware.requireSignin, userCtrl.read)
  .put(authMiddleware.requireSignin, userCtrl.update)
  .delete(authMiddleware.requireSignin, userCtrl.remove);

// Param middleware to load user by ID
router.param('userId', userCtrl.userByID);

export default router;