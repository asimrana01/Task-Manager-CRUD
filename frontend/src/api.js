const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.errors?.[0]?.message || data.message || `Request failed with status ${res.status}`)
  }

  return data
}

export const api = {
  signup: (email, password) =>
    request("/api/auth/signup", { method: "POST", body: { email, password } }),

  login: (email, password) =>
    request("/api/auth/login", { method: "POST", body: { email, password } }),

  getTasks: (token) => request("/tasks", { token }),

  getTask: (id, token) => request(`/tasks/${id}`, { token }),

  createTask: (taskData, token) =>
    request("/tasks", { method: "POST", body: taskData, token }),

  updateTask: (id, updates, token) =>
    request(`/tasks/${id}`, { method: "PATCH", body: updates, token }),

  deleteTask: (id, token) =>
    request(`/tasks/${id}`, { method: "DELETE", token })
}