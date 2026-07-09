import { Category, ICategory } from "../models/category.model"

export const createCategory = async (title: string, icon?: string, description?: string): Promise<ICategory> => {
    return (await Category.create({ title, icon, description }))
}
export const findCategoryByTitle = async (title: string): Promise<ICategory | null> => {
    return await Category.findOne({ title, deleted: false })
}
export const findCategoryById = async (id: string): Promise<ICategory | null> => {
    return await Category.findOne({ _id: id, deleted: false })
}
export const findAllCategories = async (page: number, limit: number, search?: string): Promise<{ categories: ICategory[], total: number }> => {
    const filter: any = { deleted: false }
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }
    const skip = (page - 1) * limit
    const total = await Category.countDocuments(filter)
    const categories = await Category.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
    return { categories, total }
}
export const updateCategory = async (id: string, title: string, icon?: string, description?: string): Promise<ICategory | null> => {
    return await Category.findByIdAndUpdate(id, { title, icon, description }, { returnDocument: "after" })
}
export const deleteCategory = async (id: string): Promise<boolean> => {
    return !!(await Category.findByIdAndUpdate(id, { deleted: true }))

}

