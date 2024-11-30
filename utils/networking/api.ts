import axios, { InternalAxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/useAuthStore";

const request = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

request.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        const { token } = useAuthStore.getState() as { token: string };
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
);

export default request;
