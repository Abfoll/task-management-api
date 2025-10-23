const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All task routes are protected

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;