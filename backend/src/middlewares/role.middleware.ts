import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/user.types";
import { AppError } from "../utils/AppError";
import { findUserById } from "../services/user.service";


const checkRole = async (request: Request, response: Response, next: NextFunction, role: UserRole) => {
    try {
        const userId = request.userId!
        const user = await findUserById(userId)
        if (!user || (user.role !== UserRole.ADMIN)) {
            throw new AppError("Foribben", 403);
        }
        next()
    } catch (error) {
        next(error)
    }
}


export const isAdmin = async (request: Request, response: Response, next: NextFunction) => {
    await checkRole(request, response, next, UserRole.ADMIN)

}

