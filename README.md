# Learning Express

![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0-blue)
![Express](https://img.shields.io/badge/express-%5E5.0-lightgrey)
![Status](https://img.shields.io/badge/status-ready-brightgreen)

## Project Overview

Learning Express is a modular, TypeScript-based Express.js starter application built for backend developers who want a clean reference architecture for API development.

This repository showcases:
- a structured server setup with `app.ts` and `server.ts`
- middleware pipelines for logging, validation, and error handling
- centralized configuration and database connectivity
- feature-based routing and controller/service separation

## Built With

- Node.js
- Express.js
- TypeScript
- dotenv
- CORS
- Modular routing and controller design
- Database integration through `src/config/db.ts`

## Features

- API-first Express server architecture
- Type-safe request and response handling
- Centralized error handling middleware
- Request validation support
- Environment-driven configuration
- Simple user CRUD endpoints
- Ready for local development and production build

## Getting Started

### Prerequisites

- Node.js 16.x or newer
- npm 8.x or newer
- Local database or cloud database instance

### Installation

```bash
git clone https://github.com/<your-org>/learning_express.git
cd learning_express
npm install
```

### Environment Setup

Create a `.env` file at the project root and add the required environment variables:

```env
PORT=8000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/learning_express
```

Update `DATABASE_URL` to match your database provider.

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:8000` (or the configured port) to verify the server.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `src/app.ts` - Creates and configures the Express application, mounts middleware, and registers routes.
- `src/server.ts` - Loads environment variables, connects to the database, and starts the HTTP server.
- `src/routes/` - Route definitions and router composition.
- `src/controllers/` - Route handlers and response logic.
- `src/services/` - Business logic, validation, and data orchestration.
- `src/models/` - TypeScript type definitions and data models.
- `src/middleware/` - Logging, validation, and centralized error handling.
- `src/config/` - Environment loading and database connection setup.

## API Reference

Base URL: `/api`

### Users

#### GET /api/users
Retrieve a list of all users.

Response example:
```json
[
  {
    "id": "123",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
]
```

#### GET /api/users/:id
Retrieve a single user by ID.

Response example:
```json
{
  "id": "123",
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### POST /api/users
Create a new user.

Request body example:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

Response example:
```json
{
  "id": "123",
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### PUT /api/users/:id
Update an existing user.

Request body example:
```json
{
  "name": "Jane Doe Updated",
  "email": "jane.new@example.com"
}
```

#### DELETE /api/users/:id
Delete a user by ID.

Response example:
```json
{
  "message": "User deleted successfully"
}
```

## Screenshots

![App Screenshot](https://via.placeholder.com/800x400?text=Application+Screenshot)

## Scripts

- `npm run dev` - Start the server in development mode with auto-reload.
- `npm run build` - Compile TypeScript to JavaScript.
- `npm start` - Run the compiled application from `dist/`.
- `npm test` - Run tests if the repository includes a test suite.

## Deployment

This project can be deployed to any Node.js-friendly environment.

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the built server:
   ```bash
   npm start
   ```

For containerized deployment, add a `Dockerfile` and map `PORT` to your hosting environment.

## Contribution

Contributions are welcome. To get started:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add feature description"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a pull request.

Please keep pull requests focused, and include tests or documentation updates when applicable.

## Troubleshooting

### The server does not start
- Ensure the `.env` file exists and contains valid values.
- Confirm `PORT` is not already in use.
- Check that `DATABASE_URL` points to a reachable database instance.

### Cannot connect to the database
- Verify the database is running.
- Confirm the connection string is correct.
- If using MongoDB, check credentials and network access.

### TypeScript compilation errors
- Run `npm run build` to inspect compile-time errors.
- Confirm your local Node.js and npm versions meet the prerequisites.

## Security and Environment Notes

- Never commit `.env` or secrets to source control.
- Keep environment-specific values outside the repository.
- Use strong credentials for database connections.
- Sanitize and validate all incoming request data.

## Notes

This repository is a solid starting point for building production-ready Express.js APIs with TypeScript. Customize the data layer, extend routes, and integrate authentication as needed.
