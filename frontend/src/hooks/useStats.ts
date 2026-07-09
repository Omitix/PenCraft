import { useEffect, useState } from "react"
import { showToast } from "../utils/toast.utils"
import type { Stats } from "../types/stats.types"
import { getStats } from "../services/stats.service"

export const useStats = () => {
    const [stats, setStats] = useState<Stats>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const loadStats = async () => {
        try {
            setIsLoading(true)
            const result = await getStats()

            setStats(result)
        } catch (error: any) {
            showToast(error, "error")
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadStats()
    }, []);
    return { loadStats, isLoading, stats }
}