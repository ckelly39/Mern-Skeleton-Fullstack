import express from 'express';
import projectCtrl from '../controllers/project.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// Projects routes - Admin only for create/update/delete
router.route('/api/projects')
  .get(authMiddleware.requireSignin, projectCtrl.list)  // Anyone logged in
  .post(authMiddleware.requireSignin, authMiddleware.isAdmin, projectCtrl.create)  // Admin only!
  .delete(authMiddleware.requireSignin, authMiddleware.isAdmin, projectCtrl.removeAll);  // Admin only!

router.route('/api/projects/:projectId')
  .get(authMiddleware.requireSignin, projectCtrl.read)  // Anyone logged in
  .put(authMiddleware.requireSignin, authMiddleware.isAdmin, projectCtrl.update)  // Admin only!
  .delete(authMiddleware.requireSignin, authMiddleware.isAdmin, projectCtrl.remove);  // Admin only!

router.param('projectId', projectCtrl.projectByID);

export default router;