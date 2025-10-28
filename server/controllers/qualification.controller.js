import Qualification from '../models/qualification.model.js';

// Get all qualifications
const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(400).json({
      error: "Could not retrieve qualifications"
    });
  }
};

// Get qualification by ID
const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id);
    if (!qualification) {
      return res.status(404).json({
        error: "Qualification not found"
      });
    }
    req.qualification = qualification;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve qualification"
    });
  }
};

// Read single qualification
const read = (req, res) => {
  return res.json(req.qualification);
};

// Create new qualification
const create = async (req, res) => {
  const qualification = new Qualification(req.body);
  try {
    await qualification.save();
    return res.status(201).json({
      message: "Qualification created successfully!",
      qualification: qualification
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not create qualification"
    });
  }
};

// Update qualification
const update = async (req, res) => {
  try {
    let qualification = req.qualification;
    qualification.title = req.body.title || qualification.title;
    qualification.firstname = req.body.firstname || qualification.firstname;
    qualification.lastname = req.body.lastname || qualification.lastname;
    qualification.email = req.body.email || qualification.email;
    qualification.completion = req.body.completion || qualification.completion;
    qualification.description = req.body.description || qualification.description;
    
    await qualification.save();
    res.json({
      message: "Qualification updated successfully!",
      qualification: qualification
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not update qualification"
    });
  }
};

// Delete qualification
const remove = async (req, res) => {
  try {
    let qualification = req.qualification;
    await qualification.deleteOne();
    res.json({
      message: "Qualification deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete qualification"
    });
  }
};

// Delete all qualifications
const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({
      message: "All qualifications deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete qualifications"
    });
  }
};

export default {
  list,
  qualificationByID,
  read,
  create,
  update,
  remove,
  removeAll
};