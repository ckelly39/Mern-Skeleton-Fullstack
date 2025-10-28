import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';

const router = express.Router();

// GET all contacts
router.route('/api/contacts')
  .get(contactCtrl.list)
  .post(contactCtrl.create)
  .delete(contactCtrl.removeAll);

// GET/PUT/DELETE single contact by ID
router.route('/api/contacts/:contactId')
  .get(contactCtrl.read)
  .put(contactCtrl.update)
  .delete(contactCtrl.remove);

// Param middleware to load contact by ID
router.param('contactId', contactCtrl.contactByID);

export default router;