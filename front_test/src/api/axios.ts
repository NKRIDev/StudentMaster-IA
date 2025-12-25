import axios from "axios";

/**
 * Axios instance with base URL and headers
 */
export const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 300000,
    headers: {
        "Content-Type" : "application/json",
    },
});

/**
 * Add a request interceptor to include the token in headers
 */
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});