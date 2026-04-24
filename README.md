# Bookstore API

A production-oriented RESTful API for managing bookstore inventory with Node.js, Express, and MongoDB. The project includes validation, centralized error handling, pagination, search, security middleware, automated tests, and Heroku-ready deployment files.

## Features

- Full CRUD API for books
- MongoDB + Mongoose data layer
- Request validation with `express-validator`
- Search, pagination, and sorting on the list endpoint
- Security middleware with `helmet`, rate limiting, sanitization, and `hpp`
- Automated integration tests using Jest, Supertest, and in-memory MongoDB
- Deployment files for Heroku-style platforms

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
|-- Procfile
|-- app.json
|-- eslint.config.js
|-- jest.config.js
`-- package.json
```

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest
- Supertest

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

### 3. Run locally

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Base URL

```text
http://localhost:5000/api/v1
```

## Endpoints

### Health Check

`GET /health`

### Create a Book

`POST /api/v1/books`

Request body:

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "1234567890123",
  "publishedDate": "2018-10-16"
}
```

### Get All Books

`GET /api/v1/books`

Optional query params:

- `page`
- `limit`
- `search`
- `sortBy`
- `order`

Example:

```text
GET /api/v1/books?page=1&limit=10&search=atomic&sortBy=title&order=asc
```

### Get One Book

`GET /api/v1/books/:id`

### Update a Book

`PUT /api/v1/books/:id`

Example request body:

```json
{
  "price": 25
}
```

### Delete a Book

`DELETE /api/v1/books/:id`

## Sample Success Response

```json
{
  "status": "success",
  "message": "Book fetched successfully",
  "data": {
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 20,
    "isbn": "1234567890123",
    "publishedDate": "2018-10-16T00:00:00.000Z",
    "createdAt": "2026-04-24T13:00:00.000Z",
    "updatedAt": "2026-04-24T13:00:00.000Z",
    "id": "680a354dc01f6fabcd123456"
  }
}
```

## Testing

Run the automated test suite:

```bash
npm test
```

## Deployment Notes

This repository includes:

- `Procfile` for process startup
- `app.json` for app metadata
- `PORT` support through environment variables
- Production-safe startup via `npm start`

To deploy, set the required environment variables in your platform dashboard:

- `NODE_ENV=production`
- `MONGODB_URI=<your-production-mongodb-uri>`
- `PORT=<provided-by-platform>`

## Suggested Submission Extras

- Add a Postman collection export
- Push the repository to GitHub
- Deploy to Heroku, Render, or Railway

Postman collection included: `postman_collection.json`
