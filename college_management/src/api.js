// src/api.js
const API_BASE_URL = 'http://localhost:8000';

export async function authenticateUser(userId, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, password: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Add this below your existing authenticateUser function in src/api.js

export async function fetchStudentDashboard(userId) {
  try {
    // In a real app, you would pass a JWT token in the headers here
    const response = await fetch(`${API_BASE_URL}/student/${userId}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}


// Add these to the bottom of src/api.js

export async function fetchStudents() {
  const response = await fetch(`${API_BASE_URL}/students/`);
  if (!response.ok) throw new Error('Failed to fetch students');
  return await response.json();
}

export async function createStudent(studentData) {
  const response = await fetch(`${API_BASE_URL}/students/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create student');
  }
  return await response.json();
}

export async function deleteStudent(studentId) {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete student');
  return await response.json();
}


// Add these to the bottom of src/api.js

export async function fetchTeachers() {
  const response = await fetch(`${API_BASE_URL}/teachers/`);
  if (!response.ok) throw new Error('Failed to fetch teachers');
  return await response.json();
}

export async function createTeacher(teacherData) {
  const response = await fetch(`${API_BASE_URL}/teachers/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacherData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create teacher');
  }
  return await response.json();
}

export async function deleteTeacher(teacherId) {
  const response = await fetch(`${API_BASE_URL}/teachers/${teacherId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete teacher');
  return await response.json();
}