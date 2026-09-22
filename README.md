# Final Year Project Tracker (Monorepo)

A complete research milestone progression and assessment portal submission tracker built with Node.js/Express (ES modules) + MongoDB on the backend, and React + Vite + Tailwind CSS on the frontend.

---

## 📁 Monorepo Structure

```text
.
├── client/                     # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/TaskCard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Node.js + Express + Mongoose Backend
│   ├── controllers/taskController.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── uploads/                # Submitted evidence files
│   ├── .env.example
│   ├── package.json
│   ├── seeder.js               # Initial 8 milestone research tasks
│   └── server.js
├── .gitignore
├── package.json                # Root NPM Workspaces configuration
└── README.md
```

---

## 🚀 Quickstart (Local Development)

### 1. Install Dependencies
From the repository root, install dependencies for both client and server:
```bash
npm install
```

### 2. Configure Environment Variables
- In `server/`: create `.env` (refer to `server/.env.example`):
  ```env
  PORT=5000
  MONGO_URI=mongodb://127.0.0.1:27017/fyp_tracker
  CLIENT_URL=http://localhost:5173
  ```
- In `client/`: create `.env` (refer to `client/.env.example`):
  ```env
  VITE_API_URL=http://localhost:5000
  ```

### 3. Seed Milestone Progression (Optional)
Make sure MongoDB is running, then run:
```bash
npm run seed
```

### 4. Run Locally
Run both client and server concurrently:
```bash
npm run dev
```
Or run individually:
- Backend: `npm run dev:server` (http://localhost:5000)
- Frontend: `npm run dev:client` (http://localhost:5173)

---

## 🌐 Online Deployment Guide

### Recommended Strategy: Decoupled Cloud Hosting

#### 1. Backend Deployment (Render / Railway / Fly.io)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment Variables**:
  - `MONGO_URI`: Your MongoDB Atlas connection URI (`mongodb+srv://<username>:<password>@cluster.mongodb.net/fyp_tracker?retryWrites=true&w=majority`)
  - `PORT`: `5000` (or leave default assigned by host)
  - `CLIENT_URL`: URL of your deployed frontend (e.g. `https://your-frontend.vercel.app`)
- **Health Check Route**: `/health`

#### 2. Frontend Deployment (Vercel / Netlify / Cloudflare Pages)
- **Root Directory**: `client`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: URL of your deployed backend (e.g. `https://your-backend.onrender.com`)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health status and uptime |
| `GET` | `/api/tasks` | Retrieve all milestone tasks sorted by step |
| `PATCH` | `/api/tasks/:id/status` | Update task status (`Pending`, `In Progress`, `Completed`) |
| `POST` | `/api/tasks/:id/submit` | Register submission proof, URLs, and multipart files |
| `GET` | `/uploads/:filename` | Access uploaded evidence documents |
