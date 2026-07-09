import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { AppError } from "../utils/AppError";



export const validateObjectId = (fields: string[], source: 'params' | 'body' | "both") => {
    const middleware = async (request: Request, response: Response, next: NextFunction) => {
        try {
            fields.forEach((field) => {
                const id = source === "both" ? (request.body[field] || request.params[field]) : (source == "body" ? request.body[field] : request.params[field])
                if (id && !isValidObjectId(id)) {
                    throw new AppError(`${field} id isn't a valid ObjectId`, 400);
                }
            })
            next()
        } catch (error) {
            next(error)
        }
    }
    return middleware
}


