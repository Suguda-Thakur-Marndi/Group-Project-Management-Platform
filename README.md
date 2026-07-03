# Group Project Management Platform

A full-stack workspace and project management application for teams to collaborate on workspaces, projects, members, and tasks. The project uses a Node.js/Express/TypeScript backend and a React 19/Vite/Tailwind CSS frontend.

---

## ✨ What the app does

- Create and manage workspaces for different teams or organizations
- Invite members and assign roles/permissions
- Create projects inside each workspace
- Create, assign, and update tasks with status tracking
- Support local authentication and Google OAuth sign-in
- Use session-based authentication with cookie-based security

---

## 🛠️ Tech stack

### Backend
- Node.js
- Express 5
- TypeScript
- MongoDB + Mongoose 9
- Passport.js for local and Google OAuth authentication
- Cookie-session, CORS, JWT-compatible session handling, Zod validation

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- React Query, React Hook Form, TanStack Table, Radix UI primitives

---

## 📁 Project structure

```text
group-project-management-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # App, database, HTTP, and passport configuration
│   │   ├── controllers/     # Auth, workspace, member, project, task, and user controllers
│   │   ├── enums/           # Role, error, and task-related enums
│   │   ├── middlewares/      # Auth, async, and error handling middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper utilities and custom errors
│   │   └── validation/      # Request validation schemas
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth and query context providers
│   │   ├── hooks/           # Custom hooks
│   │   ├── layout/          # Main layouts
│   │   ├── lib/             # API and helper utilities
│   │   ├── page/            # App pages
│   │   ├── routes/          # Routing setup
│   │   └── types/           # TypeScript types
│   └── package.json
└── README.md
```

---

## 🚀 Getting started

### Prerequisites
- Node.js 20+ recommended
- MongoDB running locally or via MongoDB Atlas
- npm

### 1. Install dependencies

```powershell
cd backend
npm install

cd ../client
npm install
```

### 2. Configure environment variables

#### Backend: backend/.env
```env
PORT=5000
NODE_ENV=development
BASE_PATH=/api
MONGO_URI=mongodb://127.0.0.1:27017/group-management-platform
SESSION_SECRET=change-me
FRONTEND_ORIGIN=http://localhost:5173

# Optional Google OAuth settings
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

#### Frontend: client/.env
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> If you change the backend port, update the frontend API URL to match it.

### 3. Run the app locally

Open two terminals.

#### Backend
```powershell
cd backend
npm run dev
```

#### Frontend
```powershell
cd client
npm run dev
```

The backend will run on http://localhost:5000 and the frontend on http://localhost:5173 by default.

---

## 🧪 Available scripts

### Backend
- `npm run dev` — start the backend in development mode
- `npm run build` — compile TypeScript to JavaScript

### Frontend
- `npm run dev` — start the Vite development server
- `npm run build` — build the production bundle
- `npm run lint` — run ESLint

---

## 📡 API overview

The backend exposes REST endpoints under the configured API base path, typically `/api`.

| Endpoint Prefix | Auth Required | Description |
| :--- | :---: | :--- |
| `/api/auth` | No | Register, login, logout, and Google OAuth flows |
| `/api/user` | Yes | Get the current authenticated user profile |
| `/api/workspace` | Yes | Create and manage workspaces |
| `/api/member` | Yes | Manage workspace members and roles |
| `/api/project` | Yes | Create and manage projects inside workspaces |
| `/api/task` | Yes | Create, assign, and update tasks |

---

## 🛡️ License
This project is licensed under the ISC License.
