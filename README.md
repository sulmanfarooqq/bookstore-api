# Bookstore API

A production-oriented RESTful API for managing bookstore inventory with Node.js, Express, and MongoDB. The project includes validation, centralized error handling, pagination, search, security middleware, automated tests, and a Railway-ready deployment configuration.

## Features

- Full CRUD API for books
- MongoDB + Mongoose data layer
- Request validation with `express-validator`
- Search, pagination, and sorting on the list endpoint
- Security middleware with `helmet`, rate limiting, sanitization, and `hpp`
- Automated integration tests using Jest, Supertest, and in-memory MongoDB
- Railway healthcheck and startup config in `railway.json`

## Project Structure

```text
bookstore-api/
|-- src/
|   |-- config/
|   |-- constants/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- services/
|   |-- utils/
|   |-- validators/
|   |-- app.js
|   `-- server.js
|-- tests/
|-- .env.example
|-- app.json
|-- eslint.config.js
|-- jest.config.js
|-- Procfile
|-- railway.json
`-- package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Copy `.env.example` to `.env` and update the values:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bookstore-api
LOG_LEVEL=dev
CLIENT_URL=http://localhost:3000
```

If you want to allow multiple frontends, set `CLIENT_URL` as a comma-separated list:

```env
CLIENT_URL=http://localhost:3000,https://your-frontend.example
```

Use `CLIENT_URL=*` only if you intentionally want public cross-origin access.

### 3. Run locally

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Base URL

Local:

```text
http://localhost:5000/api/v1
```

Railway:

```text
https://your-service.up.railway.app/api/v1
```

Compatibility routes matching the internship rubric are also available:

```text
http://localhost:5000/books
https://your-service.up.railway.app/books
```

## Endpoints

- `GET /health`
- `POST /books` or `POST /api/v1/books`
- `GET /books` or `GET /api/v1/books`
- `GET /books/:id` or `GET /api/v1/books/:id`
- `PUT /books/:id` or `PUT /api/v1/books/:id`
- `DELETE /books/:id` or `DELETE /api/v1/books/:id`

## Testing

```bash
npm test
```

## Deploy On Railway

### Current Railway note

Railway currently offers a `Free` plan with limited monthly credit, plus a 30-day trial for new users. Verify the latest limits in Railway pricing before deploying production traffic.

### 1. Create a MongoDB database

Railway can host the API process, but this project still needs a MongoDB instance. Use either:

- MongoDB Atlas free tier
- A Railway MongoDB service, if you prefer keeping infra in one platform

Set `MONGODB_URI` to the final connection string.

### 2. Push the repo to GitHub

Railway’s simplest flow is GitHub-based deploys.

### 3. Create a Railway project

In Railway:

1. Create a new project
2. Choose `Deploy from GitHub repo`
3. Select this repository

Railway should detect the Node app automatically because `package.json` contains `npm start`.

### 4. Configure variables

In the Railway service variables, set:

- `NODE_ENV=production`
- `MONGODB_URI=<your-production-mongodb-uri>`
- `LOG_LEVEL=combined`
- `CLIENT_URL=<your-frontend-domain>` or `*`

Do not hardcode `PORT`. Railway injects it automatically and this app already respects it.

### 5. Generate a public domain

Open the service settings and generate a Railway domain so the API is publicly reachable.

### 6. Healthcheck

This repo includes `railway.json` with `/health` as the deploy healthcheck path. Railway will wait for a `200` response before routing traffic to a new deployment.

## Production Notes

- `app.set('trust proxy', 1)` is enabled so rate limiting works correctly behind Railway’s proxy layer.
- Search input is escaped before becoming a MongoDB regex, which avoids malformed-pattern and regex abuse issues.
- The API starts listening only after MongoDB connects, so failed database bootstraps will fail the deploy instead of serving a half-ready app.
