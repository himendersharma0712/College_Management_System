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