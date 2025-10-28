import express from 'express';
import projectCtrl from '../controllers/project.controller.js';

const router = express.Router();

// GET all projects, CREATE new project, DELETE all projects
router.route('/api/projects')
  .get(projectCtrl.list)
  .post(projectCtrl.create)
  .delete(projectCtrl.removeAll);

// GET/PUT/DELETE single project by ID
router.route('/api/projects/:projectId')
  .get(projectCtrl.read)
  .put(projectCtrl.update)
  .delete(projectCtrl.remove);

// Param middleware to load project by ID
router.param('projectId', projectCtrl.projectByID);

export default router;