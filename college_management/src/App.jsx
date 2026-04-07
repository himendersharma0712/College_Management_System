import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PortalLayout from './components/PortalLayout';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
   <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Portal Routes (Wrapped in the shared layout) */}
        <Route element={<PortalLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}