import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
import SignIn from "./Pages/Auth/SignIn"
import SignUp from "./Pages/Auth/SignUp"
import VerifyEmail from './Pages/Auth/VerifyEmail'
import ForgotPassword from "./Pages/Auth/ForgotPassword"
import Dashboard from "./Pages/Dashboard"
import ErrorPage from "./Pages/ErrorPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/500-error" element={<ErrorPage />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App