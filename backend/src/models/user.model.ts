import { Document, model, Schema, Types } from "mongoose";
import { UserRole } from "../types/user.types";

export interface IUser extends Document {
    avatar?: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    bio?: string;
    bookmarks: Types.ObjectId[];
    followings: Types.ObjectId[];
    followers: Types.ObjectId[];
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}


const userSchema = new Schema<IUser>({
    avatar: { type: String, },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    bio: { type: String },
    followings: [{ type: Schema.Types.ObjectId, default: [], ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, default: [], ref: "User" }],
    bookmarks: [{ type: Schema.Types.ObjectId, default: [], ref: "Post" }],
    resetPasswordToken: { type: String, sparse: true },
    resetPasswordExpires: { type: Date, },

}, { timestamps: true })
export const User = model<IUser>("User", userSchema);


