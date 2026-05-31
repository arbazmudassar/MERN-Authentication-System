# 🔐 MERN Authentication System

A secure, production-ready authentication system built with the **MERN Stack**, implementing industry-standard security practices including JWT access/refresh tokens, OTP-based email verification, session management, and secure cookie handling.

---

## 📁 Repository Structure

```
mern-auth-system/
│
├── 📂 frontend/          # React + TypeScript client
├── 📂 backend/           # Node.js + Express.js server
└── 📄 README.md          # You are here
```

---

## ✨ Features at a Glance

| Category | Features |
|---|---|
| 🔑 **Authentication** | Register, Login, Logout, Logout From All Devices |
| 📧 **Email Verification** | OTP Generation, Delivery, Expiry & Resend |
| 🔒 **Password Recovery** | Forgot Password → OTP → Reset Flow |
| 📱 **Session Management** | Multi-device tracking, Session revocation |
| 🛡️ **Security** | JWT, Refresh Token Rotation, HTTP-Only Cookies, SHA-256 Hashing |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/arbazmudassar/mern-auth-system.git
cd mern-auth-system
```

### 2. Set Up Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MONGO_URI = db_link
JWT_KEY = jwt_secret key
GOOGLE_CLIENT_ID = enter here
GOOGLE_CLIENT_SECRET = enter here
GOOGLE_REFRESH_TOKEN = enter here
GOOGLE_USER = google mail here

```

```bash
npm run dev
```

### 3. Set Up Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173` · Backend runs on `http://localhost:5000`

---

## 🔄 Authentication Flows

```
Registration          Login                 Forgot Password
─────────────         ─────────────         ─────────────────
User Registers   →    Enter Credentials →   Enter Email      →
Account Created  →    Validate Creds    →   OTP Sent         →
OTP Sent         →    Create Session    →   Verify OTP       →
Verify Email     →    Issue JWT         →   Set New Password →
Account Active        Authenticated         Password Updated
```

---

## 📖 Documentation

| Module | README |
|--------|--------|
| 🎨 Frontend | [frontend/README.md](./frontend/README.md) |
| ⚙️ Backend | [backend/README.md](./backend/README.md) |

---

## 🗺️ Roadmap

- [ ] Google OAuth 2.0
- [ ] GitHub OAuth
- [ ] Two-Factor Authentication (2FA)
- [ ] Password Strength Meter
- [ ] Account Lockout Protection
- [ ] Login Activity Tracking
- [ ] Role-Based Authorization (RBAC)
- [ ] Admin Dashboard

---

## 👨‍💻 Author

**Arbaz Mudassar**
- GitHub: [@arbazmudassar](https://github.com/arbazmudassar)
- LinkedIn: [linkedin.com/in/arbazmudassar](https://linkedin.com/in/arbaz-mudassar)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with 💙 as a learning project to master real-world authentication patterns in the MERN stack.
