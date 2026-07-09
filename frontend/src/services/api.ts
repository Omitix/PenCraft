import axios from "axios";
import { getNavigate } from "../utils/navigate.utils";

export const api = axios.create({ baseURL: "/api", timeout: 6000 })
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => Promise.reject(error))

api.interceptors.response.use(

    response => {
        return response
    },
    error => {
        const navigate = getNavigate()
        if (error.response?.status == 401) {
            localStorage.removeItem("token")
            navigate("/auth")
        }
        return Promise.reject(error)
    }
)