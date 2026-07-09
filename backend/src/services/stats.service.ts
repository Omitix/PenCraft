import { Category } from "../models/category.model"
import { Comment } from "../models/comment.model"
import { Post } from "../models/post.model"
import { User } from "../models/user.model"

export const getStats = async () => {
    const totalPosts = await Post.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalComments = await Comment.countDocuments()
    const totalCategories = await Category.countDocuments()
    return { totalPosts, totalCategories, totalUsers, totalComments }
}