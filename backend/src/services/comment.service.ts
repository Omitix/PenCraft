import { Comment, IComment } from "../models/comment.model"
import { SortOption, SortOptions } from "../types/sort.types"
const commentPopulates = [
    { path: "author", select: "email avatar username role" },
    { path: "post", select: "title content author status likes categories" }
]

export const createComment = async (post: string, author: string, text: string, parent?: string): Promise<IComment> => {
    return (await Comment.create({ post, author, parent, text })).populate(commentPopulates)
}
export const findCommentById = async (id: string): Promise<IComment | null> => {
    return await Comment.findById(id).populate(commentPopulates)
}
export const findCommentsByPost = async (post: string, page: number, limit: number): Promise<{ comments: IComment[], total: number }> => {
    const skip = (page - 1) * limit
    const comments = await Comment.find({ post }).populate(commentPopulates).skip(skip).limit(limit)
    const total = await Comment.countDocuments({ post })
    return { comments, total }
}
export const findComments = async (sortOption: SortOption, repliesOnly: boolean = false, page: number, limit: number, search?: string): Promise<{ comments: IComment[], total: number }> => {
    const sortBy = SortOptions[sortOption]
    const filter: any = {}

    if (repliesOnly) {
        filter.parent = { $ne: null }
    }
    if (search) {
        filter.text = { $regex: search, $options: "i" };
    }
    const skip = (page - 1) * limit
    const comments = await Comment.find(filter).populate(commentPopulates).sort(sortBy).skip(skip).limit(limit)
    const total = await Comment.countDocuments(filter)
    return { comments, total }
}

export const addLikeToComment = async (id: string, user: string): Promise<IComment | null> => {
    return await Comment.findByIdAndUpdate(id, {
        $addToSet: { likes: user }
    }, { returnDocument: "after" }).populate(commentPopulates)
}
export const removeLikeFromComment = async (id: string, user: string): Promise<IComment | null> => {
    return await Comment.findByIdAndUpdate(id, {
        $pull: { likes: user }
    }, { returnDocument: "after" }).populate(commentPopulates)
}
export const deleteComment = async (id: string): Promise<boolean> => {
    return !!(await Comment.findByIdAndDelete(id))
}