# Task Manager Backend

A layered Node/Express/MongoDB REST API with JWT authentication and per-user task scoping.

## Architecture

```
routes → middleware (auth) → controller → service → repository → model
```

Each layer has exactly one job:
- **routes** — map HTTP verb + path to a controller function
- **middleware** — verify the JWT and attach the logged-in user to `req.user`
- **controller** — read `req`, call the service, shape the HTTP response
- **service** — business rules (duplicate checks, 404s, password hashing, JWT signing)
- **repository** — the only layer that talks to Mongoose/MongoDB directly
- **model** — the Mongoose schema

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in:
- `MONGO_URI` — your MongoDB Atlas (or local) connection string
- `JWT_SECRET` — any long random string
- `PORT` — defaults to 3000
- `CLIENT_URL` — your frontend's origin, for CORS (defaults to `http://localhost:5173`)

### 3. Run the server

```bash
npm run dev    # with nodemon, auto-restarts on changes
# or
npm start
```



## API Reference

All authenticated routes require:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint           | Body                          | Notes                     |
|--------|--------------------|--------------------------------|----------------------------|
| POST   | `/api/auth/signup` | `{ email, password }`         | Password min 8 chars       |
| POST   | `/api/auth/login`  | `{ email, password }`         | Returns `{ token }`        |

### Tasks (all require auth)

| Method | Endpoint      | Body                                  | Notes                              |
|--------|----------------|-----------------------------------------|--------------------------------------|
| GET    | `/tasks`       | —                                        | Only the logged-in user's tasks     |
| GET    | `/tasks/:id`   | —                                        | 404 if not found or not yours       |
| POST   | `/tasks`       | `{ title, description }`               | `owner` set from the token, not body|
| PATCH  | `/tasks/:id`   | any subset of `{ title, description, status }` | Returns the updated document |
| DELETE | `/tasks/:id`   | —                                        | 404 if not found or not yours       |

## Security notes

- Passwords are hashed with bcrypt (10 salt rounds) before storage — never stored in plaintext.
- JWTs are signed with the user's MongoDB `_id`, expire after 1 hour.
- Every task query filters by `{ _id, owner }` together at the database level — a request can never read, update, or delete another user's task, verified by returning `404` (not `403`), so a client can't even distinguish "not yours" from "doesn't exist."
- `owner` on task creation is always taken from the verified JWT (`req.user.id`), never from the request body — a client cannot fake ownership of a task.

## CORS

The frontend runs on a different origin (`localhost:5173`) than this API (`localhost:3000`), so CORS is enabled for `CLIENT_URL`. Without this, browser requests from the frontend are blocked even though the same requests work fine in Postman (which doesn't enforce CORS).
