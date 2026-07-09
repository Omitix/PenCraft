import { useState } from "react"
import { showToast } from "../utils/toast.utils"
import { getAdminUsers, getUsers } from "../services/user.service"
import type { User, UserRole } from "../types/user.types"
import type { SortOption } from "../types/sort.types"

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const loadUsers = async (sortBy: SortOption = "newest", page: number = 1, limit: number = 10, search?: string) => {
        setIsLoading(true)
        try {
            const result = await getUsers(sortBy, page, limit, search)

            setUsers(result.users)
            setTotal(result.total)
            setPage(result.page)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }
    const loadAdminUsers = async (sortBy: SortOption = "newest", role: UserRole | "all", page: number = 1, limit: number = 10, search?: string) => {
        setIsLoading(true)
        try {
            const result = await getAdminUsers(sortBy, role, page, limit, search)
            setUsers(result.users)
            setTotal(result.total)
            setPage(result.page)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return { loadUsers, loadAdminUsers, total, page, isLoading, users }
}