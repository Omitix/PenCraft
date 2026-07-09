import { NextFunction, Request, Response } from "express"
import { getStats as getStatsService } from "../services/stats.service"

export const getStats = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const stats = await getStatsService()
        response.status(200).send({ stats })
    } catch (error) {
        next(error)
    }

}