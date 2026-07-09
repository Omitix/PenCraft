import type { SortOption } from "../types/sort.types"
import type { User, UserRole } from "../types/user.types"
import { api } from "./api"

export const getUsers = async (sortBy: SortOption = "newest", page: number, limit: number, search?: string): Promise<{ users: User[], total: number, page: number }> => {
    return (await api.get(`/user/`, { params: { sortBy, page, limit, search } })).data
}


export const getAdminUsers = async (sortBy: SortOption = "newest", role: UserRole | "all", page: number, limit: number, search?: string): Promise<{ users: User[], total: number, page: number }> => {
    return (await api.get("/user/admin", { params: { sortBy, role, page, limit, search } })).data
}

export const followUser = async (id: string): Promise<User> => {
    return (await api.patch(`user/${id}/follow`)).data.user
}
export const getUser = async (id: string): Promise<User> => {
    return (await api.get(`/user/${id}`)).data.user

}

export const updateUser = async (id: string, data: { role?: UserRole, bio?: string }): Promise<User> => {
    return (await api.patch(`/user/${id}`, data)).data.user
}

export const uploadAvatar = async (id: string, avatar: File): Promise<User> => {
    const formData = new FormData();
    formData.append("avatar", avatar)
    return (await api.patch(`/user/${id}/avatar`, formData)).data.user
}


export const handleBookmark = async (postId: string): Promise<User> => {
    return (await api.patch(`/user/${postId}/bookmark`)).data.user
}