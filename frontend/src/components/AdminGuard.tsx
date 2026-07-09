import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { LoadingScreen } from "./LoadingScreen"

export const AdminGuard = () => {

    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingScreen />
    } else if (!user || user.role !== "admin") {
        return (<Navigate to="/auth" replace={true} />)
    }

    return (
        <Outlet />
    )
}