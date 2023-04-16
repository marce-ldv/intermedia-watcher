import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const instance = axios.create({
  baseURL: API,
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
