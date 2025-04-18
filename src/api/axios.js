import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("wholesalerToken") || localStorage.getItem("manufacturerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
