import { Route, Routes } from "react-router-dom"
import { RegisterForm } from "./pages/auth/Register"
import { AuthProvider } from "./context/auth.context"
import { LoginForm } from "./pages/auth/Login"
import HomePage from "./pages/Home"
import Layout from "./pages/layouts/Layout"
import PrivateRoute from "./route/PrivateRoute"
import { GuestRoute } from "./route/GuestRoute"

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<GuestRoute><RegisterForm /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><LoginForm /></GuestRoute>} />
        <Route element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>} >
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
