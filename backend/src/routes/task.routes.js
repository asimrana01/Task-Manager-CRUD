const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const AsyncCatch=require("../utils/AsyncCatch")
const taskSchema=require("../validation/task.Schema")
const validation=require("../middlewares/validate.middleware")

router.post("/", authMiddleware,validation(taskSchema.postTaskSchema), AsyncCatch(taskController.createTask))
router.get("/", authMiddleware, AsyncCatch(taskController.getAllTasks))
router.get("/:id", authMiddleware, AsyncCatch(taskController.getSingleTask))
router.patch("/:id", authMiddleware,validation(taskSchema.updateTaskSchema), AsyncCatch(taskController.updateTask))
router.delete("/:id", authMiddleware, AsyncCatch(taskController.deleteTask))

module.exports = router
