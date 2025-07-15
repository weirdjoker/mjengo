const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, project } = req.body;
    const task = new Task({
      title,
      project,
      userId: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    throw error;
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    throw error;
  }
};