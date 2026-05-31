# ⚙️ Backend — MERN Authentication System

The server-side of the MERN Authentication System, built with **Node.js**, **Express.js**, and **MongoDB**. Implements a secure, scalable REST API handling all authentication logic including JWT token management, OTP email delivery, refresh token rotation, and multi-device session management.

---

## 📁 Folder Structure

```
backend/
├── 📂 config/              # App configuration (env, constants)
│   └── config.js
│   └── database.js          #Database Connection
│
├── 📂 controllers/         # Route handler logic
│   └── auth.controller.js
│
│
├── 📂 middlewares/         # Express middleware
│   ├── auth.middleware.js  # JWT verification
│
├── 📂 models/              # Mongoose schemas
│   ├── user.model.js
│   └── session.model.js
│   └── otp.model.js
│
├── 📂 routes/              # API route definitions
│   └── auth.routes.js
│
├── 📂 services/            # Business logic layer
│   └── email.service.js
│
├── 📂 utils/               # Helper utilities
│   └── utils.js        # OTP generation & expiry
│
├── .env                    # Environment variables (not committed)
├── .env.example            # Example env file
├── package.json
└── server.js               # Entry point
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JSON Web Tokens (JWT) | Access & refresh token auth |
| Nodemailer | OTP email delivery |
| bcrypt | Password hashing |
| crypto (built-in) | SHA-256 token/OTP hashing |
| cookie-parser | Secure cookie handling |

---

## 🔐 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register new user | No |
| `POST` | `/login` | Login and get tokens | No |
| `POST` | `/logout` | Logout current session | ✅ Yes |
| `POST` | `/logout-all` | Revoke all sessions | ✅ Yes |
| `POST` | `/verify-email` | Verify OTP from email | No |
| `POST` | `/resend-otp` | Resend verification OTP | No |
| `POST` | `/forgot-password` | Send password reset OTP | No |
| `POST` | `/verify-forgot-password-otp` | Verify password reset OTP | No |
| `POST` | `/reset-password` | Reset password with OTP | No |
| `POST` | `/refresh-token` | Refresh access token | No (uses cookie) |

---

## 🔄 Token Strategy

```
Client                          Server
  │                               │
  │── POST /login ───────────────▶│
  │                               │  Issues:
  │◀── accessToken (15m) ─────────│  • Short-lived access token
  │◀── refreshToken cookie ───────│  • HTTP-Only refresh cookie
  │                               │
  │── (access token expires) ────▶│
  │── POST /refresh ─────────────▶│
  │◀── new accessToken ───────────│  Rotates refresh token
  │◀── new refreshToken cookie ───│
```

- **Access Token** — Short-lived (15 min), sent in response body
- **Refresh Token** — Long-lived, stored as HTTP-Only secure cookie
- **Rotation** — Every refresh issues a new refresh token; old one is invalidated

---

## 🛡️ Security Implementation

| Feature | Implementation |
|---|---|
| Password hashing | bcrypt with salt rounds |
| OTP hashing | SHA-256 before storing in DB |
| Token hashing | SHA-256 for refresh token storage |
| Cookie security | `httpOnly: true`, `secure: true`, `sameSite: strict` |
| Protected routes | JWT middleware on all guarded endpoints |
| Session tracking | Per-device session records with device info |

---

## 📧 Email (OTP) Flow

```
1. OTP generated (6-digit random)
2. OTP hashed with SHA-256
3. Hashed OTP stored in DB with expiry timestamp (10 min)
4. Plain OTP sent to user's email via Nodemailer
5. User submits OTP → hash it → compare with DB record
6. On match → verify user / reset password
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local instance or MongoDB Atlas)
- Gmail account with App Password enabled

### Install Dependencies

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_strong_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> **Note:** Use a Gmail App Password (not your account password). Enable it at: Google Account → Security → 2FA → App Passwords.

### Run Development Server

```bash
npm run dev
```

> Server runs on `http://localhost:5000`

### Run in Production

```bash
npm start
```

---

## 🗃️ Database Models

### User Model
```
User {
  name: String
  email: String (unique)
  password: String (hashed)
  isVerified: Boolean
  otp: String (hashed)
  otpExpiry: Date
  createdAt: Date
}
```

### Session Model
```
Session {
  userId: ObjectId (ref: User)
  refreshToken: String (hashed)
  deviceInfo: String
  createdAt: Date
  expiresAt: Date
}
```

---

## 🔧 Scripts

```bash
npm run dev       # Start with nodemon (development)
npm start         # Start without nodemon (production)
```

---

## 👨‍💻 Author
**Arbaz Mudassar** · [@arbazmudassar](https://github.com/arbazmudassar)
**LinkedIn** . [@linkedin](www.linkedin.com/in/arbaz-mudassar)
