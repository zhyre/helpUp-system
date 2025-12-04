# Copilot Instructions for HelpUp System

## Project Overview

- **Monorepo**: Contains `frontend` (React, Create React App, Tailwind) and `backend` (Spring Boot, Java, MySQL).
- **Major Domains**: Users, Organizations, Campaigns, Donations, Wallets.
- **Data Flow**: Frontend communicates with backend via REST API (`/api/*`).

## Key Directories

- `frontend/src/AdminPage/` — Admin UI, including user management
- `frontend/src/services/` — API, authentication, and business logic
- `backend/helpup/src/main/java/com/helpup/contoller/` — REST controllers
- `backend/helpup/src/main/java/com/helpup/entity/` — JPA entities
- `backend/helpup/src/main/java/com/helpup/repository/` — Spring Data repositories
- `backend/helpup/src/main/java/com/helpup/config/` — Security and CORS config

## User Management CRUD

- **API Endpoints**: `/api/users` (GET, POST, PUT, DELETE)
- **Frontend**: `UserManagement.jsx` uses fetch/REST for CRUD, with modals for add/edit.
- **Validation**: Required fields enforced in forms; backend should validate as well.
- **Security**: Auth token (JWT or similar) is expected in `Authorization` header. See `authService.js` and `api.js`.
- **Roles**: `admin`, `donor`, `organization` (see `User.java`)
- **Password Handling**: Passwords are stored in DB; backend should hash passwords (currently plain, see `UserController`).

## Developer Workflows

- **Frontend**: `cd frontend && npm start` (dev), `npm run build` (prod)
- **Backend**: `cd backend/helpup && ./mvnw spring-boot:run` (dev)
- **Tests**: Frontend: `npm test`. Backend: `./mvnw test`.
- **API Base URL**: Set `REACT_APP_API_URL` in `.env` for frontend if not using default.

## Conventions & Patterns

- **API Calls**: Use `api.js` for all HTTP requests; handles auth token automatically.
- **Auth**: Use `authService.js` for login/logout and user state. Store token in `localStorage`.
- **Error Handling**: Show user-friendly errors in UI; backend returns error messages in JSON.
- **Component Structure**: Grouped by feature/page (e.g., `AdminPage/`, `DonationPage/`).
- **Styling**: Tailwind CSS, see `tailwind.config.js`.

## Security Notes

- **CORS**: Configured for localhost in `SecurityConfig.java`.
- **Authentication**: All endpoints currently permit all; update `SecurityConfig` for production.
- **Authorization**: Enforce role checks in backend for sensitive actions.
- **Sensitive Data**: Never expose passwords or tokens in logs or UI.

## Examples

- **Get all users**: `GET /api/users`
- **Create user**: `POST /api/users` (JSON body)
- **Update user**: `PUT /api/users/{userId}`
- **Delete user**: `DELETE /api/users/{userId}`

---

For more, see `frontend/README.md` and backend controller/entity files. Update this file as conventions evolve.
