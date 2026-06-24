import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Add idempotency key for unsafe methods
    if (['post', 'put', 'patch'].includes(config.method?.toLowerCase())) {
      config.headers['Idempotency-Key'] = crypto.randomUUID();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., token expired)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      // Redirect to login could be handled here or in the UI layer
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
