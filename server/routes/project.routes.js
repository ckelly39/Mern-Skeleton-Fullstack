import express from 'express';
import projectCtrl from '../controllers/project.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// GET all projects - PROTECTED
router.route('/api/projects')
  .get(authMiddleware.requireSignin, projectCtrl.list)
  .post(authMiddleware.requireSignin, projectCtrl.create)
  .delete(authMiddleware.requireSignin, projectCtrl.removeAll);

// GET/PUT/DELETE single project by ID - PROTECTED
router.route('/api/projects/:projectId')
  .get(authMiddleware.requireSignin, projectCtrl.read)
  .put(authMiddleware.requireSignin, projectCtrl.update)
  .delete(authMiddleware.requireSignin, projectCtrl.remove);

// Param middleware to load project by ID
router.param('projectId', projectCtrl.projectByID);

export default router;