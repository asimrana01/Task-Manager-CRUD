# Task Manager CRUD

A full-stack task manager built to practice backend architecture and secure API design: a layered Node/Express/MongoDB REST API with JWT authentication, paired with a React frontend.

Every task is scoped to the logged-in user — one account can never read, edit, or delete another account's tasks, enforced at the database query level.

```
task-manager/
├── backend/    Node/Express/MongoDB API — see backend/README.md
└── frontend/   React (Vite) client — see frontend/README.md
```

## Tech stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcryptjs for password hashing
**Frontend:** React 18, Vite, React Router

## Architecture

```
routes → middleware (auth) → controller → service → repository → model
```

Each layer has one job — routes map HTTP verbs to controllers, middleware verifies the JWT, controllers shape the HTTP response, services hold business rules (duplicate checks, 404s, hashing), repositories are the only layer that touches MongoDB directly, and models define the schema.

## Running it locally

You need two terminals — backend and frontend run as separate processes.

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

Open `http://localhost:5173`, sign up, log in, and start managing tasks.

## API overview

| Method | Endpoint            | Auth | Purpose                        |
|--------|----------------------|:--:|----------------------------------|
| POST   | `/api/auth/signup`   | No | Create an account               |
| POST   | `/api/auth/login`    | No | Log in, receive a JWT           |
| GET    | `/tasks`              | Yes | List the logged-in user's tasks |
| GET    | `/tasks/:id`          | Yes | Get a single task               |
| POST   | `/tasks`              | Yes | Create a task                   |
| PATCH  | `/tasks/:id`          | Yes | Update a task                   |
| DELETE | `/tasks/:id`          | Yes | Delete a task                   |

Full request/response details are in `backend/README.md`.

## Security notes

- Passwords are hashed with bcryptjs before storage — never stored in plaintext.
- JWTs are signed with the user's MongoDB `_id` and expire after 1 hour.
- Every task query filters by `{ _id, owner }` together, so a request can never touch another user's task — verified with `404`, not `403`, so a client can't distinguish "not yours" from "doesn't exist."
- `owner` on task creation always comes from the verified JWT, never from the request body.

## Why two `package.json` files?

The backend and frontend are independently deployable — different dependencies, different environment variables. Keeping them as separate folders in one repo (a monorepo) is standard practice; each can be installed, run, and deployed on its own.