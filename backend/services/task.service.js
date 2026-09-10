const taskRepo = require("../repositories/task.repo")

async function createTask(owner, taskData) {
    const taskObj = { ...taskData, owner: owner }
    return await taskRepo.createTask(taskObj)
}

async function findTaskByOwner(ownerId) {
    return await taskRepo.findTaskByOwner(ownerId)
}

async function findByIdAndOwner(taskId, ownerId) {
    const result = await taskRepo.findByIdAndOwner(taskId, ownerId)
    if (!result) throw { status: 404, message: "Task not found" }
    return result
}

async function updateTaskByIdAndOwner(taskId, ownerId, updates) {
    const result = await taskRepo.updateTaskByIdAndOwner(taskId, ownerId, updates)
    if (!result) throw { status: 404, message: "Task not found" }
    return result
}

async function deleteTaskByIdAndOwner(taskId, ownerId) {
    const result = await taskRepo.deleteTaskByIdAndOwner(taskId, ownerId)
    if (!result) throw { status: 404, message: "Task not found" }
    return result
}

module.exports = {
    createTask,
    findTaskByOwner,
    findByIdAndOwner,
    updateTaskByIdAndOwner,
    deleteTaskByIdAndOwner
}
