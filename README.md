# Task Manager

A full-stack task manager: JWT-authenticated Node/Express/MongoDB API, with a React frontend.

```
task-manager/
├── backend/    Node/Express/MongoDB API — see backend/README.md
└── frontend/   React (Vite) client — see frontend/README.md
```

## Running both together

You need **two terminals** — the backend and frontend run as separate processes.

**Terminal 1 — backend**
```bash
cd backend
npm install
cp .env.example .env
# fill in MONGO_URI and JWT_SECRET in .env
npm run dev
```
Runs on `http://localhost:3000`.

**Terminal 2 — frontend**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs on `http://localhost:5173`.

Open `http://localhost:5173` in your browser, sign up, and start creating tasks.

## Why two `package.json` files?

The backend and frontend are independently deployable projects with different dependencies (Express/Mongoose vs. React/Vite) and different environment variables. Keeping them in separate folders — a "monorepo" — is standard practice even when they live in the same GitHub repo; each can be installed, run, and eventually deployed on its own.

See `backend/README.md` and `frontend/README.md` for API reference, architecture notes, and project structure specific to each.
