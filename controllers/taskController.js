// controllers/taskController.js
const Task = require('../models/task');

// Controller methods for CRUD operations
const taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
        console.log("Reached")
      const { title, description, status, uid} = req.body;
      const newTask = new Task({ title, description, status, uid });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Error creating task' });
    }
  },

  // Retrieve all tasks
  getAllTasks: async (req, res) => {
    try {
        
        const { uid } = req.params; // Assuming UID is passed as a query parameter
        let tasks;
        if (uid) {
          // If UID is provided, filter tasks by UID
          tasks = await Task.find({ uid });
        } else {
          // If UID is not provided, retrieve all tasks
          tasks = await Task.find();
        }
      res.json(tasks);
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      res.status(500).json({ error: 'Error retrieving tasks' });
    }
  },

  // Update a task by ID
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Error updating task' });
    }
  },

  // Delete a task by ID
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Error deleting task' });
    }
  }
};

module.exports = taskController;
