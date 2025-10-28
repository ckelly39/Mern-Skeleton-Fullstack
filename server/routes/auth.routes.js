import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/auth/signup
router.route('/api/auth/signup')
  .post(authCtrl.signup);

// POST /api/auth/signin
router.route('/api/auth/signin')
  .post(authCtrl.signin);

// GET /api/auth/signout
router.route('/api/auth/signout')
  .get(authCtrl.signout);

export default router;