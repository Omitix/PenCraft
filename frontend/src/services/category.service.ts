import type { Category } from "../types/category.types"
import { api } from "./api"

export const createCategory = async (title: string, icon: string, description: string): Promise<Category> => {
    return (await api.post("/category", { title, icon, description })).data.category
}
export const getCategory = async (id: string): Promise<Category> => {
    return (await api.get(`/category/${id}`)).data.category
}
export const getCategoryByTitle = async (title: string): Promise<Category> => {
    return (await api.get(`/category/title/${title}`)).data.category
}
export const getCategories = async (page: number, limit: number, search?: string): Promise<{ categories: Category[], total: number }> => {
    return (await api.get(`/category/`, { params: { page, limit, search } })).data
}
export const updateCategory = async (id: string, title: string, icon: string, description: string): Promise<Category> => {
    return (await api.patch(`/category/${id}`, { title, icon, description })).data.category
}
export const deleteCategory = async (id: string): Promise<Category> => {
    return (await api.delete(`/category/${id}`,)).data.result
}