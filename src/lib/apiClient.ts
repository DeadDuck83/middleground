import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  responseType: 'json',
});

export default apiClient;
