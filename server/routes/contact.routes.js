import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// GET all contacts - PROTECTED
router.route('/api/contacts')
  .get(authMiddleware.requireSignin, contactCtrl.list)
  .post(authMiddleware.requireSignin, contactCtrl.create)
  .delete(authMiddleware.requireSignin, contactCtrl.removeAll);

// GET/PUT/DELETE single contact by ID - PROTECTED
router.route('/api/contacts/:contactId')
  .get(authMiddleware.requireSignin, contactCtrl.read)
  .put(authMiddleware.requireSignin, contactCtrl.update)
  .delete(authMiddleware.requireSignin, contactCtrl.remove);

// Param middleware to load contact by ID
router.param('contactId', contactCtrl.contactByID);

export default router;