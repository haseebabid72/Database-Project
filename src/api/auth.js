// Replace the simulated API with actual API calls

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-deployed-backend-url.vercel.app/api' 
  : 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Network error. Please try again later.'
    };
  }
}
