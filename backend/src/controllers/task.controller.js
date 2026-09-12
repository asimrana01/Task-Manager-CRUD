const taskService = require("../services/task.service")

async function createTask(req, res) {
    try {
        const owner = req.user.id
        const taskData = req.body
        const task = await taskService.createTask(owner, taskData)
        res.status(201).json({ message: "Task Created Successfully", task })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

async function getAllTasks(req, res) {
    try {
        const ownerId = req.user.id
        const task = await taskService.findTaskByOwner(ownerId)
        res.status(200).json({ message: "All tasks are", task })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

async function getSingleTask(req, res) {
    try {
        const ownerId = req.user.id
        const taskId = req.params.id
        const task = await taskService.findByIdAndOwner(taskId, ownerId)
        res.status(200).json({ message: "Task found", task })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

async function updateTask(req, res) {
    try {
        const ownerId = req.user.id
        const taskId = req.params.id
        const updates = req.body
        const task = await taskService.updateTaskByIdAndOwner(taskId, ownerId, updates)
        res.status(200).json({ message: "Task updated Successfully", task })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

async function deleteTask(req, res) {
    try {
        const taskId = req.params.id
        const ownerId = req.user.id
        const task = await taskService.deleteTaskByIdAndOwner(taskId, ownerId)
        res.status(200).json({ message: "Task Deleted", task })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

module.exports = { createTask, getAllTasks, getSingleTask, updateTask, deleteTask }
