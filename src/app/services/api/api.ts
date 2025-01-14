import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7169',
});

export default api;
