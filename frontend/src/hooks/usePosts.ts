import { useState } from "react"
import type { Post, PostStatus } from "../types/post.types"
import * as postService from "../services/post.service"
import { showToast } from "../utils/toast.utils"
import type { SortOption } from "../types/sort.types"

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const loadPosts = async (sortBy: SortOption = "newest", page: number = 1, limit: number = 10, search?: string) => {
        setIsLoading(true)
        try {
            const result = await postService.getPosts(sortBy, page, limit, search)
            setPosts(result.posts)
            setTotal(result.total)
            setPage(result.page)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }
    const loadAdminPosts = async (sortBy: SortOption = "newest", status: PostStatus | "all", page: number = 1, limit: number = 10, search?: string) => {
        setIsLoading(true)
        try {
            const result = await postService.getAdminPosts(sortBy, status, page, limit, search)
            setPosts(result.posts)
            setTotal(result.total)
            setPage(result.page)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }
    const loadUserPosts = async (id: string, page?: number, limit?: number) => {
        setIsLoading(true)
        try {
            const result = await postService.getPostsByAuthor(id, page || 1, limit || 10)
            setPosts(result.posts)
            setPage(result.page)
            setTotal(result.total)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }
    const loadPostsByCategory = async (category: string, page: number = 1, limit: number = 10) => {
        setIsLoading(true)
        try {
            const result = await postService.getPostsByCategory(category, page, limit)
            setPosts(result.posts)
            setPage(result.page)
            setTotal(result.total)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }


    return { loadPosts,loadAdminPosts, loadPostsByCategory, page, total, loadUserPosts, isLoading, posts }
}