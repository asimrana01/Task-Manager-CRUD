const taskService = require("../services/task.service")
const AppError=require("../utils/AppError")
async function createTask(req, res) {

        const owner = req.user.id
        const taskData = req.body
        const task = await taskService.createTask(owner, taskData)
       return  res.status(201).json({ message: "Task Created Successfully", task })
   
}

async function getAllTasks(req, res) {
    
        const ownerId = req.user.id
        const task = await taskService.findTaskByOwner(ownerId)
        return res.status(200).json({ message: "All tasks are", task })
}

async function getSingleTask(req, res) {
    
        const ownerId = req.user.id
        const taskId = req.params.id
        const task = await taskService.findByIdAndOwner(taskId, ownerId)
        if(!task)
            throw new AppError("Task Not Found",404)
    return res.status(200).json({message:"Task is As",task:task})
    }


async function updateTask(req, res) {
        const ownerId = req.user.id
        const taskId = req.params.id
        const updates = req.body
        const task = await taskService.updateTaskByIdAndOwner(taskId, ownerId, updates)
        if(!task)
            throw new AppError("Task not Found",404)
        return res.status(200).json({ message: "Task updated Successfully", task })
   
}

async function deleteTask(req, res) {
        const taskId = req.params.id
        const ownerId = req.user.id
        const task = await taskService.deleteTaskByIdAndOwner(taskId, ownerId)
        if(!task)
            throw new AppError("Task not Found",404)
        return res.status(200).json({ message: "Task Deleted", task })
   
}

module.exports = { createTask, getAllTasks, getSingleTask, updateTask, deleteTask }
