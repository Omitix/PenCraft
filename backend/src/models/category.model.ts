import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
    title: string;
    icon: string
    description: string
    deleted: boolean
}

const categorySchema = new Schema<ICategory>({
    title: { type: String, required: true, unique: true },
    icon: { type: String },
    description: { type: String },
    deleted: { type: Boolean, default: false }
}, { timestamps: true })

export const Category = model<ICategory>("Category", categorySchema);