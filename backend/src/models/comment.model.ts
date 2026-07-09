import { model, Schema, Types } from "mongoose";

export interface IComment {
    author: Types.ObjectId;
    post: Types.ObjectId;
    parent?: Types.ObjectId;
    likes: Types.ObjectId[];
    text: string;
}


const commentSchema = new Schema<IComment>({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Comment" },
    text: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],

}, { timestamps: true })


export const Comment = model<IComment>("Comment", commentSchema)