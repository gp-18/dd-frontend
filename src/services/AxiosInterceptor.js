import axios from 'axios';

const baseURL = "http://127.0.0.1:8001/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      const extractedToken =  token.replace(/"/g, '');
      config.headers['Authorization'] = `Bearer ${extractedToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error here (e.g., redirect to login page)
      console.error("Unauthorized. Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
