import { Document, model, Schema, Types } from "mongoose";
import { PostStatus } from "../types/post.types";

export interface IPost extends Document {
    title: string;
    coverImage: string;
    content: string;
    author: Types.ObjectId;
    status: PostStatus
    likes: Types.ObjectId[];
    categories: Types.ObjectId[];
}
const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: Object.values(PostStatus), default: PostStatus.DRAFT },
}, { timestamps: true })

export const Post = model<IPost>("Post", postSchema)