import type { Category } from "./category.types.ts";
import type { PostAuthor } from "./user.types";


export interface Post {
    _id: string,
    title: string;
    coverImage?: string;
    content: string;
    author: PostAuthor;
    status: PostStatus
    likes: string[];
    categories: Category[];
    createdAt: Date;
}




export type PostStatus = "draft" | "published"




