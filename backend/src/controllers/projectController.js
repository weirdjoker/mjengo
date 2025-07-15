
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, budget, timeline, builder } = req.body;
    const project = new Project({
      title,
      description,
      budget,
      timeline,
      builder,
      userId: req.user.userId,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    throw error;
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.userId });
    res.json(projects);
  } catch (error) {
    throw error;
  }
};