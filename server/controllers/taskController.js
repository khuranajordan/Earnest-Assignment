const Task = require("../models/Task");

exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(tasks);
  });
};

exports.createTask = (req, res) => {
  const { title, description, completed } = req.body;
  Task.create(title, description, completed, (err, taskId) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: taskId });
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  Task.update(id, title, description, completed, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Task ${id} updated successfully` });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  Task.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Task ${id} deleted successfully` });
  });
};
