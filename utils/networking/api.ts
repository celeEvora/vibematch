import axios, { InternalAxiosRequestConfig } from "axios";

const request = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default request;
