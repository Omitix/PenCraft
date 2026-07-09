import { useState } from "react"
import * as commentService from "../services/comment.service"
import { showToast } from "../utils/toast.utils"
import type { Comment } from "../types/comment.types"
import type { SortOption } from "../types/sort.types"

export const useComments = () => {
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(0)

    const loadPostComments = async (id: string, page: number = 1, limit: number = 10) => {
        setIsLoading(true)
        try {
            const result = await commentService.getCommentsByPost(id, page, limit)
            setComments(result.comments)
            setTotal(result.total)
            setPage(result.page)

        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const loadLatestComments = async (page: number = 1, limit: number = 10, sortBy: SortOption = "newest", repliesOnly: boolean = false, search?: string) => {
        setIsLoading(true)
        try {
            const result = await commentService.getLatestComments(sortBy, repliesOnly, page, limit, search)
            setComments(result.comments)
            setTotal(result.total)
            setPage(result.page)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }


    return { loadPostComments, page, total, loadLatestComments, isLoading, comments }
}