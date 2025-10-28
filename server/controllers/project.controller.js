import Project from '../models/project.model.js';

// Get all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(400).json({
      error: "Could not retrieve projects"
    });
  }
};

// Get project by ID
const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        error: "Project not found"
      });
    }
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve project"
    });
  }
};

// Read single project
const read = (req, res) => {
  return res.json(req.project);
};

// Create new project
const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(201).json({
      message: "Project created successfully!",
      project: project
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not create project"
    });
  }
};

// Update project
const update = async (req, res) => {
  try {
    let project = req.project;
    project.title = req.body.title || project.title;
    project.firstname = req.body.firstname || project.firstname;
    project.lastname = req.body.lastname || project.lastname;
    project.email = req.body.email || project.email;
    project.completion = req.body.completion || project.completion;
    project.description = req.body.description || project.description;
    
    await project.save();
    res.json({
      message: "Project updated successfully!",
      project: project
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not update project"
    });
  }
};

// Delete project
const remove = async (req, res) => {
  try {
    let project = req.project;
    await project.deleteOne();
    res.json({
      message: "Project deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete project"
    });
  }
};

// Delete all projects
const removeAll = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({
      message: "All projects deleted successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete projects"
    });
  }
};

export default {
  list,
  projectByID,
  read,
  create,
  update,
  remove,
  removeAll
};