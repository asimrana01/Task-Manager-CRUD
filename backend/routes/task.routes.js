const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/", authMiddleware, taskController.createTask)
router.get("/", authMiddleware, taskController.getAllTasks)
router.get("/:id", authMiddleware, taskController.getSingleTask)
router.patch("/:id", authMiddleware, taskController.updateTask)
router.delete("/:id", authMiddleware, taskController.deleteTask)

module.exports = router
