const express = require("express")
const cors = require("cors")
const errorHandler=require("../src/middlewares/errorHandler.middleware")
require("dotenv").config()

const authRoutes = require("./routes/auth.routes")
const taskRoutes = require("./routes/task.routes")

const app = express()

// Allow the frontend's origin to call this API from the browser.
// Postman never enforces CORS, which is why testing there always worked
// even before this was added.
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173"
    })
)

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Task Manager API is running" })
})
app.use(errorHandler)


module.exports = app
