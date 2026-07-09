import { IUser, User } from "../models/user.model"
import { SortOption, SortOptions } from "../types/sort.types"
import { UserRole } from "../types/user.types"
export const createUser = async (username: string, email: string, password: string, role?: UserRole): Promise<IUser> => {
    return await User.create({ email, username, password, role })
}
export const findUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select("-password -resetPasswordToken -resetPasswordExpires")
}
export const addFollowingToUser = async (id: string, followed: string): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, { $addToSet: { followings: followed } }, { returnDocument: "after" }).select("-password -resetPasswordToken -resetPasswordExpires")
}

export const removeFollowingFromUser = async (id: string, followed: string): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, { $pull: { followings: followed } }, { returnDocument: "after" }).select("-password -resetPasswordToken -resetPasswordExpires")
}
export const addFollowerToUser = async (id: string, follower: string): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, { $addToSet: { followers: follower } }, { returnDocument: "after" }).select("-password -resetPasswordToken -resetPasswordExpires")
}
export const removeFollowerFromUser = async (id: string, follower: string): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, { $pull: { followers: follower } }, { returnDocument: "after" }).select("-password -resetPasswordToken -resetPasswordExpires")
}

export const findAllUsers = async (sortOption: SortOption = SortOption.NEWEST, role: UserRole | "all", page: number, limit: number, search?: string): Promise<{ users: IUser[], total: number }> => {
    const sortBy = SortOptions[sortOption]
    const filter: any = role !== "all" ? { role } : {}

    if (search) {
        filter.$or = [
            { username: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ]
    }
    const skip = (page - 1) * limit

    const users = await User.find(filter).select("-password -resetPasswordToken -resetPasswordExpires").sort(sortBy).skip(skip).limit(limit)
    const total = await User.countDocuments(filter)
    return { total, users }
}
export const findUserByUsername = async (username: string): Promise<IUser | null> => {
    return await User.findOne({ username }).select("-resetPasswordToken -resetPasswordExpires")
}
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email }).select("-resetPasswordToken -resetPasswordExpires")
}
export const findUserByResetPasswordToken = async (resetPasswordToken: string): Promise<IUser | null> => {
    return await User.findOne({ resetPasswordToken })
}
export const updateUser = async (id: string, data: { avatar?: string, email?: string, username?: string, password?: string, role?: UserRole, bio?: string, resetPasswordToken?: string, resetPasswordExpires?: Date }): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, data, { returnDocument: "after" }).select("-resetPasswordToken -resetPasswordExpires -password")
}
export const addToBookmarks = async (id: string, post: string): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, {
        $addToSet: { bookmarks: post }

    }, { returnDocument: "after" }).select("-resetPasswordToken -resetPasswordExpires -password")
}

export const removeFromBookmarks = async (id: string, post: string): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, {
        $pull: { bookmarks: post }

    }, { returnDocument: "after" }).select("-resetPasswordToken -resetPasswordExpires -password")
}
