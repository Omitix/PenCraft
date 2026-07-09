import { NextFunction, Request, Response } from "express"
import { verifyJWT } from "../utils/jwt.utils"


export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.headers.authorization?.split(" ")[1]
        if (!token) {
            return response.status(401).send({ message: "unauthorized" })
        }
        request.userId = verifyJWT(token).id
        next()
    } catch (error) {
        response.status(401).send({ message: "invalid token" })
    }
}