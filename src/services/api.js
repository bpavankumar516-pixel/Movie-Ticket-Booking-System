import axios from 'axios';

// Fallback timeout & interceptors
export const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API Request failed, fallback mock service activated.', error.message);
    return Promise.reject(error);
  }
);
