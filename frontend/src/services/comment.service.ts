
import type { Comment } from "../types/comment.types";
import type { SortOption } from "../types/sort.types";
import { api } from "./api";

export const addComment = async (postId: string, text: string, parent?: string): Promise<Comment> => {
    return (await api.post("/comment", { postId, text, parent })).data.comment
}



export const getCommentsByPost = async (postId: string, page: number, limit: number): Promise<{ comments: Comment[], total: number, page: number }> => {
    return (await api.get(`/comment/${postId}`, { params: { page, limit } })).data
}

export const getLatestComments = async (sortBy: SortOption, repliesOnly: boolean, page: number, limit: number, search?: string): Promise<{ comments: Comment[], total: number, page: number }> => {
    return (await api.get(`/comment/`, { params: { sortBy, repliesOnly, page, limit, search } })).data
}

export const likeComment = async (id: string): Promise<Comment> => {
    return (await api.patch(`/comment/like/${id}`)).data.comment
}

export const deleteComment = async (id: string) => {
    return (await api.delete(`/comment/${id}`)).data

}