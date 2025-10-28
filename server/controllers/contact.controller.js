import Contact from '../models/contact.model.js';

// Get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(400).json({
      error: "Could not retrieve contacts"
    });
  }
};

// Get contact by ID
const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve contact"
    });
  }
};

// Read single contact
const read = (req, res) => {
  return res.json(req.contact);
};

// Create new contact
const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(201).json({
      message: "Contact created successfully!",
      contact: contact
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not create contact"
    });
  }
};

// Update contact
const update = async (req, res) => {
  try {
    let contact = req.contact;
    contact.firstname = req.body.firstname || contact.firstname;
    contact.lastname = req.body.lastname || contact.lastname;
    contact.email = req.body.email || contact.email;
    
    await contact.save();
    res.json({
      message: "Contact updated successfully!",
      contact: contact
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not update contact"
    });
  }
};

// Delete contact
const remove = async (req, res) => {
  try {
    let contact = req.contact;
    await contact.deleteOne();
    res.json({
      message: "Contact deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete contact"
    });
  }
};

// Delete all contacts
const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({
      message: "All contacts deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete contacts"
    });
  }
};

export default {
  list,
  contactByID,
  read,
  create,
  update,
  remove,
  removeAll
};