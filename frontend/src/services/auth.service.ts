import type { User } from "../types/user.types";
import { api } from "./api";
import type { AuthResponse } from "../types/auth.types";

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
    return (await api.post("/auth/register", { username, email, password })).data
}

export const login = async (identity: string, password: string): Promise<AuthResponse> => {
    return (await api.post("/auth/login", { identity, password })).data
}

export const getMe = async (): Promise<User> => {
    return (await api.get("/auth/me")).data.user
}

export const resetPassword = async (newPassword: string, token: string) => {
    return (await api.post("/auth/reset-password", { newPassword, token })).data
}

export const forgotPassword = async (email: string) => {
    return (await api.post("/auth/forgot-password", { email })).data
}
export const verifyResetPasswordToken = async (token: string): Promise<boolean> => {
    return (await api.get(`/auth/verify-reset-token/${token}`)).data.result
}
