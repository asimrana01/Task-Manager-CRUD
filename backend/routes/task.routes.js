const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const taskSchema=require("../validation/task.Schema")
const validation=require("../middlewares/validate.middleware")

router.post("/", authMiddleware,validation(taskSchema.postTaskSchema), taskController.createTask)
router.get("/", authMiddleware, taskController.getAllTasks)
router.get("/:id", authMiddleware, taskController.getSingleTask)
router.patch("/:id", authMiddleware,validation(taskSchema.updateTaskSchema), taskController.updateTask)
router.delete("/:id", authMiddleware, taskController.deleteTask)

module.exports = router
