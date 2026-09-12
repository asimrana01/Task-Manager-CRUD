const taskModel = require("../models/task.model")

async function createTask(taskObj) {
    return await taskModel.create(taskObj)
}

async function findTaskByOwner(ownerId) {
    return await taskModel.find({ owner: ownerId })
}

async function findByIdAndOwner(taskId, ownerId) {
    return await taskModel.findOne({ _id: taskId, owner: ownerId })
}

async function updateTaskByIdAndOwner(taskId, ownerId, updates) {
    return await taskModel.findOneAndUpdate(
        { _id: taskId, owner: ownerId },
        { $set: updates },
        { new: true }
    )
}

async function deleteTaskByIdAndOwner(taskId, ownerId) {
    return await taskModel.findOneAndDelete({ _id: taskId, owner: ownerId })
}

module.exports = {
    createTask,
    findTaskByOwner,
    findByIdAndOwner,
    updateTaskByIdAndOwner,
    deleteTaskByIdAndOwner
}
