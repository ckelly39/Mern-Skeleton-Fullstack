import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// GET all contacts - Anyone logged in can view
router.route('/api/contacts')
  .get(authMiddleware.requireSignin, contactCtrl.list)
  .post(authMiddleware.requireSignin, authMiddleware.isAdmin, contactCtrl.create)  // Admin only!
  .delete(authMiddleware.requireSignin, authMiddleware.isAdmin, contactCtrl.removeAll);  // Admin only!

// GET/PUT/DELETE single contact by ID
router.route('/api/contacts/:contactId')
  .get(authMiddleware.requireSignin, contactCtrl.read)
  .put(authMiddleware.requireSignin, authMiddleware.isAdmin, contactCtrl.update)  // Admin only!
  .delete(authMiddleware.requireSignin, authMiddleware.isAdmin, contactCtrl.remove);  // Admin only!

// Param middleware to load contact by ID
router.param('contactId', contactCtrl.contactByID);

export default router;