# IntellMeet 🎯
### AI-Powered Enterprise Meeting & Collaboration Platform

IntellMeet is a production-grade meeting and collaboration platform built with the MERN stack. It features real-time video meetings, AI-powered transcription and summaries, team collaboration, Kanban task management, and an analytics dashboard.

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

# After coding
git add .
git commit -m "feat: describe what you built"
git push origin feature/your-feature-name

# Open Pull Request on GitHub → develop
```

### Commit Message Format
| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Config or setup |
| `docs:` | Documentation |
| `style:` | UI styling only |

---

## 📄 License
MIT License — see [LICENSE](LICENSE) for details
