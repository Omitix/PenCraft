import { IPost, Post } from "../models/post.model";
import { PostStatus } from "../types/post.types";
import { SortOption, SortOptions } from "../types/sort.types";

const postPopulates = [
    { path: "author", select: "email username avatar role bio followers followings" },
    { path: "categories", select: "title" }
]
export const createPost = async (title: string, coverImage: string, content: string, author: string, categories: string[]): Promise<IPost> => {
    return (await Post.create({ title, content, coverImage, author, categories })).populate(postPopulates)
}

export const findPostById = async (id: string): Promise<IPost | null> => {
    return await Post.findOne({ _id: id, status: { $ne: PostStatus.DELETED } }).populate(postPopulates)
}

export const findAllPosts = async (sortOption: SortOption = SortOption.NEWEST, status: PostStatus | "all", page: number, limit: number, search?: string): Promise<{ posts: IPost[], total: number }> => {
    const sortBy = SortOptions[sortOption]
    const filter: any = { status: { $ne: PostStatus.DELETED } };
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (status && status !== "all") {
        filter.status = status
    }
    const skip = (page - 1) * limit
    const posts = await Post.find(filter).populate(postPopulates).sort(sortBy).skip(skip).limit(limit)
    const total = await Post.countDocuments(filter)
    return { posts, total }
}

export const findPostsByAuthor = async (author: string, page: number, limit: number): Promise<{ posts: IPost[], total: number }> => {
    const filter = { author, status: { $ne: PostStatus.DELETED } }
    const skip = (page - 1) * limit
    const posts = await Post.find(filter).populate(postPopulates).sort({ createdAt: -1 }).skip(skip).limit(limit)
    const total = await Post.countDocuments(filter)
    return { posts, total }
}
export const findPostsByCategory = async (category: string, page: number, limit: number): Promise<{ posts: IPost[], total: number }> => {
    const filter = { categories: category, status: { $ne: PostStatus.DELETED } }
    const skip = (page - 1) * limit
    const posts = await Post.find(filter).populate(postPopulates).sort({ createdAt: -1 }).skip(skip).limit(limit)
    const total = await Post.countDocuments(filter)
    return { posts, total }
}


export const updatePost = async (id: string, data: { title?: string, content?: string, coverImage?: string, status?: PostStatus, likes?: string[], categories?: string[] }): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(id, data, { returnDocument: "after" }).populate(postPopulates)
}
export const addLikeToPost = async (id: string, user: string): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(id, { $addToSet: { likes: user } }, { returnDocument: "after" }).populate(postPopulates)

}
export const removeLikeFromPost = async (id: string, user: string): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(id, { $pull: { likes: user } }, { returnDocument: "after" }).populate(postPopulates)
}

export const deletePost = async (id: string): Promise<boolean> => {
    return !!(await Post.findByIdAndUpdate(id, { status: PostStatus.DELETED }))
}

