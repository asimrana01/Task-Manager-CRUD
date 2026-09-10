import { useState } from "react"

export default function TaskRow({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")

  function saveEdit() {
    if (!title.trim()) return
    onUpdate(task._id, { title: title.trim(), description: description.trim() })
    setEditing(false)
  }

  function cancelEdit() {
    setTitle(task.title)
    setDescription(task.description || "")
    setEditing(false)
  }

  const createdAt = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      })
    : null

  if (editing) {
    return (
      <div className="ledger-row">
        <div className="edit-row">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="row">
            <button className="btn btn-primary" onClick={saveEdit}>
              Save
            </button>
            <button className="btn btn-ghost" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`ledger-row${task.status ? " done" : ""}`}>
      <input
        type="checkbox"
        className="status-toggle"
        checked={!!task.status}
        onChange={() => onToggle(task)}
      />
      <div className="ledger-body">
        <p className="ledger-title">{task.title}</p>
        {task.description && <p className="ledger-desc">{task.description}</p>}
        {createdAt && <p className="ledger-meta">added {createdAt}</p>}
      </div>
      <div className="ledger-actions">
        <button className="btn-danger-text" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button className="btn-danger-text" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  )
}
