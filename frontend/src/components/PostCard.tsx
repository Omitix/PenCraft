import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import type { Post } from "../types/post.types";
import { timeAgo } from "../utils/time.utils";

interface PostCardProps {
  post: Post;
  variant?: "vertical" | "horizontal" | "compact";
}

export const PostCard = ({ post, variant = "vertical" }: PostCardProps) => {
  if (variant === "horizontal") {
    return (
      <Link
        to={`/post/${post._id}`}
        className="card card-side bg-base-200 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
      >
        {/* Cover / Placeholder */}
        <figure className="hidden md:block w-72 shrink-0   bg-linear-to-br from-primary/30 to-secondary/30">
          <div className="flex items-center justify-center h-full">

            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-primary/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            )}

          </div>
        </figure>
        <div className="card-body">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.slice(0, 3).map((cat) => (
              <span
                key={cat._id}
                className="badge badge-primary badge-soft"
              >
                {cat.title}
              </span>
            ))}
          </div>
          {/* Title */}
          <h3 className="card-title text-xl md:text-2xl group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {/* Excerpt */}
          <p className="text-base-content/70 line-clamp-2 text-sm">
            {post.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
          </p>
          {/* Author + Meta */}
          <div className="card-actions items-center justify-between mt-3">
            <UserAvatar clickable={false} avatar={post.author.avatar} username={post.author.username} id={post.author._id} size="xs" />
            <div className="flex items-center gap-3 text-xs text-base-content/50">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {post.likes.length}
              </span>
              <span>{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/post/${post._id}`}
        className="flex items-start gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-base-content/50">
            <UserAvatar clickable={false} username={post.author.username} avatar={post.author.avatar} id={post.author._id} size="xs" showName={false} />
            <span>{post.author.username}</span>
            <span>·</span>
            <span>{post.likes.length} likes</span>
          </div>
        </div>
        {post.categories.length > 0 && (
          <span className="badge badge-sm badge-ghost shrink-0 mt-0.5">
            {post.categories[0].title}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      to={`/post/${post._id}`}
      className="card bg-base-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
    >
      {/* Cover / Placeholder */}
      <figure className="h-40 bg-linear-to-br from-primary/20 to-secondary/20">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        )}
      </figure>
      <div className="card-body p-5">
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-2">
          {post.categories.slice(0, 2).map((cat) => (
            <span key={cat._id} className="badge badge-sm badge-ghost">
              {cat.title}
            </span>
          ))}
        </div>
        {/* Title */}
        <h3 className="card-title text-base group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        {/* Excerpt */}
        <p className="text-sm text-base-content/60 line-clamp-2">
          {post.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
        </p>
        {/* Author + Meta */}
        <div className="card-actions items-center justify-between mt-3">
          <UserAvatar clickable={false} username={post.author.username} avatar={post.author.avatar}  id={post.author._id} size="xs" />
          <div className="flex items-center gap-2 text-xs text-base-content/50">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              {post.likes.length}
            </span>
            <span>{timeAgo(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};