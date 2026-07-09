import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { addLikeToPost, createPost, deletePost, findAllPosts, findPostById, findPostsByAuthor, findPostsByCategory, removeLikeFromPost, updatePost } from "../services/post.service";
import { findUserById } from "../services/user.service";
import { UserRole } from "../types/user.types";
import { SortOption } from "../types/sort.types";
import { PostStatus } from "../types/post.types";

export const addPost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, content, categories, coverImage }: { title: string, coverImage: string, content: string, categories: string[] } = request.body
        console.log(content);

        const post = await createPost(title, coverImage, content, request.userId!, categories);
        response.status(201).send({ post })
    } catch (error) {
        next(error)
    }
}

export const getPosts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { sortBy, page, limit, search } = request.query
        const pageNum = Number(page)

        const result = await findAllPosts(sortBy as SortOption, PostStatus.PUBLISHED, pageNum, Number(limit), search?.toString());
        response.status(200).send({ ...result, page: pageNum })

    } catch (error) {
        next(error)
    }
}



export const getAdminPosts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { sortBy, page, limit, search, status } = request.query
        const pageNum = Number(page)

        const result = await findAllPosts(sortBy as SortOption, status as PostStatus, pageNum, Number(limit), search?.toString());
        response.status(200).send({ ...result, page: pageNum })

    } catch (error) {
        next(error)
    }
}


export const getPostsByAuthor = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authorId = request.params.authorId as string
        const { page, limit } = request.query
        const pageNum = Number(page)
        const result = await findPostsByAuthor(authorId, pageNum, Number(limit));
        response.status(200).send({ ...result, page: pageNum })

    } catch (error) {
        next(error)
    }
}

export const getPostsByCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId as string
        const { page, limit } = request.query
        const pageNum = Number(page)
        const result = await findPostsByCategory(categoryId, pageNum, Number(limit));
        response.status(200).send({ ...result, page: pageNum })
    } catch (error) {
        next(error)
    }
}


export const getPost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const post = await findPostById(id);
        if (!post) {
            throw new AppError("cannot find post", 404);
        }

        response.status(200).send({ post })
    } catch (error) {
        next(error)
    }
}
export const likePost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const userId = request.userId!
        const post = await findPostById(id);
        if (!post) {
            throw new AppError("cannot find post", 404);
        }

        const isLikedByUser = post.likes.some((uid) => userId === uid.toString());
        let newPost;
        if (isLikedByUser) {
            newPost = await removeLikeFromPost(id, userId)
        } else {
            newPost = await addLikeToPost(id, userId)
        }
        if (!newPost) {
            throw new AppError("post was deleted", 404);
        }
        response.status(200).send({ post: newPost })
    } catch (error) {
        next(error)
    }
}

export const handleDeletePost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string


        const post = await findPostById(id);
        if (!post) {
            throw new AppError("cannot find post", 404);
        }

        const userId = request.userId!
        if (post.author._id.toString() !== userId) {
            const user = await findUserById(userId)
            if (!user || user.role !== UserRole.ADMIN) {
                throw new AppError("Foribben", 403);
            }
        }

        const isDeleted = await deletePost(id)
        if (!isDeleted) {
            throw new AppError("cannot find post", 404);
        }
        response.status(200).send({ message: "Post deleted" })
    } catch (error) {
        next(error)
    }
}
export const handleUpdatePost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const oldPost = await findPostById(id);
        if (!oldPost) {
            throw new AppError("cannot find post", 404);
        }

        const userId = request.userId!
        if (oldPost.author._id.toString() !== userId) {
            const user = await findUserById(userId)
            if (!user || user.role !== UserRole.ADMIN) {
                throw new AppError("Foribben", 403);
            }
        }
        const { title, content, status, categories, coverImage } = request.body
        const post = await updatePost(id, { title, content, coverImage, status, categories })
        if (!post) {
            throw new AppError("cannot find post", 404);
        }
        response.status(200).send({ message: "Post updated" })
    } catch (error) {
        next(error)
    }
}