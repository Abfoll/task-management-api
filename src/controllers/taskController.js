const Task = require('../models/Task');

// @desc    Get all tasks for user
// @route   GET /api/tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user._id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};