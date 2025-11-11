import express from 'express';
import qualificationCtrl from '../controllers/qualification.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// GET all qualifications - PROTECTED
router.route('/api/qualifications')
  .get(authMiddleware.requireSignin, qualificationCtrl.list)
  .post(authMiddleware.requireSignin, qualificationCtrl.create)
  .delete(authMiddleware.requireSignin, qualificationCtrl.removeAll);

// GET/PUT/DELETE single qualification by ID - PROTECTED
router.route('/api/qualifications/:qualificationId')
  .get(authMiddleware.requireSignin, qualificationCtrl.read)
  .put(authMiddleware.requireSignin, qualificationCtrl.update)
  .delete(authMiddleware.requireSignin, qualificationCtrl.remove);

// Param middleware to load qualification by ID
router.param('qualificationId', qualificationCtrl.qualificationByID);

export default router;