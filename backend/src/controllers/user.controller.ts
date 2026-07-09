import { NextFunction, Request, Response } from "express"
import { addFollowerToUser, addFollowingToUser, addToBookmarks, findAllUsers, findUserById, removeFollowerFromUser, removeFollowingFromUser, removeFromBookmarks, updateUser } from "../services/user.service"
import { AppError } from "../utils/AppError"
import { UserRole } from "../types/user.types"
import { findPostById } from "../services/post.service"
import { SortOption } from "../types/sort.types"
import { saveAvatarFile } from "../utils/file.utils"

export const getUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { page, limit, sortBy, search } = request.query
        const pageNum = Number(page)
        const limitNum = Number(limit)
        const result = await findAllUsers(sortBy as SortOption, "all", pageNum, limitNum, search as string)
        response.status(200).send({ ...result, page: pageNum })

    } catch (error) {
        next(error)
    }
}
export const getAdminUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { sortBy, page, limit, role, search } = request.query
        const pageNum = Number(page)
        const limitNum = Number(limit)
        const result = await findAllUsers(sortBy as SortOption, role as UserRole, pageNum, limitNum, search as string)
        response.status(200).send({ ...result, page: pageNum })
    } catch (error) {
        next(error)
    }
}
export const handleFollowUnfollow = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.userId!
        const targetId = request.params.id as string
        if (userId === targetId) {
            throw new AppError("You cannot follow your self", 404);
        }
        let user = await findUserById(userId)
        if (!user) {
            throw new AppError(" user not found", 404);
        }
        const target = await findUserById(targetId)
        if (!target) {
            throw new AppError("taget user not found", 404);
        }
        const isTargetInUserFollowings = user.followings.some(f => f.toString() === targetId)
        if (isTargetInUserFollowings) {
            user = await removeFollowingFromUser(userId, targetId)
            await removeFollowerFromUser(targetId, userId)
        } else {
            user = await addFollowingToUser(userId, targetId)
            await addFollowerToUser(targetId, userId)
        }

        response.status(200).send({ user })
    } catch (error) {
        next(error)
    }
}
export const getUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const user = await findUserById(id)
        if (!user) {
            throw new AppError("user not found", 404);
        }
        response.status(200).send({ user })
    } catch (error) {
        next(error)
    }
}


export const handleUpdateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const { role, bio } = request.body
        const userId = request.userId
        const sourceUser = await findUserById(userId!)
        let user
        if (userId === id) {
            user = await updateUser(id, { bio })
        } else {
            if (sourceUser?.role !== UserRole.ADMIN) {
                throw new AppError("foribben", 403);

            }
            user = await updateUser(id, { bio, role })
        }
        if (!user) {
            throw new AppError("user not found", 404);
        }
        response.status(200).send({ user })
    } catch (error) {
        next(error)
    }
}
export const handleUpdateAvatar = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const userId = request.userId
        const avatar = request.file! as Express.Multer.File;

        if (userId !== id) {
            throw new AppError("Foribben", 403);
        }
        const oldUser = await findUserById(userId!)
        if (!oldUser) {
            throw new AppError("user not found", 404);
        }
        const path = await saveAvatarFile(avatar, oldUser.username)
        const user = await updateUser(id, { avatar: path })

        if (!user) {
            throw new AppError("user was deleted", 404);
        }
        response.status(200).send({ user })
    } catch (error) {
        next(error)
    }
}
export const handleBookmarks = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const postId = request.params.postId as string
        const userId = request.userId!
        const sourceUser = await findUserById(userId!)
        if (!sourceUser) {
            throw new AppError("user not found", 404);
        }
        const post = await findPostById(postId)
        if (!post) {
            throw new AppError("post not found", 404);
        }
        let user;


        const isMarked = sourceUser.bookmarks.some(p => p.toString() === postId)
        if (isMarked) {
            user = await removeFromBookmarks(userId, postId)
        }
        else {
            user = await addToBookmarks(userId, postId)
        }

        if (!user) {
            throw new AppError("user not found", 404);
        }
        response.status(200).send({ user })
    } catch (error) {
        next(error)
    }
}