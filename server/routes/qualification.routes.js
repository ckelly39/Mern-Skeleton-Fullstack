import express from 'express';
import qualificationCtrl from '../controllers/qualification.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// Qualifications routes - Admin only for create/update/delete
router.route('/api/qualifications')
  .get(authMiddleware.requireSignin, qualificationCtrl.list)  // Anyone logged in
  .post(authMiddleware.requireSignin, authMiddleware.isAdmin, qualificationCtrl.create)  // Admin only!
  .delete(authMiddleware.requireSignin, authMiddleware.isAdmin, qualificationCtrl.removeAll);  // Admin only!

router.route('/api/qualifications/:qualificationId')
  .get(authMiddleware.requireSignin, qualificationCtrl.read)  // Anyone logged in
  .put(authMiddleware.requireSignin, authMiddleware.isAdmin, qualificationCtrl.update)  // Admin only!
  .delete(authMiddleware.requireSignin, authMiddleware.isAdmin, qualificationCtrl.remove);  // Admin only!

router.param('qualificationId', qualificationCtrl.qualificationByID);

export default router;