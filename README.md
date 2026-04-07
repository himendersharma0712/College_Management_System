# 🎓 CampusPro: Integrated College Management Portal

A full-stack, multi-role academic management system designed to streamline interactions between students, faculty, and administrators. Built with a modern **React** frontend and a high-performance **FastAPI** backend.

## 🚀 Features

### **Student Portal**
* **Personal Dashboard**: View profile details and roll number.
* **Attendance Tracking**: Subject-wise breakdown of attendance with visual indicators for university requirements (75% threshold).
* **Examination Results**: Access to published marks for mid-terms and finals.
* **Notice Board**: Real-time campus announcements and schedule updates.

### **Teacher Portal**
* **Class Management**: View daily lecture schedules, room assignments, and class types.
* **Student CRUD**: Full capability to **Create**, **Read**, and **Delete** students directly from the live MySQL database.
* **Academic Actions**: Dedicated modules for marking attendance and uploading examination scores.

### **Admin Control Center**
* **System Analytics**: College-wide KPIs including total enrollment, faculty count, and active subjects.
* **Faculty Management**: Full CRUD operations to manage teacher accounts and system access.
* **System Health**: Monitoring tools for system alerts and activity logs.

---

## 🛠️ Tech Stack

**Frontend:**
* **React 18** (Vite)
* **React Router Dom v6** (Client-side Routing)
* **CSS-in-JS**: Custom styled components for a premium, responsive UI.

**Backend:**
* **FastAPI** (Python): High-performance asynchronous API framework.
* **SQLAlchemy**: Object-Relational Mapper (ORM) for database interactions.
* **Pydantic**: Strict data validation and serialization.

**Database:**
* **MySQL**: Relational database (managed via XAMPP/phpMyAdmin).
* **PyMySQL**: Python MySQL client for seamless connectivity.

---

## 📂 Project Structure

```text
├── backend/
│   ├── routers/           # Dedicated API endpoints (Auth, Students, Teachers)
│   ├── database.py        # SQLAlchemy engine and session configuration
│   ├── models.py          # MySQL Table/Schema Definitions
│   ├── schemas.py         # Pydantic data models for validation
│   └── main.py            # FastAPI entry point & CORS middleware
├── src/
│   ├── components/        # Sidebar Layout, Top Header, and Navigation Logic
│   ├── pages/             # Student, Teacher, and Admin Dashboard views
│   ├── api.js             # Centralized Fetch/API helper functions
│   └── App.jsx            # Dynamic Routing logic
└── package.json           # Frontend dependencies and scripts
```

### 📋 Installation & Setup
## 1. Database Configuration
Open XAMPP Control Panel and start Apache and MySQL.

Navigate to http://localhost/phpmyadmin.

Create a new database named college_portal.

Note: The backend is configured to auto-generate all required tables on the first run.

## 2. Backend Setup
```
cd backend
pip install fastapi uvicorn sqlalchemy pymysql pydantic
uvicorn main:app --reload
```
API Documentation (Swagger UI) will be available at http://localhost:8000/docs.

## 4. Frontend Setup
```
# From the project root folder
npm install
npm install react-router-dom
npm run dev
The portal will be accessible at http://localhost:5173.
```

🔐 Architecture Highlights
---
URL-Aware Layout: The UI automatically adapts its sidebar, navigation links, and user profile based on the URL path.

Dynamic Role-Switching: Built-in logic to handle distinct views for Students, Teachers, and Admins for testing and development.

CORS Integration: Secure cross-origin resource sharing configured to allow the Vite dev server to communicate with the FastAPI backend.

---
Developed by: Himender Sharma

Roll No. : CO24326
