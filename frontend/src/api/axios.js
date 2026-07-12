import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const API = axios.create({
  baseURL: `${apiBaseUrl}/api`, 
});

export default API;