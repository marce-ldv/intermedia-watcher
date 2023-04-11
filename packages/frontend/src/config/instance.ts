import axios from "axios";

export const API = "http://localhost:5000/";

const instance = axios.create({
  baseURL: API,
});

const token = localStorage.getItem("token") ?? "";

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

export default instance;
