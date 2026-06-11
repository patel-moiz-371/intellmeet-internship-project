# IntellMeet 🎯
### AI-Powered Enterprise Meeting & Collaboration Platform

Built as part of the Zidio Development Internship 2026 — Web Development (MERN) Domain
> Built as part of the Zidio Development Internship 2026 — Web Development (MERN) Domain

![Login Page](./docs/screenshots/login.png)

---

## 🚀 Live Demo
> Coming soon after deployment

---

## ⚙️ Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Zustand (State Management)
- TanStack Query
- React Router v6

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io (Real-time)
- WebRTC (Video)
- JWT Authentication

**AI**
- OpenAI Whisper (Transcription)
- GPT-4 (Summaries + Action Items)

**DevOps**
- Docker + Docker Compose
- GitHub Actions CI/CD
- Render (Backend)
- Vercel (Frontend)

---

## ✨ Features

- [x] Authentication (JWT + Refresh Tokens + RBAC)
- [x] Strong Password Validation
- [x] Protected Routes
- [ ] Real-Time Video Meetings (WebRTC)
- [ ] Screen Sharing & Recording
- [ ] AI Meeting Transcription
- [ ] AI Summaries & Action Item Extraction
- [ ] Real-Time Chat
- [ ] Kanban Task Management
- [ ] Post-Meeting Dashboard
- [ ] Analytics & Productivity Insights
- [ ] Fully Responsive UI

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| Moiz | Team Lead + Auth + DevOps | [@patel-moiz-371](https://github.com/patel-moiz-371) |
| Jay | Frontend + Dashboard + UI | [@gaikwadjay181](https://github.com/gaikwadjay181) |
| Rohit | Meetings + Chat + Socket.io | [@DhoriRohit1](https://github.com/DhoriRohit1) |
| Charulatha | Kanban + Task Management | [@Charulatha2324](https://github.com/Charulatha2324) |

---

## 🗂️ Project Structure

```
intellmeet/
├── client/         # React 19 + Vite frontend
│   └── src/
│       ├── api/         # Axios API calls
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route level pages
│       ├── store/       # Zustand state management
│       ├── hooks/       # Custom React hooks
│       ├── types/       # TypeScript interfaces
│       └── router/      # App routing
├── server/         # Node.js + Express backend
│   └── src/
│       ├── modules/     # Feature modules (auth, meetings, etc.)
│       ├── middleware/  # Express middleware
│       ├── socket/      # Socket.io events
│       └── utils/       # Helper utilities
├── docker/         # Docker configuration
├── docs/           # Project documentation
└── .github/        # CI/CD workflows
```

---

## 🛠️ Local Setup

### Prerequisites
- Node.js v20+
- Git
- MongoDB Atlas account (free)

### 1. Clone the Repository
```bash
git clone https://github.com/patel-moiz-371/intellmeet-intership-project.git
cd intellmeet-intership-project
```

### 2. Setup the Server
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

Run the server:
```bash
npm run dev
```

### 3. Setup the Client
```bash
cd client
npm install
npm run dev
```

### 4. Open in Browser
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout user |

> More endpoints coming as features are built

---

## 🤝 Team Workflow

```bash
# Start your work session
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name
> Built as part of the **Zidio Development Internship 2026** — Web Development (MERN) Domain

IntellMeet is a production-grade meeting and collaboration platform built with the MERN stack. It brings together real-time video conferencing, AI-powered transcription and meeting summaries, team collaboration, Kanban task management, and a productivity analytics dashboard — all in one place.

---

👥 Team
Name	Role
Moiz	Team Lead + Auth + DevOps
Jay	Frontend + Dashboard + UI
Rohit	Meetings + Chat + Socket.io
Charulatha	Kanban + Task Management
## 🚀 Live Demo
> Coming soon after deployment

---

## ⚙️ Tech Stack

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

---

## ✨ Key Features

- 🔐 **Authentication** — JWT + Refresh Tokens + Role Based Access Control
- 🎥 **Video Meetings** — Real-time video conferencing powered by WebRTC
- 🤖 **AI Intelligence** — Auto transcription, meeting summaries & action item extraction
- 💬 **Real-time Chat** — In-meeting chat with typing indicators
- 📋 **Kanban Board** — Task management with drag and drop
- 📊 **Analytics** — Productivity insights and meeting statistics
- 📱 **Responsive** — Works on desktop, tablet and mobile

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| Moiz | Team Lead + Auth + DevOps | [@patel-moiz-371](https://github.com/patel-moiz-371) |
| Jay | Frontend + Dashboard + UI | [@gaikwadjay181](https://github.com/gaikwadjay181) |
| Rohit | Meetings + Chat + Socket.io | [@DhoriRohit1](https://github.com/DhoriRohit1) |
| Charulatha | Kanban + Task Management | [@Charulatha2324](https://github.com/Charulatha2324) |

---

## 📁 Repository

| Branch | Purpose |
|--------|---------|
| `main` | Production ready — final release |
| `develop` | Active development — all work happens here |

> ⚠️ All active development is on the `develop` branch. This branch will be updated upon final release.

---

*© 2026 IntellMeet — Zidio Development Internship Project*
