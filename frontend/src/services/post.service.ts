
import type { Post, PostStatus } from "../types/post.types"
import type { SortOption } from "../types/sort.types"
import { api } from "./api"


export const addPost = async (title: string, coverImage: string, content: string, status: PostStatus, categories: string[]): Promise<Post> => {
    return (await api.post(`/post/`, { title, content, coverImage, status, categories })).data.post
}

export const getPosts = async (sortBy: SortOption = "newest", page: number, limit: number, search?: string): Promise<{ posts: Post[], total: number, page: number }> => {

    return (await api.get("/post/", { params: { sortBy, page, limit, search } })).data
}
export const getAdminPosts = async (sortBy: SortOption = "newest", status: PostStatus | "all", page: number, limit: number, search?: string): Promise<{ posts: Post[], total: number, page: number }> => {

    return (await api.get("/post/admin", { params: { sortBy, status, page, limit, search } })).data
}

export const getPostsByAuthor = async (authorId: string, page: number, limit: number): Promise<{ posts: Post[], total: number, page: number }> => {
    return (await api.get(`/post/author/${authorId}`, { params: { page, limit } })).data
}
export const getPostsByCategory = async (category: string, page: number, limit: number): Promise<{ posts: Post[], total: number, page: number }> => {
    return (await api.get(`/post/category/${category}`, { params: { page, limit } })).data
}

export const getPost = async (id: string): Promise<Post> => {
    return (await api.get(`/post/${id}`)).data.post
}
export const likePost = async (id: string): Promise<Post> => {
    return (await api.patch(`/post/like/${id}`)).data.post
}
export const deletePost = async (id: string) => {
    return (await api.delete(`/post/${id}`)).data
}
export const updatePost = async (id: string, data: { title?: string, coverImage?: string, content?: string, status?: PostStatus, categories?: string[] }) => {
    return (await api.patch(`/post/${id}`, data)).data
}