# 🎨 Frontend — MERN Authentication System

The client-side of the MERN Authentication System, built with **React**, **TypeScript**, and **Tailwind CSS**. Provides a clean, responsive UI for all authentication flows including registration, login, email verification, and password recovery.

---

## 📁 Folder Structure

```
frontend/
├── public/
└── src/
    ├── 📂 pages/             # Route-level page components
    │   ├── Auth
    │   │   ├── SignUp.tsx
    │   │   ├── SignIn.tsx
    │   │   ├── VerifyEmail.tsx
    │   │   └── ForgotPassword.tsx
    │   └── Dashboard.tsx
    │
    ├── 📂 components/        # Reusable UI components
    │   └── AuthSideBar.tsx
    │
    ├── 📂 assets/            # Static assets (images, icons)
    │
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| TypeScript | Type safety |
| React Router DOM | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP requests to backend API |

---

## 🔑 Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/register` | Registration form | Public |
| `/login` | Login form | Public |
| `/verify-email` | OTP verification | Public |
| `/forgot-password` | Forgot password form | Public |
| `/reset-password` | New password form | Public |
| `/dashboard` | User dashboard | 🔒 Protected |

---

## 🛡️ Protected Routes

Routes marked as protected require a valid JWT access token. Unauthenticated users are automatically redirected to `/login`.

```tsx
// Example usage
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

## 📋 Key Features

- **Form Validation** — Client-side validation with clear error messages
- **OTP Input** — Custom OTP input component with auto-focus between fields
- **Protected Routes** — Route guards using React Router
- **Responsive UI** — Mobile-first design with Tailwind CSS
- **Token Handling** — Automatic access token refresh via interceptors
- **TypeScript** — Fully typed components and API responses

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- Backend server running on port `5000`

### Install Dependencies

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the `/frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Run Development Server

```bash
npm run dev
```

> Runs on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🔗 API Integration

All API calls are made to the backend server. Base URL is configured via the `VITE_API_URL` environment variable.

| Action | Method | Endpoint |
|---|---|---|
| Register | `POST` | `/api/auth/register` |
| Login | `POST` | `/api/auth/login` |
| Logout | `POST` | `/api/auth/logout` |
| Logout All | `POST` | `/api/auth/logout-all` |
| Verify OTP | `POST` | `/api/auth/verify-email` |
| Resend OTP | `POST` | `/api/auth/resend-otp` |
| Forgot Password | `POST` | `/api/auth/forgot-password` |
| Reset Password | `POST` | `/api/auth/reset-password` |
| Refresh Token | `POST` | `/api/auth/refresh` |

---

## 👨‍💻 Author

**Arbaz Mudassar** · [@arbazmudassar](https://github.com/arbazmudassar)

**LinkedIn** . [@LinkedIn](www.linkedin.com/in/arbaz-mudassar)
