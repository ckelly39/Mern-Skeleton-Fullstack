import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// Public route - anyone can list users
router.route('/api/users')
  .get(userCtrl.list);

// Protected routes - require authentication
router.route('/api/users/:userId')
  .get(authMiddleware.requireSignin, userCtrl.read)
  .put(authMiddleware.requireSignin, authMiddleware.hasAuthorization, userCtrl.update)
  .delete(authMiddleware.requireSignin, authMiddleware.hasAuthorization, userCtrl.remove);

// Param middleware to load user by ID
router.param('userId', userCtrl.userByID);

export default router;