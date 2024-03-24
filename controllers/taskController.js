
const Task = require('../models/task');


const taskController = {
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


  getAllTasks: async (req, res) => {
    try {
        
        const { uid } = req.params; 
        let tasks;
        if (uid) {
          tasks = await Task.find({ uid });
        } else {
          tasks = await Task.find();
        }
      res.json(tasks);
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      res.status(500).json({ error: 'Error retrieving tasks' });
    }
  },


  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(id, {status }, { new: true });
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Error updating task' });
    }
  },


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
