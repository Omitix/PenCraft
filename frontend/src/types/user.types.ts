export interface User {
    _id: string,
    username: string;
    avatar: string;
    email: string;
    bio?: string;
    followers: string[];
    followings: string[];
    bookmarks: string[];
    role: UserRole;
    createdAt: Date;
}

export interface PostAuthor {
    _id: string;
    username: string;
    email: string;
    role: UserRole;
    avatar: string;
    bio?: string;
    followers: string[];
    followings: string[];
}

export interface PopulatedUser {
    _id: string;
    username: string;
    avatar: string;
    createdAt: Date;
    email: string;
    role: UserRole;

}

export type UserRole = "user" | "admin"
