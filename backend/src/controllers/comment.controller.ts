import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError";
import { findPostById } from "../services/post.service";
import { addLikeToComment, createComment, deleteComment, findCommentById, findComments, findCommentsByPost, removeLikeFromComment } from "../services/comment.service";
import { findUserById } from "../services/user.service";
import { UserRole } from "../types/user.types";
import { SortOption } from "../types/sort.types";

export const addComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { postId, text, parent } = request.body
        if (!(postId && text)) {
            throw new AppError("missing fields", 400);
        }
        const post = await findPostById(postId);
        if (!post) {
            throw new AppError("cannot find any post with this id", 404);
        }
        if (parent && !(await findCommentById(parent))) {
            throw new AppError("comment parrent not find", 404);
        }
        const comment = await createComment(postId, request.userId!, text, parent);
        response.status(201).send({ comment })
    } catch (error) {
        next(error)
    }
}



export const getCommentsByPost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { page, limit } = request.query
        const postId = request.params.postId as string
        const result = await findCommentsByPost(postId, Number(page), Number(limit));
        response.status(200).send({ ...result, page })
    } catch (error) {
        next(error)
    }
}
export const getLatestComments = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { sortBy, page, limit, search } = request.query
        const repliesOnly = request.query.repliesOnly === "true";

        const result = await findComments(sortBy as SortOption, repliesOnly, Number(page), Number(limit), search as string);
        response.status(200).send({ ...result, page })
    } catch (error) {
        next(error)
    }
}

export const likeComment = async (request: Request, response: Response, next: NextFunction) => {
    try {

        const id = request.params.id as string;
        const oldComment = await findCommentById(id);
        if (!oldComment) {
            throw new AppError("cannot find any comment with this id", 404);
        }

        const userId = request.userId!;
        const isLiked = oldComment.likes.some((i) => i.toString() === userId);
        let comment
        if (isLiked) {
            comment = await removeLikeFromComment(id, userId)
        } else {
            comment = await addLikeToComment(id, userId)
        }
        if (!comment) {
            throw new AppError("the comment was deleted", 404);
        }
        response.status(200).send({ comment })
    } catch (error) {
        next(error)
    }
}

export const handleDeleteComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string;
        const comment = await findCommentById(id)
        if (!comment) {
            throw new AppError("comment not found", 404);
        }

        const userId = request.userId!
        const user = await findUserById(userId)
        if (!user) {
            throw new AppError("user not found", 404);
        }
        if (comment.author._id.toString() !== userId || user.role === UserRole.ADMIN) {
            const user = await findUserById(userId)
            if (!user || user.role !== UserRole.ADMIN) {
                throw new AppError("Foribben", 403);
            }
        }

        const isDeleted = await deleteComment(id)
        if (!isDeleted) {
            throw new AppError("comment not found", 404);
        }

        response.status(200).send({ message: "comment deleted" })
    } catch (error) {
        next(error)
    }
}