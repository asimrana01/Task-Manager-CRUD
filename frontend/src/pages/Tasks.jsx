import { useEffect, useState } from "react"
import { api } from "../api"
import { useAuth } from "../context/AuthContext"
import TaskForm from "../components/TaskForm"
import TaskRow from "../components/TaskRow"

export default function Tasks() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadTasks() {
    setLoading(true)
    setError("")
    try {
      const data = await api.getTasks(token)
      setTasks(data.task || data.tasks || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(taskData) {
    setCreating(true)
    setError("")
    try {
      const data = await api.createTask(taskData, token)
      const newTask = data.task
      if (newTask) setTasks((prev) => [newTask, ...prev])
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  async function handleToggle(task) {
    try {
      const data = await api.updateTask(task._id, { status: !task.status }, token)
      const updated = data.task
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdate(id, updates) {
    try {
      const data = await api.updateTask(id, updates, token)
      const updated = data.task
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteTask(id, token)
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="page">
      <div className="ledger-head">
        <div>
          <h1 className="page-title">Your tasks</h1>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <TaskForm onCreate={handleCreate} submitting={creating} />

      <div className="ledger">
        {loading ? (
          <p className="loading-state">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <strong>Nothing logged yet.</strong>
            Add your first task above to get started.
          </div>
        ) : (
          tasks.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </main>
  )
}
