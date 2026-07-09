import { useState } from "react"
import type { Category } from "../types/category.types"
import { getCategories } from "../services/category.service"
import { showToast } from "../utils/toast.utils"

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const loadCategories = (page: number = 1, limit: number = 10, search?: string) => {
        setIsLoading(true)

        getCategories(page, limit, search).then((result) => {
            setCategories(result.categories)
            setTotal(result.total)
        }).catch((err) => {
            showToast(err, "error")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return { categories, total, isLoading, loadCategories }

} 