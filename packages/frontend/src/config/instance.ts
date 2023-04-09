import axios from 'axios';

export const API = 'http://localhost:5000/';

const instance = axios.create({
  baseURL: API,
});

export default instance;
