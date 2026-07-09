import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { UserRole } from "../types/user.types";
import { PostStatus } from "../types/post.types";
import { SortOption } from "../types/sort.types";
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePassword = (password: string) => {
    if (password.includes(" ")) {
        throw new AppError("you cannot use space in password", 400);
    }
    if (password.length < 6) {
        throw new AppError("password must be 8 or more character", 400);
    }
}

export const validateRegister = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { username, email, password }: { username: string, email: string, password: string } = request.body
        if (!(username && email && password)) {
            throw new AppError("missing fields", 400);
        }
        const trimmedUsername = username.trim()
        const trimmedEmail = email.trim()
        if (!(trimmedUsername && trimmedEmail)) {
            throw new AppError("missing fields", 400);
        }
        if (trimmedUsername.length < 3) {
            throw new AppError("username must be more than 3 character", 400);
        }

        if (!isValidEmail(trimmedEmail)) {
            throw new AppError("email isn't valid", 400);
        }
        validatePassword(password)
        request.body.username = trimmedUsername;
        request.body.email = trimmedEmail;
        next()
    } catch (error) {
        next(error)
    }
}
export const validateLogin = (request: Request, response: Response, next: NextFunction) => {
    try {

        const { identity, password } = request.body
        if (!(identity && password)) {
            throw new AppError("missing fields", 400);
        }
        const trimmedIdentity = identity.trim()

        if (!(trimmedIdentity && password)) {
            throw new AppError("missing fields", 400);
        }
        request.body.identity = trimmedIdentity;
        next()
    } catch (error) {
        next(error)
    }
}
export const validateResetPassword = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { token, newPassword }: { newPassword: string, token: string } = request.body

        if (!(token && newPassword)) {
            throw new AppError("missing fields", 400);
        }
        validatePassword(newPassword)
        next()
    } catch (error) {
        next(error)
    }
}
export const validateForgotPassword = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email } = request.body;
        if (!email) {
            throw new AppError("missing fields", 400);
        }
        const trimmedEmail = email.trim()
        if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
            throw new AppError("email isn't valid", 400);
        }
        request.body.email = trimmedEmail;
        next()
    } catch (error) {
        next(error)
    }
}
export const validateContactMessage = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, subject, name, message } = request.body;
        if (!(email && name && message && subject)) {
            throw new AppError("missing fields", 400);
        }
        const trimmedEmail = email.trim()
        const trimmedSubject = subject.trim()
        const trimmedName = name.trim()
        const trimmedMessage = message.trim()
        if (!(trimmedEmail && trimmedSubject && trimmedName && trimmedMessage)) {
            throw new AppError("missing fields", 400);
        }
        if (!isValidEmail(trimmedEmail)) {
            throw new AppError("email isn't valid", 400);
        }
        if (trimmedMessage.length < 10) {
            throw new AppError("message is to short", 400);
        }
        request.body.email = trimmedEmail;
        request.body.subject = trimmedSubject;
        request.body.name = trimmedName;
        request.body.message = trimmedMessage;
        next()
    } catch (error) {
        next(error)
    }
}
export const validateGetCategoryByTitle = (request: Request, _: Response, next: NextFunction) => {
    try {
        const title = request.params.title as string
        if (!title) {
            throw new AppError("missing fields", 400);
        }
        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            throw new AppError("missing fields", 400);
        }
        request.params.title = trimmedTitle;
        next()
    } catch (error) {
        next(error)
    }
}
export const validateCategory = (request: Request, _: Response, next: NextFunction) => {
    try {
        const { title, icon, description } = request.body
        const emojiRegex = /\p{Emoji}/u
        if (!title || !description || !icon) {
            throw new AppError("missing fields", 400);
        }
        if (!emojiRegex.test(icon)) {
            throw new AppError("invalid icon", 400);
        }
        const trimmedTitle = title.trim()
        const trimmedDescription = description.trim()
        if (!trimmedTitle || !trimmedDescription) {
            throw new AppError("missing fields", 400);
        }
        if (trimmedTitle.length < 3) {
            throw new AppError("title must be 3 or more character", 400);
        }
        request.body.title = trimmedTitle;
        request.body.description = trimmedDescription;
        next()
    } catch (error) {
        next(error)
    }
}
export const validateComment = (request: Request, response: Response, next: NextFunction) => {
    try {

        const { postId, text } = request.body
        if (!(postId && text)) {
            throw new AppError("missing fields", 400);
        }
        const trimmedText = text.trim()
        if (!trimmedText) {
            throw new AppError("missing fields", 400);
        }
        request.body.text = trimmedText;
        next()
    } catch (error) {
        next(error)
    }
}
export const validatePost = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, content, status, categories } = request.body

        if (!(title && content && categories)) {
            throw new AppError("missing fields", 400);
        }

        const trimmedTitle = title.trim()
        const trimmedContent = content.trim()
        console.log(trimmedContent, "trimmedContent")
        if (!(trimmedTitle && trimmedContent)) {
            throw new AppError("missing fields", 400);
        }

        if (trimmedTitle.length < 3) {
            throw new AppError("Title is to short", 400);
        }
        if (trimmedContent.length < 30) {
            throw new AppError("content is to short", 400);
        }
        if (categories.length === 0) {
            throw new AppError("Atleast select one category", 400);
        }
        if (status && !Object.values(PostStatus).includes(status)) {
            throw new AppError("invalid status", 400);
        }
        request.body.title = trimmedTitle;
        request.body.content = trimmedContent;
        next()
    } catch (error) {
        next(error)
    }
}
export const validateUpdatePost = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, content, status, categories } = request.body


        const trimmedTitle = title ? title.trim() : null
        const trimmedContent = content ? content.trim() : null

        if (trimmedTitle && trimmedTitle.length < 3) {
            throw new AppError("Title is to short", 400);
        }
        if (trimmedContent && trimmedContent.length < 30) {
            throw new AppError("content is to short", 400);
        }
        if (categories && categories.length === 0) {
            throw new AppError("Atleast select one category", 400);
        }
        if (status && !Object.values(PostStatus).includes(status)) {
            throw new AppError("invalid status", 400);
        }
        if (trimmedTitle) {
            request.body.title = trimmedTitle;
        }
        if (trimmedContent) {
            request.body.content = trimmedContent;
        }

        next()
    } catch (error) {
        next(error)
    }
}
export const validateUser = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { bio, role } = request.body
        if (bio) {
            const trimmedBio = bio.trim();
            if (trimmedBio.length < 7) {
                throw new AppError("bio is to short", 400);
            }
            request.body.bio = trimmedBio
        }
        if (role) {
            if (!Object.values(UserRole).includes(role)) {
                throw new AppError("invalid role", 400);
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const validateUserAvatar = (request: Request, response: Response, next: NextFunction) => {
    try {
        if (!request.file) {
            throw new AppError("no avatar", 400);
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const validatePagination = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { page, limit } = request.query
        const pageNum = Number(page)
        const limitNum = Number(limit)
        if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
            throw new AppError("bad request", 400);
        }
        next()
    } catch (error) {
        next(error)
    }
}
export const validateSortOption = (request: Request, response: Response, next: NextFunction) => {
    try {
        let sortBy = (request.query.sortBy as string)
        if (!request.query.sortBy) {
            throw new AppError("invalid sort option", 400)
        }
        if (!Object.values(SortOption).includes(sortBy as SortOption)) {
            request.query.sortBy = SortOption.NEWEST
        }
        next()
    } catch (error) {
        next(error)
    }
}
export const validateGetAdminPosts = (request: Request, response: Response, next: NextFunction) => {
    try {
        const status = request.query.status as string
        if (!status) {
            throw new AppError("invalid post status", 400)
        }
        if (status !== "all" && !Object.values(PostStatus).includes(status as PostStatus)) {
            request.query.status = "all"
        }
        next()
    } catch (error) {
        next(error)
    }
}
export const validateGetAdminUsers = (request: Request, response: Response, next: NextFunction) => {
    try {
        const role = request.query.role as string
        if (!role) {
            throw new AppError("invalid role", 400)
        }
        if (role !== "all" && !Object.values(UserRole).includes(role as UserRole)) {
            request.query.role = "all"
        }
        next()
    } catch (error) {
        next(error)
    }
}