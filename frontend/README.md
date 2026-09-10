# Tasklog — Task Manager Frontend

A React frontend for a Node/Express/MongoDB Task Manager API with JWT authentication. Sign up, log in, and manage tasks scoped to your own account.

Built as the client for a backend project that implements a layered architecture (routes → controller → service → repository → model) with bcrypt password hashing and JWT-based auth middleware.

## Features

- Sign up and log in against a JWT-authenticated API
- Create, read, update, and delete tasks
- Toggle a task's completed status
- Inline editing of a task's title and description
- Tasks are scoped per-user — the UI never sees another user's data, enforced by the backend

## Tech stack

- React 18 + Vite
- React Router for client-side routing
- Plain CSS with design tokens (no UI framework)
- Auth token stored in `localStorage`, sent as a `Bearer` header on every request

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API URL

Copy the example env file and point it at your running backend:

```bash
cp .env.example .env
```

```
VITE_API_URL=http://localhost:3000
```

### 3. Run the dev server

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

### 4. Build for production

```bash
npm run build
npm run preview
```

## API endpoints expected

This frontend expects the backend to expose:

| Method | Endpoint            | Auth required | Purpose            |
|--------|----------------------|:--:|---------------------|
| POST   | `/api/auth/signup`   | No | Create an account   |
| POST   | `/api/auth/login`    | No | Log in, get a JWT   |
| GET    | `/tasks`              | Yes | List your tasks     |
| GET    | `/tasks/:id`          | Yes | Get a single task   |
| POST   | `/tasks`              | Yes | Create a task       |
| PATCH  | `/tasks/:id`          | Yes | Update a task       |
| DELETE | `/tasks/:id`          | Yes | Delete a task       |

> **Note:** the auth and task routes were mounted under different prefixes on the backend (`/api/auth/...` for auth, `/tasks` directly for tasks). If your backend mounts these differently, update the paths in `src/api.js` — it's the only file that talks to the network, so everything else stays untouched.

All authenticated requests send the JWT as:

```
Authorization: Bearer <token>
```

## Project structure

```
src/
├── api.js                 # All network calls to the backend, in one place
├── App.jsx                # Route definitions
├── main.jsx                # React entry point
├── context/
│   └── AuthContext.jsx     # Holds the JWT + exposes login()/logout()
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx  # Redirects to /login if not authenticated
│   ├── TaskForm.jsx        # New task creation form
│   └── TaskRow.jsx         # Single task row: toggle, inline edit, delete
└── pages/
    ├── Login.jsx
    ├── Signup.jsx
    └── Tasks.jsx           # Main task list view
```

## Notes on the auth model

The backend signs JWTs with only `{ id: user._id }` in the payload — no email. Because of that, this frontend keeps the logged-in user's email in `localStorage` purely for display in the navbar; the actual authorization on every request relies solely on the token itself, verified server-side.
