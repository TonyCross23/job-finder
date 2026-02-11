import { Route, Routes } from "react-router-dom"
import { RegisterForm } from "./pages/auth/Register"
import { AuthProvider } from "./context/auth.context"
import { LoginForm } from "./pages/auth/Login"
import HomePage from "./pages/Home"
import Layout from "./pages/layouts/Layout"
import PrivateRoute from "./route/PrivateRoute"
import { GuestRoute } from "./route/GuestRoute"
import { Dashboard } from "./admin/pages/Dashboard"
import { Jobs } from "./admin/pages/Jobs"
import { Applications } from "./admin/pages/Applications"
import AdminLayout from "./admin/layouts/Layout"
import { Users } from "./admin/pages/Users"
import AdminCompanies from "./admin/pages/Companies"
import { Locations } from "./admin/pages/Location"
import ForgotPassword from "./pages/auth/ForgotPassword"
import EditProfile from "./pages/EditProfile"

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<GuestRoute><RegisterForm /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><LoginForm /></GuestRoute>} />
        <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />

        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="location" element={<Locations />} />
          <Route path="applications" element={<Applications />} />
        </Route>


        <Route element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>} >
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/profile/:id" element={<EditProfile/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
