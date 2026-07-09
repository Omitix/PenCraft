import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user.types"
import { register as registerUser, login as loginUser, getMe } from "../services/auth.service";

interface AuthContextValues {
    login: (identity: string, password: string) => void,
    register: (email: string, username: string, password: string) => void,
    logout: () => void
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAuthenticatedUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextValues | null>(null)


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const register = async (email: string, username: string, password: string) => {
        const { token, user } = await registerUser(username, email, password)
        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem("token", token)
    }
    const login = async (identity: string, password: string) => {
        const { token, user } = await loginUser(identity, password)
        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem("token", token)
    }
    const logout = async () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("token")
    }

    const setAuthenticatedUser = async (user: User) => {
        setUser(user)
    };

    useEffect(() => {


        const token = localStorage.getItem("token")
        if (!token) {
            setIsLoading(false)
            return
        }
        getMe().then(res => {
            setUser(res)
            setIsAuthenticated(true)
        }).catch(() => {
            localStorage.removeItem("token")
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);


    return (
        <AuthContext.Provider value={{ setAuthenticatedUser, user, isLoading, isAuthenticated, login, register, logout }}>

            {children}
        </AuthContext.Provider>
    )
}