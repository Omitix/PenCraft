import type { Stats } from "../types/stats.types"
import { api } from "./api"

export const getStats = async (): Promise<Stats> => {
    return (await api.get(`/stats`)).data.stats
}
