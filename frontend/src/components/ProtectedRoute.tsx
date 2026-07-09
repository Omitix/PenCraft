import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { LoadingScreen } from "./LoadingScreen"

export const ProtectedRoute = () => {

    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingScreen />
    } else if (!isAuthenticated) {
        return (<Navigate to="/auth" replace={true} />)
    }
    return (
        <Outlet />
    )
}