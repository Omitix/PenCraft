import { NextFunction, Request, Response } from "express"
import { sendContactEmail  } from "../utils/email.utils";




export const sendContactMessage = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, subject, name, message } = request.body;

        await sendContactEmail (name, email, subject, message)
        response.status(200).send({ message: "Message sent successfully" })
    } catch (error) {
        next(error)
    }
}

