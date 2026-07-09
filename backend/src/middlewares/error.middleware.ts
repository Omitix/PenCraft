import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError"

export const globalErrorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    let message = "internal server error";
    let code = 500;
    if (error instanceof AppError) {
        message = error.message;
        code = error.code;
    } else console.log(error);
    response.status(code).send({ message })
}