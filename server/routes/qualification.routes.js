import express from 'express';
import qualificationCtrl from '../controllers/qualification.controller.js';

const router = express.Router();

// GET all qualifications, CREATE new qualification, DELETE all qualifications
router.route('/api/qualifications')
  .get(qualificationCtrl.list)
  .post(qualificationCtrl.create)
  .delete(qualificationCtrl.removeAll);

// GET/PUT/DELETE single qualification by ID
router.route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read)
  .put(qualificationCtrl.update)
  .delete(qualificationCtrl.remove);

// Param middleware to load qualification by ID
router.param('qualificationId', qualificationCtrl.qualificationByID);

export default router;