import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Login Page Goes Here</div>} />
        <Route path="/student" element={<div>Student Dashboard</div>} />
        <Route path="/teacher" element={<div>Teacher Dashboard</div>} />
        <Route path="/admin" element={<div>Admin Panel</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
