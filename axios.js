import axios from 'axios';

// Configuração global do Axios
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3333', // URL base do back-end
  timeout: 10000, // Tempo limite da requisição
});

export default api;
