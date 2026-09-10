# Career Flow (Hirepath)

A full-stack job application tracking platform built with React, TypeScript, Node.js, Express, and MongoDB.

Hirepath helps users organize their job search, track applications throughout the hiring process, and monitor key job-search metrics from a centralized dashboard.

The project focuses not only on application functionality, but also on production-oriented engineering practices including automated testing, containerization, CI/CD, and deployment.

## Live Demo

**Live Application:** [Hirepath](https://hirepath-0nzq.onrender.com)

> The backend is hosted on a free Render instance and may take a short time to wake up after a period of inactivity.

## Features

- User registration and authentication
- Secure cookie-based sessions
- Create, update, and delete job applications
- Track applications by status
- Store job details including company, position, location, and salary
- Dashboard with job-search statistics and analytics
- Responsive user interface

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Better Auth

**Testing**
- Vitest
- React Testing Library
- Supertest
- Playwright

**DevOps & Deployment**
- Docker
- Docker Compose
- GitHub Actions
- CI/CD
- Render
- MongoDB Atlas

## Architecture

Hirepath uses a separated frontend/backend architecture.

```text
┌──────────────────────────┐
│          Browser         │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   React + TypeScript     │
│     Render Static Site   │
└────────────┬─────────────┘
             │
             │ HTTPS / REST API
             ▼
┌──────────────────────────┐
│   Node.js + Express API  │
│   Docker Web Service     │
├──────────────────────────┤
│       Better Auth        │
│       Mongoose           │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      MongoDB Atlas       │
└──────────────────────────┘
```

The frontend communicates directly with the backend through a REST API.

Authentication is handled with Better Auth using secure cookie-based sessions. CORS and trusted origins are configured to allow authenticated requests between the independently deployed frontend and backend.

MongoDB Atlas provides persistent data storage, while Mongoose is used for application data modeling.

## Testing

Hirepath uses multiple levels of automated testing to verify behavior from isolated application logic to complete user workflows.

### Backend

Backend tests use **Vitest** and **Supertest** and cover both isolated logic and API integration behavior.

### Frontend

Frontend tests use **Vitest** and **React Testing Library** to verify components, user interactions, and integration between UI behavior and application logic.

### End-to-End

**Playwright** tests run against the complete application and verify critical user flows, including:

- Opening the application
- User registration
- Sign out and sign in
- Creating a job application
- Updating application status
- Deleting a job application

A separate E2E environment and database are used to keep automated test data isolated from development and production data.

## Docker

Both frontend and backend are containerized independently.

The complete application can be built and started locally with Docker Compose:

```bash
docker compose up --build
```

Docker Compose coordinates both services and provides a reproducible way to run the complete stack locally.

The backend Docker image is also used for the production deployment on Render.

## CI/CD

Hirepath uses **GitHub Actions** for continuous integration.

Every change targeting the main branch goes through automated validation:

```text
Push / Pull Request
        │
        ▼
┌─────────────────────┐
│   GitHub Actions    │
├─────────────────────┤
│ Backend Tests       │
│ Frontend Tests      │
│ Production Build    │
│ Playwright E2E      │
│ Docker Build        │
└──────────┬──────────┘
           │
           │ CI Passed
           ▼
┌─────────────────────┐
│      Deployment     │
│       Render        │
└─────────────────────┘
```

The pipeline includes:

- Backend automated tests
- Frontend automated tests
- Frontend production build validation
- Playwright end-to-end tests
- Docker image build validation

Production deployment is triggered only after the required CI checks pass.

The frontend is deployed as a **Render Static Site**, while the backend runs as a **Docker Web Service**.

## Getting Started

### Prerequisites

For the Docker setup:

- Docker
- Docker Compose
- MongoDB Atlas database

For manual development:

- Node.js
- npm
- MongoDB Atlas database

### Run with Docker

Clone the repository:

```bash
git clone https://github.com/tvsxar/career-flow
cd career-flow
```

Create the required environment file inside `backend/`.

```env
MONGO_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:1099
CLIENT_URL=http://localhost:8080
PORT=1099
```

Then start the application:

```bash
docker compose up --build
```

The application will be available at:

```text
Frontend: http://localhost:8080
Backend:  http://localhost:1099
```

### Manual Development

Install backend dependencies:

```bash
cd backend
npm ci
npm run dev
```

Install frontend dependencies in another terminal:

```bash
cd frontend
npm ci
npm run dev
```

For local frontend development, configure:

```env
VITE_API_URL=http://localhost:1099
```

## Project Structure

```text
career-flow/
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── Dockerfile
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── e2e/
│   ├── src/
│   ├── Dockerfile
│   └── vite.config.ts
│
└── compose.yaml
```

## API

The backend exposes REST endpoints for authentication and job application management.

Main application routes:

```text
/api/auth/*     Authentication
/api/jobs       Job application management
/api/health     Service health check
```

Job operations are protected by authentication and operate on data belonging to the authenticated user.

## Author

**Taras Poiatsyka**

[GitHub](https://github.com/tvsxar)
