import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError";

import { createUser, findUserByEmail, findUserById, findUserByResetPasswordToken, findUserByUsername, updateUser } from "../services/user.service";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../utils/email.utils";
import { generateJWT } from "../utils/jwt.utils";

export const register = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { username, email, password } = request.body
        const usernameExists = await findUserByUsername(username)
        if (usernameExists) {
            throw new AppError("Username exists", 409);
        }
        const emailExists = await findUserByEmail(email)
        if (emailExists) {
            throw new AppError("Email exists", 409);
        }
        const hashedPasswod = await hashPassword(password)
        const user = await createUser(username, email, hashedPasswod);
        const token = generateJWT(user._id.toString())
        const resultUser = {
            _id: user._id,
            avatar: user.avatar,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            bio: user.bio,
            bookmarks: user.bookmarks,
            followings: user.followings,
            followers: user.followers
        }
        response.status(201).send({ token, user: resultUser })
    } catch (error) {
        next(error)
    }
}

export const login = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { identity, password } = request.body

        let user = await findUserByUsername(identity)
        if (!user) {
            user = await findUserByEmail(identity)
        }
        if (!user) {
            throw new AppError("Cannot find any user with this data", 404);
        }
        const isPasswrodMatch = await comparePassword(password, user.password)
        if (!isPasswrodMatch) {
            throw new AppError("Cannot find any user with this data", 404);
        }
        const token = generateJWT(user._id.toString())

        const resultUser = {
            _id: user._id,
            avatar: user.avatar,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            bio: user.bio,
            bookmarks: user.bookmarks,
            followings: user.followings,
            followers: user.followers
        }

        response.status(200).send({ token, user: resultUser })

    } catch (error) {
        next(error)
    }
}

export const getMe = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.userId!;
        const user = await findUserById(userId)
        if (!user) {
            throw new AppError("Cannot find any user with this data", 404);
        }
        response.status(200).send({ user })
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { token, newPassword } = request.body
        const user = await findUserByResetPasswordToken(token)
        if (!user) {
            throw new AppError("Invalid reset token", 404);
        }
        if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
            throw new AppError("reset token is expired", 400);
        }
        const hashedPassword = await hashPassword(newPassword)
        await updateUser(user._id.toString(), { password: hashedPassword, resetPasswordExpires: undefined, resetPasswordToken: undefined })
        response.status(200).send({ message: "password updated" })
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email } = request.body;

        const user = await findUserByEmail(email)
        if (!user) {
            throw new AppError("Cannot find any user with this data", 404);
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

        await updateUser(user._id.toString(), { resetPasswordToken: token, resetPasswordExpires: expiresAt })
        await sendResetPasswordEmail(email, token)
        response.status(200).send({ message: "Reset link sent to your email" })
    } catch (error) {
        next(error)
    }
}
export const verifyResetPasswordToken = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.params.token as string;
        const user = await findUserByResetPasswordToken(token)
        if (!user) {
            throw new AppError("Not found", 404);
        }
        if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
            throw new AppError("Not found", 404);
        }
        response.status(200).send({ result: true, message: "Reset link is valid" })
    } catch (error) {
        next(error)
    }
}
