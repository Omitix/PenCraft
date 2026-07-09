import type { Post } from "./post.types";
import type { PopulatedUser } from "./user.types";

export interface Comment {
    _id: string,
    author: PopulatedUser;
    post: Post;
    parent?: string;
    likes: string[];
    text: string;
    createdAt: Date;
}


