import axios from 'axios';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',

});

export default api;
