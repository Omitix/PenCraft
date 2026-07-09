import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { createCategory, deleteCategory, findAllCategories, findCategoryById, findCategoryByTitle, updateCategory } from "../services/category.service";

export const addCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, icon, description } = request.body
        const exists = await findCategoryByTitle(title)
        if (exists) {
            throw new AppError("Category exists", 409);
        }
        const category = await createCategory(title, icon, description)
        response.status(201).send({ category })
    } catch (error) {
        next(error)
    }
}
export const getCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const category = await findCategoryById(id)
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        response.status(200).send({ category })
    } catch (error) {
        next(error)
    }
}
export const getCategoryByTitle = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const title = request.params.title as string
        const category = await findCategoryByTitle(title)
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        response.status(200).send({ category })
    } catch (error) {
        next(error)
    }
}
export const getCategories = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { page, limit, search } = request.query
        const pageNum = Number(page)
        const limitNum = Number(limit)
        const searchTxt = search as string
        const result = await findAllCategories(pageNum, limitNum, searchTxt)

        response.status(200).send(result)
    } catch (error) {
        next(error)
    }
}
export const handleUpdateCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const { title, icon, description } = request.body

        const currentCategory = await findCategoryById(id)
        if (!currentCategory) {
            throw new AppError("Category not found", 404);
        }
        if (currentCategory.title === title) {
            return response.status(200).send({ category: currentCategory })
        }

        const exists = await findCategoryByTitle(title)
        if (exists) {
            throw new AppError("Another category exists with this title", 409);
        }
        const category = await updateCategory(id, title, icon, description)
        if (!category) {
            throw new AppError("Category was deleted", 400);
        }
        response.status(200).send({ category })
    } catch (error) {
        next(error)
    }
}
export const handleDeleteCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id as string
        const result = await deleteCategory(id)
        if (!result) {
            throw new AppError("Category not found", 404);
        }
        response.status(200).send({ result })
    } catch (error) {
        next(error)
    }
}